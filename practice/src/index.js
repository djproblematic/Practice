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

function searchPokemon() {
  // Получаем значение из поля ввода поиска
  var searchText = document.getElementById("searchContent").value.toLowerCase();
  
  // Получаем все элементы с классом "pokeCard"
  var pokeCards = document.querySelectorAll(".pokeCard");

  // Проходим по каждому элементу и скрываем те, которые не соответствуют введенному тексту
  pokeCards.forEach(function(card) {
      var pokemonName = card.querySelector(".titleName").innerText.toLowerCase();
      if (pokemonName.includes(searchText)) {
          card.style.display = "flex"; // Показываем карточку, если текст найден
      } else {
          card.style.display = "none"; // Скрываем карточку, если текст не найден
      }
  });
}
