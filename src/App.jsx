import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ApodComponent from './components/ApodComponent';
import NeoComponent from './components/NeoComponent';
import EpicComponent from './components/EpicComponent';


const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">APOD</Link>
                        </li>
                        <li>
                            <Link to="/neo">NEO</Link>
                        </li>
                        <li>
                            <Link to="/epic">EPIC</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<ApodComponent />} />
                    <Route path="/neo" element={<NeoComponent />} />
                    <Route path="/epic" element={<EpicComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
