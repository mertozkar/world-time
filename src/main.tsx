import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import WorldTimeDetail from './pages/WorldTimeDetail'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'


function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/world-time-detail/:timezone" element={<WorldTimeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <DataProvider>
      <Root />
      </DataProvider>
    </ThemeProvider>
  </StrictMode>,
)
