import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Resume from './components/Resume';
import SendResume from './components/SendResume';

function App() {
  const [result, setResult] = useState({});

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home setResult={setResult} />} />
          <Route path="/resume" element={<Resume result={result} />} />
          <Route path="/send/resume" element={<SendResume />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
