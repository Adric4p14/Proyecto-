import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { ShoppingBag, Coins, Zap, Clock, Lightbulb, X2, Gem, Sparkles, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

const Shop = () => {
  const { coins, spendCoins, addBooster, addAccessory, inventory } = useGame()
  const [selectedCategory, setSelectedCategory] = useState('boosters')

  const categories = [
    { id: 'boosters', name: 'Potenciadores', icon: Zap },
    { id: 'accessories', name: 'Accesorios', icon: Crown },
    { id: 'special', name: 'Especiales', icon: Sparkles }
  ]

  const boosterItems = [
    {
      id: 'doubleXP',
      name: 'Doble Experiencia',
      description: 'Duplica la XP por 5 problemas',
      price: 50,
      icon: X2,
      color: 'from-purple-500 to-blue-600'
    },
    {
      id: 'timeBooster',
      name: 'Tiempo Extra',
      description: 'Añade 30 segundos extra',
      price: 30,
      icon: Clock,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'hintBooster',
      name: 'Pista Inteligente',
      description: 'Muestra una pista útil',
      price: 25,
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'coinMultiplier',
      name: 'Multiplicador de Monedas',
      description: 'Duplica las monedas por 3 problemas',
      price: 75,
      icon: Coins,
      color: 'from-yellow-600 to-yellow-400'
    }
  ]

  const accessoryItems = [
    {
      id: 'calculator_golden',
      name: 'Calculadora Dorada',
      description: '+5% XP permanente',
      price: 200,
      icon: '🧮',
      rarity: 'legendary',
      effect: 'xp_boost'
    },
    {
      id: 'lucky_charm',
      name: 'Amuleto de la Suerte',
      description: '+10% probabilidad de monedas extra',
      price: 150,
      icon: '🍀',
      rarity: 'epic',
      effect: 'coin_luck'
    },
    {
      id: 'wise_book',
      name: 'Libro de Sabiduría',
      description: 'Reduce el tiempo de problemas en 5s',
      price: 100,
      icon: '📚',
      rarity: 'rare',
      effect: 'time_reduction'
    },
    {
      id: 'magic_pencil',
      name: 'Lápiz Mágico',
      description: 'Muestra la primera cifra de la respuesta',
      price: 80,
      icon: '✏️',
      rarity: 'uncommon',
      effect: 'first_digit_hint'
    },
    {
      id: 'focus_glasses',
      name: 'Gafas de Concentración',
      description: '+15 segundos de tiempo base',
      price: 120,
      icon: '👓',
      rarity: 'rare',
      effect: 'time_boost'
    }
  ]

  const specialItems = [
    {
      id: 'premium_pack',
      name: 'Pack Premium',
      description: '5 de cada potenciador + accesorio aleatorio',
      price: 300,
      icon: '🎁',
      contents: ['5x Todos los potenciadores', 'Accesorio aleatorio']
    },
    {
      id: 'master_bundle',
      name: 'Bundle del Maestro',
      description: 'Todos los accesorios básicos',
      price: 500,
      icon: '📦',
      contents: ['Lápiz Mágico', 'Gafas de Concentración', 'Libro de Sabiduría']
    }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      case 'uncommon': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const handlePurchase = (item, category) => {
    if (coins < item.price) {
      alert('¡No tienes suficientes monedas!')
      return
    }

    spendCoins(item.price)

    if (category === 'boosters') {
      addBooster(item.id, 1)
      alert(`¡Has comprado ${item.name}!`)
    } else if (category === 'accessories') {
      if (inventory.accessories.some(acc => acc.id === item.id)) {
        alert('¡Ya tienes este accesorio!')
        return
      }
      addAccessory(item)
      alert(`¡Has obtenido ${item.name}!`)
    } else if (category === 'special') {
      if (item.id === 'premium_pack') {
        addBooster('doubleXP', 5)
        addBooster('timeBooster', 5)
        addBooster('hintBooster', 5)
        addBooster('coinMultiplier', 5)
        // Agregar accesorio aleatorio
        const randomAccessory = accessoryItems[Math.floor(Math.random() * accessoryItems.length)]
        if (!inventory.accessories.some(acc => acc.id === randomAccessory.id)) {
          addAccessory(randomAccessory)
        }
      } else if (item.id === 'master_bundle') {
        const bundleItems = ['magic_pencil', 'focus_glasses', 'wise_book']
        bundleItems.forEach(itemId => {
          const accessory = accessoryItems.find(acc => acc.id === itemId)
          if (accessory && !inventory.accessories.some(acc => acc.id === itemId)) {
            addAccessory(accessory)
          }
        })
      }
      alert(`¡Has comprado ${item.name}!`)
    }
  }

  const renderBoosterItems = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {boosterItems.map((item, index) => {
        const Icon = item.icon
        const ownedCount = inventory.boosters[item.id] || 0
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/25 transition-all"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-white text-center mb-2">{item.name}</h3>
            <p className="text-white/80 text-sm text-center mb-4">{item.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-yellow-300">
                <Coins className="w-5 h-5" />
                <span className="font-semibold">{item.price}</span>
              </div>
              <div className="text-white/80 text-sm">
                Tienes: {ownedCount}
              </div>
            </div>
            
            <button
              onClick={() => handlePurchase(item, 'boosters')}
              disabled={coins < item.price}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              {coins >= item.price ? 'Comprar' : 'Sin monedas'}
            </button>
          </motion.div>
        )
      })}
    </div>
  )

  const renderAccessoryItems = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accessoryItems.map((item, index) => {
        const isOwned = inventory.accessories.some(acc => acc.id === item.id)
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/25 transition-all border-2 ${
              isOwned ? 'border-green-400/50' : 'border-transparent'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${getRarityColor(item.rarity)} flex items-center justify-center text-2xl`}>
              {item.icon}
            </div>
            
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`}>
                {item.rarity.toUpperCase()}
              </span>
            </div>
            
            <p className="text-white/80 text-sm text-center mb-4">{item.description}</p>
            
            <div className="flex items-center justify-center mb-4 text-yellow-300">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">{item.price}</span>
            </div>
            
            <button
              onClick={() => handlePurchase(item, 'accessories')}
              disabled={coins < item.price || isOwned}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                isOwned 
                  ? 'bg-green-500/50 text-green-200 cursor-not-allowed'
                  : coins >= item.price
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              {isOwned ? 'Ya tienes esto' : coins >= item.price ? 'Comprar' : 'Sin monedas'}
            </button>
          </motion.div>
        )
      })}
    </div>
  )

  const renderSpecialItems = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {specialItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/25 transition-all border-2 border-yellow-400/30"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-3xl">
            {item.icon}
          </div>
          
          <h3 className="text-xl font-semibold text-white text-center mb-2">{item.name}</h3>
          <p className="text-white/80 text-sm text-center mb-4">{item.description}</p>
          
          <div className="space-y-2 mb-4">
            <h4 className="text-white font-medium text-sm">Incluye:</h4>
            {item.contents.map((content, idx) => (
              <div key={idx} className="text-white/80 text-sm flex items-center">
                <Gem className="w-3 h-3 mr-2 text-yellow-400" />
                {content}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center mb-4 text-yellow-300">
            <Coins className="w-6 h-6 mr-2" />
            <span className="font-bold text-lg">{item.price}</span>
          </div>
          
          <button
            onClick={() => handlePurchase(item, 'special')}
            disabled={coins < item.price}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white py-3 rounded-xl font-semibold transition-all"
          >
            {coins >= item.price ? 'Comprar Pack' : 'Sin monedas'}
          </button>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Tienda Math Adventure</h1>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <ShoppingBag className="w-5 h-5" />
            <span>Mejora tu experiencia de aprendizaje</span>
          </div>
        </div>

        {/* Balance */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center space-x-3 text-yellow-300">
            <Coins className="w-8 h-8" />
            <span className="text-3xl font-bold">{coins}</span>
            <span className="text-lg text-white/80">monedas</span>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex justify-center space-x-2">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Items */}
        <div className="space-y-6">
          {selectedCategory === 'boosters' && renderBoosterItems()}
          {selectedCategory === 'accessories' && renderAccessoryItems()}
          {selectedCategory === 'special' && renderSpecialItems()}
        </div>

        {/* Inventory Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Tu Inventario</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {Object.entries(inventory.boosters).map(([key, count]) => {
              const booster = boosterItems.find(b => b.id === key)
              if (!booster) return null
              const Icon = booster.icon
              
              return (
                <div key={key} className="bg-white/10 rounded-xl p-3 text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-white" />
                  <div className="text-white text-sm">{booster.name}</div>
                  <div className="text-yellow-300 font-semibold">{count}</div>
                </div>
              )
            })}
          </div>
          
          {inventory.accessories.length > 0 && (
            <div>
              <h4 className="text-white font-semibold mb-2">Accesorios:</h4>
              <div className="flex flex-wrap gap-2">
                {inventory.accessories.map(accessory => (
                  <div key={accessory.id} className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white">
                    {accessory.icon} {accessory.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Shop