import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/HeaderExperimental';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Resume from './pages/Resume';
import SendResume from './pages/SendResume';

function App() {
  const [result, setResult] = useState({});

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home setResult={setResult} />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="/resume" element={<Resume result={result} />} />
        <Route path="/send/resume" element={<SendResume />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
