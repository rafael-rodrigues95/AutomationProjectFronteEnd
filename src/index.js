import React from 'react';
import ReactDOM from 'react-dom/client';
import RoboApp from './RoboApp';
import "./scss/custom.scss"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RoboApp />
    </React.StrictMode>
);