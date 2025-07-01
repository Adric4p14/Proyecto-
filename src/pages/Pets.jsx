import React, { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { Heart, Star, Coins, ShoppingBag, Sparkles, Play } from 'lucide-react'
import { motion } from 'framer-motion'

const Pets = () => {
  const { coins, spendCoins, ownedPets, activePet, setActivePet, addPet } = useGame()
  const [selectedTab, setSelectedTab] = useState('owned')
  const [selectedPet, setSelectedPet] = useState(null)

  const availablePets = [
    {
      id: 'dragon_math',
      name: 'Dragón Matemático',
      emoji: '🐲',
      description: 'Un dragón amistoso que ama los números',
      price: 150,
      rarity: 'epic',
      abilities: ['Doble XP en álgebra', 'Reduce tiempo de problemas'],
      personality: 'Inteligente y protector'
    },
    {
      id: 'owl_wise',
      name: 'Búho Sabio',
      emoji: '🦉',
      description: 'Un búho que conoce todos los secretos matemáticos',
      price: 100,
      rarity: 'rare',
      abilities: ['Pistas automáticas', '+15% precisión'],
      personality: 'Sabio y paciente'
    },
    {
      id: 'cat_lucky',
      name: 'Gato de la Suerte',
      emoji: '🐱',
      description: 'Un gato adorable que trae buena fortuna',
      price: 75,
      rarity: 'common',
      abilities: ['+20% monedas', 'Racha más fácil'],
      personality: 'Juguetón y cariñoso'
    },
    {
      id: 'fox_clever',
      name: 'Zorro Astuto',
      emoji: '🦊',
      description: 'Un zorro inteligente especialista en geometría',
      price: 120,
      rarity: 'rare',
      abilities: ['Doble XP en geometría', 'Tiempo extra'],
      personality: 'Astuto y rápido'
    },
    {
      id: 'unicorn_magic',
      name: 'Unicornio Mágico',
      emoji: '🦄',
      description: 'Una criatura mágica con poderes especiales',
      price: 250,
      rarity: 'legendary',
      abilities: ['Triple XP ocasional', 'Regenera potenciadores'],
      personality: 'Mágico y noble'
    },
    {
      id: 'robot_helper',
      name: 'Robot Ayudante',
      emoji: '🤖',
      description: 'Un robot programado para asistir en cálculos',
      price: 200,
      rarity: 'epic',
      abilities: ['Soluciones automáticas', 'No pierde racha'],
      personality: 'Lógico y eficiente'
    }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      case 'common': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const handleAdoptPet = (pet) => {
    if (coins < pet.price) {
      alert('¡No tienes suficientes monedas!')
      return
    }

    if (ownedPets.some(p => p.id === pet.id)) {
      alert('¡Ya tienes esta mascota!')
      return
    }

    spendCoins(pet.price)
    const newPet = {
      ...pet,
      adoptedAt: Date.now(),
      level: 1,
      happiness: 100,
      lastFed: Date.now(),
      experience: 0
    }
    addPet(newPet)
    alert(`¡Has adoptado a ${pet.name}!`)
  }

  const handleSelectActivePet = (pet) => {
    setActivePet(pet)
    alert(`${pet.name} es ahora tu compañero activo!`)
  }

  const feedPet = (pet) => {
    const cost = 10
    if (coins < cost) {
      alert('¡No tienes suficientes monedas para alimentar a tu mascota!')
      return
    }

    spendCoins(cost)
    // Aquí actualizarías la felicidad de la mascota
    alert(`¡Has alimentado a ${pet.name}!`)
  }

  const playWithPet = (pet) => {
    const cost = 5
    if (coins < cost) {
      alert('¡No tienes suficientes monedas para jugar!')
      return
    }

    spendCoins(cost)
    // Aquí aumentarías la experiencia y felicidad
    alert(`¡Has jugado con ${pet.name}!`)
  }

  const renderOwnedPets = () => {
    if (ownedPets.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-white mb-2">No tienes mascotas aún</h3>
          <p className="text-white/80 mb-4">¡Ve a la tienda de mascotas para adoptar tu primera compañera!</p>
          <button
            onClick={() => setSelectedTab('shop')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            Ir a la Tienda
          </button>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedPets.map((pet, index) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/25 transition-all cursor-pointer border-2 ${
              activePet?.id === pet.id ? 'border-yellow-400' : 'border-transparent'
            }`}
            onClick={() => setSelectedPet(pet)}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-2 animate-bounce-slow">{pet.emoji}</div>
              <h3 className="text-xl font-semibold text-white">{pet.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(pet.rarity)} text-white`}>
                {pet.rarity.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-white/80">
                <span>Nivel:</span>
                <span className="font-semibold text-white">{pet.level || 1}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-white/80">
                  <span>Felicidad:</span>
                  <span className="font-semibold text-white">{pet.happiness || 100}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 to-red-400 transition-all"
                    style={{ width: `${pet.happiness || 100}%` }}
                  />
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    feedPet(pet)
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Alimentar (10🪙)
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    playWithPet(pet)
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Jugar (5🪙)
                </button>
              </div>

              {activePet?.id !== pet.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectActivePet(pet)
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Hacer Activa
                </button>
              )}

              {activePet?.id === pet.id && (
                <div className="bg-yellow-500/20 text-yellow-200 py-2 px-3 rounded-xl text-sm font-semibold text-center">
                  Mascota Activa ⭐
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  const renderPetShop = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availablePets.map((pet, index) => {
        const isOwned = ownedPets.some(p => p.id === pet.id)
        
        return (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/25 transition-all cursor-pointer border-2 ${
              isOwned ? 'border-green-400/50' : 'border-transparent'
            }`}
            onClick={() => setSelectedPet(pet)}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{pet.emoji}</div>
              <h3 className="text-xl font-semibold text-white">{pet.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(pet.rarity)} text-white`}>
                {pet.rarity.toUpperCase()}
              </span>
            </div>

            <p className="text-white/80 text-sm text-center mb-4">{pet.description}</p>

            <div className="space-y-2 mb-4">
              <h4 className="text-white font-semibold text-sm">Habilidades:</h4>
              {pet.abilities.slice(0, 2).map((ability, idx) => (
                <div key={idx} className="text-white/80 text-xs flex items-center">
                  <Star className="w-3 h-3 mr-2 text-yellow-400" />
                  {ability}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center mb-4 text-yellow-300">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-bold text-lg">{pet.price}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleAdoptPet(pet)
              }}
              disabled={coins < pet.price || isOwned}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                isOwned
                  ? 'bg-green-500/50 text-green-200 cursor-not-allowed'
                  : coins >= pet.price
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              {isOwned ? 'Ya adoptada' : coins >= pet.price ? 'Adoptar' : 'Sin monedas'}
            </button>
          </motion.div>
        )
      })}
    </div>
  )

  const renderPetDetail = () => {
    if (!selectedPet) return null

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedPet(null)}
      >
        <div 
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{selectedPet.emoji}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{selectedPet.name}</h2>
            <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor(selectedPet.rarity)} text-white`}>
              {selectedPet.rarity.toUpperCase()}
            </span>
          </div>

          <div className="space-y-4 text-white">
            <div>
              <h3 className="font-semibold mb-2">Descripción:</h3>
              <p className="text-white/80 text-sm">{selectedPet.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Personalidad:</h3>
              <p className="text-white/80 text-sm">{selectedPet.personality}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Habilidades Especiales:</h3>
              <div className="space-y-1">
                {selectedPet.abilities.map((ability, idx) => (
                  <div key={idx} className="text-white/80 text-sm flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    {ability}
                  </div>
                ))}
              </div>
            </div>

            {selectedPet.level && (
              <div>
                <h3 className="font-semibold mb-2">Estado Actual:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Nivel:</span>
                    <span>{selectedPet.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Felicidad:</span>
                    <span>{selectedPet.happiness}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experiencia:</span>
                    <span>{selectedPet.experience || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedPet(null)}
            className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Centro de Mascotas</h1>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Heart className="w-5 h-5 text-pink-400" />
            <span>Cuida y entrena a tus compañeros matemáticos</span>
          </div>
        </div>

        {/* Balance */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-3 text-yellow-300">
            <Coins className="w-6 h-6" />
            <span className="text-2xl font-bold">{coins}</span>
            <span className="text-white/80">monedas</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setSelectedTab('owned')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all ${
              selectedTab === 'owned'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Mis Mascotas ({ownedPets.length})</span>
          </button>
          <button
            onClick={() => setSelectedTab('shop')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all ${
              selectedTab === 'shop'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-semibold">Adoptar</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {selectedTab === 'owned' ? renderOwnedPets() : renderPetShop()}
        </div>

        {/* Pet Care Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">💡 Consejos para el Cuidado</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
            <div className="text-center">
              <div className="text-2xl mb-2">🍎</div>
              <p><strong>Alimenta</strong> a tus mascotas regularmente para mantener su felicidad alta</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎮</div>
              <p><strong>Juega</strong> con ellas para aumentar su experiencia y nivel</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⭐</div>
              <p><strong>Mascota activa</strong> te ayuda durante los problemas matemáticos</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pet Detail Modal */}
      {renderPetDetail()}
    </div>
  )
}

export default Pets