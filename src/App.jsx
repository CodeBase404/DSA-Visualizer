import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Loginform from "./components/Loginform";
import { Routes, Route } from 'react-router';
import Visualizer from "./components/Visualizer";

function App() {
    const [algorithm, setAlgorithm] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Apply theme when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="relative md:pt-3 min-h-[100vh] overflow-hidden w-full">
            <div className="home absolute z-0 inset-0"></div>
            
            {/* Pass darkMode and setDarkMode to Navbar so toggle button is there */}
            <Navbar 
                algorithm={algorithm} 
                setAlgorithm={setAlgorithm} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
            />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Visualizer' element={<Visualizer algorithm={algorithm} setAlgorithm={setAlgorithm} />} />
                <Route path='/Login' element={<Loginform />} />
            </Routes>
        </div>
    );
}

export default App;
