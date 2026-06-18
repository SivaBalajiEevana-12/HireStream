
import { Routes ,Route} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
    </>
  )
}

export default App
