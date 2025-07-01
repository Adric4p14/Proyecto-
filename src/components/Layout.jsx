import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Home, BookOpen, ShoppingBag, Heart, User, Coins } from 'lucide-react'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  const location = useLocation()
  const { coins, level, experience, activePet } = useGame()
  
  const navigationItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/problemas', icon: BookOpen, label: 'Problemas' },
    { path: '/tienda', icon: ShoppingBag, label: 'Tienda' },
    { path: '/mascotas', icon: Heart, label: 'Mascotas' },
    { path: '/perfil', icon: User, label: 'Perfil' }
  ]

  const expProgress = ((experience % 100) / 100) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Header */}
      <header className="bg-white/20 backdrop-blur-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧮</span>
              </div>
              <h1 className="text-white font-bold text-xl">Math Adventure</h1>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6">
              {/* Coins */}
              <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                <Coins className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-semibold">{coins}</span>
              </div>

              {/* Level & XP */}
              <div className="flex items-center space-x-3">
                <div className="text-white text-sm">
                  <div className="font-semibold">Nivel {level}</div>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                      style={{ width: `${expProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Pet */}
              {activePet && (
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">{activePet.emoji}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/20 backdrop-blur-lg border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full ${
                      isActive 
                        ? 'bg-white/30 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className={`text-xs ${
                    isActive ? 'text-white font-semibold' : 'text-white/70'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Layout