import React from 'react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { BookOpen, ShoppingBag, Heart, Trophy, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
  const { level, experience, stats, activePet, coins } = useGame()
  
  const accuracy = stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0
  const expProgress = ((experience % 100) / 100) * 100

  const quickActions = [
    {
      title: 'Resolver Problemas',
      description: 'Practica matemáticas y gana experiencia',
      icon: BookOpen,
      color: 'from-blue-500 to-purple-600',
      link: '/problemas'
    },
    {
      title: 'Tienda',
      description: 'Compra potenciadores y accesorios',
      icon: ShoppingBag,
      color: 'from-green-500 to-teal-600',
      link: '/tienda'
    },
    {
      title: 'Mascotas',
      description: 'Cuida y juega con tus compañeros',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      link: '/mascotas'
    }
  ]

  const statsCards = [
    {
      title: 'Problemas Resueltos',
      value: stats.problemsSolved,
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Precisión',
      value: `${accuracy}%`,
      icon: Trophy,
      color: 'text-green-600'
    },
    {
      title: 'Racha Máxima',
      value: stats.maxStreak,
      icon: Zap,
      color: 'text-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Bienvenida */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Bienvenido a Math Adventure!
          </h1>
          <p className="text-white/80 text-lg">
            Nivel {level} • {expProgress.toFixed(0)}% hasta el siguiente nivel
          </p>
          <div className="w-full h-3 bg-white/20 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${expProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            />
          </div>
        </motion.div>

        {/* Mascota Activa */}
        {activePet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-center"
          >
            <div className="text-6xl mb-2 animate-bounce-slow">{activePet.emoji}</div>
            <h3 className="text-xl font-semibold text-white">{activePet.name}</h3>
            <p className="text-white/80">Tu compañero matemático</p>
          </motion.div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/80 text-sm">{stat.title}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center">¿Qué quieres hacer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={action.link}
                    className="block bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-200"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progreso Diario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Progreso de Hoy</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.problemsSolved}</div>
              <div className="text-white/80 text-sm">Problemas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{coins}</div>
              <div className="text-white/80 text-sm">Monedas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.streak}</div>
              <div className="text-white/80 text-sm">Racha Actual</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home