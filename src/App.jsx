import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SettingsContext } from "./context/SettingsContext";
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultPage from './pages/ResultPage/ResultPage';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const { settings } = useContext(SettingsContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        
        <Route 
          path="/game" 
          element={settings && settings.playerName ? <GamePage /> : <Navigate to="/" />} 
        />
        
        <Route path="/result/:userId" element={<ResultPage />} />
        
        <Route path="/404" element={<NotFound />} />
        
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;