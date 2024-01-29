import React, { useEffect, useState } from "react";
import styles from './assets/pokeTable.module.css';
import ReactPaginate from "react-paginate";
import NextButton from './common/nextButton';
import PrevButton from './common/prevButon';
import { useData } from "./common/dataContext";
import PokemonModal from './PokemonModal';

const Table = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const itemsOnPage = useData();

  const fetchDataWithoutTags = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsOnPage.itemsValue}&offset=${currentPage * itemsOnPage.itemsValue}`);
      const data = await response.json();
      const pokemonData = await Promise.all(data.results.map(async (pokemon) => {
        const detailedResponse = await fetch(pokemon.url);
        const detailedData = await detailedResponse.json();
        return detailedData;
      }));
      setPokemonDetails(pokemonData);
      setPageCount(Math.ceil(data.count / itemsOnPage.itemsValue));
    } catch (error) {
      console.error("Error fetching data without tags:", error);
    }
  };

  const fetchDataWithTags = async () => {
    try {
      let allPokemonDetailsData = [];
      for (const tag of itemsOnPage.pokeTags) {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${tag}`);
        const data = await response.json();
        const pokemonData = await Promise.all(data.pokemon.map(async (pokemon) => {
          const detailedResponse = await fetch(pokemon.pokemon.url);
          const detailedData = await detailedResponse.json();
          return detailedData;
        }));
        allPokemonDetailsData = allPokemonDetailsData.concat(pokemonData);
      }
      setPokemonDetails(allPokemonDetailsData);
      setPageCount(Math.ceil(allPokemonDetailsData.length / itemsOnPage.itemsValue));
      setCurrentTags(itemsOnPage.pokeTags);
    } catch (error) {
      console.error("Error fetching data with tags:", error);
    }
  };

  const fetchDataByName = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${itemsOnPage.searchContent}`);
      const data = await response.json();
      setPokemonDetails([data]);
      setPageCount(1);
    } catch (error) {
      console.error("Error fetching data by name:", error);
    }
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    if (itemsOnPage.pokeTags.length > 0) {
      fetchDataWithTags();
    } else if (itemsOnPage.searchContent) {
      fetchDataByName();
    } else {
      fetchDataWithoutTags();
    }
  }, [currentPage, itemsOnPage.itemsValue, itemsOnPage.pokeTags, itemsOnPage.searchContent]);

  return (
    <div className={styles.pokeArea}>
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
      <ReactPaginate
        className={styles.pokePaginate}
        previousLabel={<PrevButton />}
        nextLabel={<NextButton />}
        breakLabel={''}
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={changePage}
        activeClassName={styles.activePage}
        pageClassName={styles.pages}
        previousClassName={styles.prev}
        nextClassName={styles.next}
      />
      <div className={styles.pokeList} style={{ gridTemplateRows: `repeat(${itemsOnPage.itemsValue / 5}, 1fr)` }}>
        {pokemonDetails.map((pokemon, index) => (
          <div key={index} className={styles.pokeCard} onClick={() => setSelectedPokemon(pokemon)}>
            <span className={`${styles.upperCase} ${styles.titleName}`} color="purple">{pokemon.name}</span>
            <img className={styles.imgContent} src={pokemon.sprites.front_default} alt={pokemon.name} />
            {pokemon.types.map((type, index) => (
              <span key={index} className={styles.typeName}>
                <span className={styles.upperCase}>{type.type.name}</span>
              </span>
            ))}
            <span color="pink" className={styles.statTitle}>STATS:</span>
            {pokemon.stats.map((stat, index) => (
              <span key={index} className={styles.statInfo}>{stat.stat.name.toUpperCase()}: {stat.base_stat}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
