import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import MatchDetails from './components/pages/MatchDetails'
import Navbar from './components/Navbar/Navbar'
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match/:id" element={<MatchDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
