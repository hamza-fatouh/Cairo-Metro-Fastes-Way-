import React from "react";
import style from './style.css';
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Metro from "./components/metro.jsx";

function App() {
    return ( 
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/metro' element={<Metro />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;