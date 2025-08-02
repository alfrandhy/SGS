import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter, Routes, Route, Link
} from 'react-router-dom';

import Home from './Home';
import About from './About';
import Page from './Page';

function MyApp(){
    return(
        <BrowserRouter basename="/public/">
            <h1>Hello World!</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/page">Page</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/page" element={<Page />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('App')).render(<MyApp />);