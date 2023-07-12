import React from 'react';
import App from './App';
import { render } from "react-dom";
import { ModalContextProvider } from './store/modal-context';

const app = (
    <ModalContextProvider>
        <App />
    </ModalContextProvider>
);

const appDiv = document.getElementById("app");
render(app, appDiv);