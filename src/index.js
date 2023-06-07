import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { BrowserRouter as Router } from "react-router-dom";
import { AlertProvider } from "./common/context/alert/AlertProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AlertProvider>
            <App />
        </AlertProvider>
    </Router>
);
