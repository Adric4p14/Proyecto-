import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { User, Trophy, Target, Zap, Settings, Award, BarChart3, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const Profile = () => {
  const { 
    level, 
    experience, 
    coins, 
    stats, 
    ownedPets, 
    activePet, 
    inventory, 
    settings, 
    updateSettings 
  } = useGame()
  
  const [activeTab, setActiveTab] = useState('stats')

  const expProgress = ((experience % 100) / 100) * 100
  const accuracy = stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0

  const achievements = [
    {
      id: 'first_problem',
      name: 'Primer Paso',
      description: 'Resuelve tu primer problema',
      icon: '🎯',
      unlocked: stats.problemsSolved >= 1,
      progress: Math.min(stats.problemsSolved, 1),
      maxProgress: 1
    },
    {
      id: 'problem_solver',
      name: 'Solucionador',
      description: 'Resuelve 10 problemas',
      icon: '📚',
      unlocked: stats.problemsSolved >= 10,
      progress: Math.min(stats.problemsSolved, 10),
      maxProgress: 10
    },
    {
      id: 'math_master',
      name: 'Maestro Matemático',
      description: 'Resuelve 50 problemas',
      icon: '🧠',
      unlocked: stats.problemsSolved >= 50,
      progress: Math.min(stats.problemsSolved, 50),
      maxProgress: 50
    },
    {
      id: 'accuracy_pro',
      name: 'Precisión',
      description: 'Mantén 90% de precisión con 10+ respuestas',
      icon: '🎯',
      unlocked: stats.totalAnswers >= 10 && accuracy >= 90,
      progress: stats.totalAnswers >= 10 ? accuracy : 0,
      maxProgress: 90
    },
    {
      id: 'streak_master',
      name: 'Racha Épica',
      description: 'Consigue una racha de 10',
      icon: '🔥',
      unlocked: stats.maxStreak >= 10,
      progress: Math.min(stats.maxStreak, 10),
      maxProgress: 10
    },
    {
      id: 'coin_collector',
      name: 'Coleccionista',
      description: 'Reúne 500 monedas',
      icon: '💰',
      unlocked: coins >= 500,
      progress: Math.min(coins, 500),
      maxProgress: 500
    },
    {
      id: 'pet_lover',
      name: 'Amante de Mascotas',
      description: 'Adopta 3 mascotas',
      icon: '🐾',
      unlocked: ownedPets.length >= 3,
      progress: Math.min(ownedPets.length, 3),
      maxProgress: 3
    },
    {
      id: 'level_up',
      name: 'Subiendo Niveles',
      description: 'Alcanza el nivel 5',
      icon: '⭐',
      unlocked: level >= 5,
      progress: Math.min(level, 5),
      maxProgress: 5
    }
  ]

  const difficultyOptions = [
    { value: 'facil', label: 'Fácil', description: 'Números pequeños, operaciones básicas' },
    { value: 'medio', label: 'Medio', description: 'Números medianos, más variedad' },
    { value: 'dificil', label: 'Difícil', description: 'Números grandes, problemas complejos' }
  ]

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value })
  }

  const renderStatsTab = () => (
    <div className="space-y-6">
      {/* Estadísticas Principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
        >
          <Target className="w-8 h-8 mx-auto mb-3 text-blue-400" />
          <div className="text-2xl font-bold text-white">{stats.problemsSolved}</div>
          <div className="text-white/80 text-sm">Problemas Resueltos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
        >
          <Trophy className="w-8 h-8 mx-auto mb-3 text-green-400" />
          <div className="text-2xl font-bold text-white">{accuracy}%</div>
          <div className="text-white/80 text-sm">Precisión</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
        >
          <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
          <div className="text-2xl font-bold text-white">{stats.maxStreak}</div>
          <div className="text-white/80 text-sm">Racha Máxima</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center"
        >
          <Award className="w-8 h-8 mx-auto mb-3 text-purple-400" />
          <div className="text-2xl font-bold text-white">{level}</div>
          <div className="text-white/80 text-sm">Nivel Actual</div>
        </motion.div>
      </div>

      {/* Progreso de Nivel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Progreso de Nivel</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white">Nivel {level}</span>
          <span className="text-white/80">{experience} XP</span>
        </div>
        <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${expProgress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
          />
        </div>
        <div className="text-center text-white/80 mt-2">
          {100 - (experience % 100)} XP hasta el siguiente nivel
        </div>
      </motion.div>

      {/* Desglose de Respuestas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Análisis de Respuestas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.correctAnswers}</div>
            <div className="text-white/80 text-sm">Correctas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">{stats.totalAnswers - stats.correctAnswers}</div>
            <div className="text-white/80 text-sm">Incorrectas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{stats.totalAnswers}</div>
            <div className="text-white/80 text-sm">Total</div>
          </div>
        </div>
        
        {stats.totalAnswers > 0 && (
          <div className="mt-4">
            <div className="w-full h-6 bg-white/20 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-green-400 transition-all duration-1000"
                style={{ width: `${(stats.correctAnswers / stats.totalAnswers) * 100}%` }}
              />
              <div 
                className="h-full bg-red-400 transition-all duration-1000"
                style={{ width: `${((stats.totalAnswers - stats.correctAnswers) / stats.totalAnswers) * 100}%` }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Logros</h2>
        <p className="text-white/80">
          Has desbloqueado {achievements.filter(a => a.unlocked).length} de {achievements.length} logros
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/20 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all ${
              achievement.unlocked 
                ? 'border-yellow-400/50 bg-yellow-400/10' 
                : 'border-transparent'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 ${
                  achievement.unlocked ? 'text-yellow-300' : 'text-white/70'
                }`}>
                  {achievement.name}
                </h3>
                <p className="text-white/80 text-sm mb-3">{achievement.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Progreso</span>
                    <span className={achievement.unlocked ? 'text-yellow-300' : 'text-white/70'}>
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>

                {achievement.unlocked && (
                  <div className="mt-3 flex items-center space-x-2 text-yellow-300">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-semibold">¡DESBLOQUEADO!</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderInventoryTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Inventario</h2>
        <p className="text-white/80">Tus objetos y recursos</p>
      </div>

      {/* Potenciadores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Potenciadores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(inventory.boosters).map(([key, count]) => {
            const boosterNames = {
              doubleXP: { name: 'Doble XP', icon: '⚡' },
              timeBooster: { name: 'Tiempo Extra', icon: '⏰' },
              hintBooster: { name: 'Pista', icon: '💡' },
              coinMultiplier: { name: 'Monedas x2', icon: '🪙' }
            }
            const booster = boosterNames[key]
            
            return (
              <div key={key} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{booster.icon}</div>
                <div className="text-white text-sm font-semibold">{booster.name}</div>
                <div className="text-yellow-300 text-lg font-bold">{count}</div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Accesorios */}
      {inventory.accessories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Accesorios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.accessories.map((accessory, index) => (
              <div key={accessory.id} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{accessory.icon}</div>
                <div className="text-white font-semibold">{accessory.name}</div>
                <div className="text-white/80 text-sm">{accessory.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Mascotas */}
      {ownedPets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Mascotas ({ownedPets.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ownedPets.map(pet => (
              <div 
                key={pet.id} 
                className={`bg-white/10 rounded-xl p-4 text-center border-2 ${
                  activePet?.id === pet.id ? 'border-yellow-400' : 'border-transparent'
                }`}
              >
                <div className="text-3xl mb-2">{pet.emoji}</div>
                <div className="text-white text-sm font-semibold">{pet.name}</div>
                <div className="text-white/80 text-xs">Nivel {pet.level || 1}</div>
                {activePet?.id === pet.id && (
                  <div className="text-yellow-300 text-xs mt-1">Activa ⭐</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Configuración</h2>
        <p className="text-white/80">Personaliza tu experiencia de juego</p>
      </div>

      {/* Dificultad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Dificultad</h3>
        <div className="space-y-3">
          {difficultyOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                value={option.value}
                checked={settings.difficulty === option.value}
                onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <div className="text-white font-semibold">{option.label}</div>
                <div className="text-white/70 text-sm">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Opciones de Audio y Visuales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Audio y Visuales</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-white font-semibold">Sonidos</div>
              <div className="text-white/70 text-sm">Efectos de sonido del juego</div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-white font-semibold">Animaciones</div>
              <div className="text-white/70 text-sm">Efectos visuales y transiciones</div>
            </div>
            <input
              type="checkbox"
              checked={settings.animationsEnabled}
              onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
          </label>
        </div>
      </motion.div>
    </div>
  )

  const tabs = [
    { id: 'stats', name: 'Estadísticas', icon: BarChart3 },
    { id: 'achievements', name: 'Logros', icon: Trophy },
    { id: 'inventory', name: 'Inventario', icon: Award },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ]

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header del Perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center"
        >
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Matemático Aventurero</h1>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{level}</div>
              <div className="text-sm">Nivel</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{coins}</div>
              <div className="text-sm">Monedas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{ownedPets.length}</div>
              <div className="text-sm">Mascotas</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center space-x-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'stats' && renderStatsTab()}
          {activeTab === 'achievements' && renderAchievementsTab()}
          {activeTab === 'inventory' && renderInventoryTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>
    </div>
  )
}

export default Profile