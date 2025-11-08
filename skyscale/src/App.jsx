import './App.css'
import SkyscaleLanding from './pages/landingpage.jsx';
import SkyScaleCopilotPage from './pages/chatbot.jsx';
import InjectDocsPage from './pages/inject.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SkyscaleLanding />} />
        <Route path="/aiassistant" element={<SkyScaleCopilotPage />} />
        <Route path="/inject" element={<InjectDocsPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
