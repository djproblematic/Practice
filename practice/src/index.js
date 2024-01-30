import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// import Title from './components/title';
// import Table from './components/table';
import Main from './components/main.jsx';
// import styles from './components/assets/global.module.css';

import { DataProvider } from './components/common/dataContext';
import PokemonModal from './components/PokemonModal.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Main>
    </Main>
  </React.StrictMode>
);

reportWebVitals();