import React from 'react';
import Button from './components/Button/Button';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Router from './pages/Router';

function App() {
    return (
        <div className="App">
            {/* <Home /> */}
            <Router />
        </div>
    );
}

export default App;