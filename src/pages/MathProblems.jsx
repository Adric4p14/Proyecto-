import React, { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { Clock, Lightbulb, Zap, X2, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

const MathProblems = () => {
  const { 
    addCoins, 
    addExperience, 
    updateStats, 
    inventory, 
    useBooster, 
    settings,
    activePet 
  } = useGame()
  
  const [currentProblem, setCurrentProblem] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [activeBooster, setActiveBooster] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [problemType, setProblemType] = useState('aritmetica')

  const problemTypes = [
    { id: 'aritmetica', name: 'Aritmética', icon: '➕' },
    { id: 'algebra', name: 'Álgebra', icon: '📐' },
    { id: 'geometria', name: 'Geometría', icon: '📏' },
    { id: 'fracciones', name: 'Fracciones', icon: '½' }
  ]

  const boosters = [
    { 
      id: 'doubleXP', 
      name: 'Doble XP', 
      icon: X2, 
      description: 'Duplica la experiencia por 5 problemas',
      count: inventory.boosters.doubleXP 
    },
    { 
      id: 'timeBooster', 
      name: 'Tiempo Extra', 
      icon: Clock, 
      description: 'Añade 30 segundos extra',
      count: inventory.boosters.timeBooster 
    },
    { 
      id: 'hintBooster', 
      name: 'Pista', 
      icon: Lightbulb, 
      description: 'Muestra una pista útil',
      count: inventory.boosters.hintBooster 
    },
    { 
      id: 'coinMultiplier', 
      name: 'Monedas x2', 
      icon: Zap, 
      description: 'Duplica las monedas por 3 problemas',
      count: inventory.boosters.coinMultiplier 
    }
  ]

  // Generar problema matemático
  const generateProblem = () => {
    const difficultyLevel = settings.difficulty === 'facil' ? 1 : settings.difficulty === 'medio' ? 2 : 3
    let problem = {}

    switch (problemType) {
      case 'aritmetica':
        problem = generateArithmeticProblem(difficultyLevel)
        break
      case 'algebra':
        problem = generateAlgebraProblem(difficultyLevel)
        break
      case 'geometria':
        problem = generateGeometryProblem(difficultyLevel)
        break
      case 'fracciones':
        problem = generateFractionProblem(difficultyLevel)
        break
      default:
        problem = generateArithmeticProblem(difficultyLevel)
    }

    setCurrentProblem(problem)
    setUserAnswer('')
    setFeedback(null)
    setShowHint(false)
    setTimeLeft(activeBooster?.id === 'timeBooster' ? 90 : 60)
  }

  const generateArithmeticProblem = (level) => {
    const operations = ['+', '-', '*', '/']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    
    let a, b, answer, question, hint
    
    switch (level) {
      case 1:
        a = Math.floor(Math.random() * 20) + 1
        b = Math.floor(Math.random() * 20) + 1
        break
      case 2:
        a = Math.floor(Math.random() * 50) + 1
        b = Math.floor(Math.random() * 50) + 1
        break
      case 3:
        a = Math.floor(Math.random() * 100) + 1
        b = Math.floor(Math.random() * 100) + 1
        break
    }

    switch (operation) {
      case '+':
        answer = a + b
        question = `${a} + ${b} = ?`
        hint = `Suma ${a} y ${b} paso a paso`
        break
      case '-':
        if (a < b) [a, b] = [b, a]
        answer = a - b
        question = `${a} - ${b} = ?`
        hint = `Resta ${b} de ${a}`
        break
      case '*':
        answer = a * b
        question = `${a} × ${b} = ?`
        hint = `Multiplica ${a} por ${b}, o suma ${a} veces ${b}`
        break
      case '/':
        answer = a
        a = a * b
        question = `${a} ÷ ${b} = ?`
        hint = `¿Cuántas veces cabe ${b} en ${a}?`
        break
    }

    return { question, answer, hint, type: 'aritmetica' }
  }

  const generateAlgebraProblem = (level) => {
    const x = Math.floor(Math.random() * 20) + 1
    const coeff = Math.floor(Math.random() * 10) + 1
    const constant = Math.floor(Math.random() * 20) + 1
    
    const result = coeff * x + constant
    const question = `Si ${coeff}x + ${constant} = ${result}, ¿cuál es el valor de x?`
    const hint = `Resta ${constant} de ambos lados, luego divide por ${coeff}`
    
    return { question, answer: x, hint, type: 'algebra' }
  }

  const generateGeometryProblem = (level) => {
    const shapes = ['cuadrado', 'rectángulo', 'triángulo', 'círculo']
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    
    let question, answer, hint
    
    if (shape === 'cuadrado') {
      const side = Math.floor(Math.random() * 10) + 1
      answer = side * side
      question = `¿Cuál es el área de un cuadrado con lado de ${side} unidades?`
      hint = `Área = lado × lado = ${side} × ${side}`
    } else if (shape === 'rectángulo') {
      const length = Math.floor(Math.random() * 10) + 1
      const width = Math.floor(Math.random() * 10) + 1
      answer = length * width
      question = `¿Cuál es el área de un rectángulo de ${length} × ${width} unidades?`
      hint = `Área = largo × ancho = ${length} × ${width}`
    }
    
    return { question, answer, hint, type: 'geometria' }
  }

  const generateFractionProblem = (level) => {
    const num1 = Math.floor(Math.random() * 9) + 1
    const den1 = Math.floor(Math.random() * 9) + 1
    const num2 = Math.floor(Math.random() * 9) + 1
    const den2 = Math.floor(Math.random() * 9) + 1
    
    // Suma de fracciones con mismo denominador para simplificar
    const commonDen = den1
    const resultNum = num1 + num2
    const answer = parseFloat((resultNum / commonDen).toFixed(2))
    
    const question = `${num1}/${commonDen} + ${num2}/${commonDen} = ? (respuesta decimal)`
    const hint = `Suma los numeradores: ${num1} + ${num2} = ${resultNum}, luego divide por ${commonDen}`
    
    return { question, answer, hint, type: 'fracciones' }
  }

  // Manejar respuesta
  const handleAnswer = () => {
    if (!currentProblem || !userAnswer.trim()) return

    const isCorrect = Math.abs(parseFloat(userAnswer) - currentProblem.answer) < 0.01
    const baseCoins = isCorrect ? 10 : 5
    const baseExp = isCorrect ? 20 : 10
    
    const coinMultiplier = activeBooster?.id === 'coinMultiplier' ? 2 : 1
    const expMultiplier = activeBooster?.id === 'doubleXP' ? 2 : 1
    
    const coinsEarned = baseCoins * coinMultiplier
    const expEarned = baseExp * expMultiplier

    addCoins(coinsEarned)
    addExperience(expEarned)
    updateStats(isCorrect)

    setFeedback({
      correct: isCorrect,
      coinsEarned,
      expEarned,
      answer: currentProblem.answer
    })

    // Reducir contador de booster activo
    if (activeBooster) {
      setActiveBooster(prev => ({ ...prev, remaining: prev.remaining - 1 }))
      if (activeBooster.remaining <= 1) {
        setActiveBooster(null)
      }
    }

    setTimeout(() => {
      generateProblem()
    }, 3000)
  }

  // Usar potenciador
  const activateBooster = (boosterId) => {
    if (inventory.boosters[boosterId] <= 0) return

    useBooster(boosterId)

    switch (boosterId) {
      case 'doubleXP':
        setActiveBooster({ id: boosterId, remaining: 5 })
        break
      case 'timeBooster':
        setTimeLeft(prev => prev + 30)
        break
      case 'hintBooster':
        setShowHint(true)
        break
      case 'coinMultiplier':
        setActiveBooster({ id: boosterId, remaining: 3 })
        break
    }
  }

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && currentProblem && !feedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentProblem) {
      handleAnswer()
    }
  }, [timeLeft, currentProblem, feedback])

  // Inicializar primer problema
  useEffect(() => {
    generateProblem()
  }, [problemType])

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Problemas Matemáticos</h1>
          <p className="text-white/80">Resuelve problemas y gana experiencia</p>
        </div>

        {/* Tipo de Problema */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-3">Tipo de Problema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {problemTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setProblemType(type.id)}
                className={`p-3 rounded-xl transition-all ${
                  problemType === type.id 
                    ? 'bg-white/30 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <div className="text-sm">{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Potenciadores */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-3">Potenciadores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {boosters.map(booster => {
              const Icon = booster.icon
              const isActive = activeBooster?.id === booster.id
              return (
                <button
                  key={booster.id}
                  onClick={() => activateBooster(booster.id)}
                  disabled={booster.count <= 0}
                  className={`p-3 rounded-xl transition-all relative ${
                    isActive
                      ? 'bg-green-500/30 text-white'
                      : booster.count > 0
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-xs">{booster.name}</div>
                  <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {booster.count}
                  </div>
                  {isActive && (
                    <div className="absolute bottom-1 right-1 text-xs text-green-300">
                      {activeBooster.remaining}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Problema Principal */}
        {currentProblem && (
          <motion.div
            key={currentProblem.question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center"
          >
            {/* Timer */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5" />
                <span className={`font-semibold ${timeLeft <= 10 ? 'text-red-300' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
              {activePet && (
                <div className="text-3xl animate-bounce-slow">{activePet.emoji}</div>
              )}
            </div>

            {/* Pregunta */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {currentProblem.question}
            </h2>

            {/* Pista */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-500/20 rounded-2xl p-4 mb-6"
              >
                <div className="flex items-center justify-center space-x-2 text-yellow-200">
                  <Lightbulb className="w-5 h-5" />
                  <span className="font-semibold">Pista:</span>
                </div>
                <p className="text-white mt-2">{currentProblem.hint}</p>
              </motion.div>
            )}

            {/* Input y Botones */}
            {!feedback ? (
              <div className="space-y-4">
                <input
                  type="number"
                  step="0.01"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full max-w-xs mx-auto bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white text-center text-xl font-semibold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Tu respuesta"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswer()}
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleAnswer}
                    disabled={!userAnswer.trim()}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
                  >
                    Responder
                  </button>
                  <button
                    onClick={generateProblem}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Nuevo</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Feedback */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className={`flex items-center justify-center space-x-2 text-2xl ${
                  feedback.correct ? 'text-green-300' : 'text-red-300'
                }`}>
                  {feedback.correct ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <XCircle className="w-8 h-8" />
                  )}
                  <span className="font-bold">
                    {feedback.correct ? '¡Correcto!' : '¡Incorrecto!'}
                  </span>
                </div>
                
                {!feedback.correct && (
                  <p className="text-white/80">
                    La respuesta correcta era: <span className="font-bold text-white">{feedback.answer}</span>
                  </p>
                )}
                
                <div className="flex items-center justify-center space-x-6 text-white">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-300">🪙</span>
                    <span className="font-semibold">+{feedback.coinsEarned}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-300">⭐</span>
                    <span className="font-semibold">+{feedback.expEarned} XP</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MathProblems