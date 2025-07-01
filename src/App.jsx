import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import MathProblems from './pages/MathProblems'
import Shop from './pages/Shop'
import Pets from './pages/Pets'
import Profile from './pages/Profile'

function App() {
  return (
    <GameProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problemas" element={<MathProblems />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/mascotas" element={<Pets />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </GameProvider>
  )
}

export default App