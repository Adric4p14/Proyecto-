import React, { createContext, useContext, useReducer, useEffect } from 'react'

const GameContext = createContext()

const initialState = {
  coins: 100,
  level: 1,
  experience: 0,
  activePet: null,
  ownedPets: [],
  inventory: {
    boosters: {
      doubleXP: 0,
      timeBooster: 0,
      hintBooster: 0,
      coinMultiplier: 0
    },
    accessories: []
  },
  stats: {
    problemsSolved: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    streak: 0,
    maxStreak: 0
  },
  settings: {
    difficulty: 'medio',
    soundEnabled: true,
    animationsEnabled: true
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'ADD_COINS':
      return { ...state, coins: state.coins + action.amount }
    
    case 'SPEND_COINS':
      return { ...state, coins: Math.max(0, state.coins - action.amount) }
    
    case 'ADD_EXPERIENCE':
      const newExp = state.experience + action.amount
      const newLevel = Math.floor(newExp / 100) + 1
      return { 
        ...state, 
        experience: newExp,
        level: newLevel
      }
    
    case 'SET_ACTIVE_PET':
      return { ...state, activePet: action.pet }
    
    case 'ADD_PET':
      return { 
        ...state, 
        ownedPets: [...state.ownedPets, action.pet],
        activePet: state.activePet || action.pet
      }
    
    case 'ADD_BOOSTER':
      return {
        ...state,
        inventory: {
          ...state.inventory,
          boosters: {
            ...state.inventory.boosters,
            [action.boosterType]: state.inventory.boosters[action.boosterType] + action.amount
          }
        }
      }
    
    case 'USE_BOOSTER':
      return {
        ...state,
        inventory: {
          ...state.inventory,
          boosters: {
            ...state.inventory.boosters,
            [action.boosterType]: Math.max(0, state.inventory.boosters[action.boosterType] - 1)
          }
        }
      }
    
    case 'ADD_ACCESSORY':
      return {
        ...state,
        inventory: {
          ...state.inventory,
          accessories: [...state.inventory.accessories, action.accessory]
        }
      }
    
    case 'UPDATE_STATS':
      const { correct, total } = action
      const newStreak = correct ? state.stats.streak + 1 : 0
      return {
        ...state,
        stats: {
          ...state.stats,
          problemsSolved: state.stats.problemsSolved + 1,
          correctAnswers: state.stats.correctAnswers + (correct ? 1 : 0),
          totalAnswers: state.stats.totalAnswers + 1,
          streak: newStreak,
          maxStreak: Math.max(state.stats.maxStreak, newStreak)
        }
      }
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.settings }
      }
    
    case 'LOAD_GAME_STATE':
      return { ...state, ...action.gameState }
    
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Cargar estado del localStorage al iniciar
  useEffect(() => {
    const savedState = localStorage.getItem('mathAdventureGame')
    if (savedState) {
      try {
        const gameState = JSON.parse(savedState)
        dispatch({ type: 'LOAD_GAME_STATE', gameState })
      } catch (error) {
        console.error('Error loading game state:', error)
      }
    }
  }, [])

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('mathAdventureGame', JSON.stringify(state))
  }, [state])

  const value = {
    ...state,
    dispatch,
    // Acciones auxiliares
    addCoins: (amount) => dispatch({ type: 'ADD_COINS', amount }),
    spendCoins: (amount) => dispatch({ type: 'SPEND_COINS', amount }),
    addExperience: (amount) => dispatch({ type: 'ADD_EXPERIENCE', amount }),
    setActivePet: (pet) => dispatch({ type: 'SET_ACTIVE_PET', pet }),
    addPet: (pet) => dispatch({ type: 'ADD_PET', pet }),
    addBooster: (boosterType, amount = 1) => dispatch({ type: 'ADD_BOOSTER', boosterType, amount }),
    useBooster: (boosterType) => dispatch({ type: 'USE_BOOSTER', boosterType }),
    addAccessory: (accessory) => dispatch({ type: 'ADD_ACCESSORY', accessory }),
    updateStats: (correct) => dispatch({ type: 'UPDATE_STATS', correct }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', settings })
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}