import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./views/Login"
import Signup from "./views/Signup"
import Dashboard from "./views/Dashboard"

import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="flex flex-col justify-center h-screen max-w-6xl px-6 pt-6 mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      <footer className="py-10 text-sm text-center border-t-2">
        2025 Mario García Relaño · URL Shortener
      </footer>
    </BrowserRouter>
  )
}

export default App
