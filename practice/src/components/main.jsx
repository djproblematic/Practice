import React, { useEffect, useState, useRef } from "react";
// import styles from './assets/pokeTable.module.css';
// import titleStyles from './assets/pokeTitle.module.css';
import styles from './assets/main.module.css';
import ReactPaginate from "react-paginate";
import NextButton from './common/nextButton';
import PrevButton from './common/prevButton';
import PokemonModal from './PokemonModal';

const Table = () => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [itemsValue, setItemsValue] = useState(10); // Default value, change as needed
    const [activeTags, setActiveTags] = useState([]);
    const [searchContent, setSearchContent] = useState("");



    const fetchDataWithoutTags = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsValue}&offset=${currentPage * itemsValue}`);
            const data = await response.json();
            const pokemonData = await Promise.all(data.results.map(async (pokemon) => {
                const detailedResponse = await fetch(pokemon.url);
                const detailedData = await detailedResponse.json();
                return detailedData;
            }));
            setPokemonDetails(pokemonData);
            setPageCount(Math.ceil(data.count / itemsValue));
        } catch (error) {
            console.error("Error fetching data without tags:", error);
        }
    };

    const fetchDataWithTags = async () => {
        try {
            let allPokemonDetailsData = [];
            for (const tag of activeTags) {
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
            setPageCount(Math.ceil(allPokemonDetailsData.length / itemsValue));
            setCurrentTags(activeTags);
        } catch (error) {
            console.error("Error fetching data with tags:", error);
        }
    };

    const fetchDataByName = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchContent}`);
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
        if (activeTags.length > 0) {
            fetchDataWithTags();
        } else if (searchContent) {
            fetchDataByName();
        } else {
            fetchDataWithoutTags();
        }
    }, [currentPage, itemsValue, activeTags, searchContent]);

    const changeItemsOnPage = (newValue) => {
        setItemsValue(newValue);
    }

    const setActiveTag = (tag) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(t => t !== tag));
        } else {
            setActiveTags([...activeTags, tag]);
        }
    }

    const searchButtonClick = () => {
        fetchDataByName();
    }

    return (
        <div className={styles.pokeArea}>
            {selectedPokemon && (
                <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
            )}
            <div className={styles.searchArea}>
                <input onChange={(e) => setSearchContent(e.target.value.toLowerCase())} className={styles.searcher} placeholder=" SEARCH"></input>
                {/* <button onClick={searchButtonClick}>SEARCH</button> */}
            </div>
            <div className={styles.pokePlaceTags}>
                <span color="purple" className={styles.tags}>TAGS</span>
                <span onClick={() => setActiveTag('normal')} className={styles.pokeTags}>NORMAL</span>
                <span onClick={() => setActiveTag('fire')} className={styles.pokeTags}>FIRE</span>
                <span onClick={() => setActiveTag('water')} className={styles.pokeTags}>WATER</span>
                <span onClick={() => setActiveTag('grass')} className={styles.pokeTags}>GRASS</span>
                <span onClick={() => setActiveTag('electric')} className={styles.pokeTags}>ELECTRIC</span>
                <span onClick={() => setActiveTag('ice')} className={styles.pokeTags}>ICE</span>
                <span onClick={() => setActiveTag('fighting')} className={styles.pokeTags}>FIGHTING</span>
                <span onClick={() => setActiveTag('poison')} className={styles.pokeTags}>POISON</span>
                <span onClick={() => setActiveTag('ground')} className={styles.pokeTags}>GROUND</span>
                <span onClick={() => setActiveTag('flying')} className={styles.pokeTags}>FLYING</span>
            </div>

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
            <div className={styles.pokeList} style={{ gridTemplateRows: `repeat(${itemsValue / 5}, 1fr)` }}>
                {pokemonDetails.map((pokemon, index) => (
                    <div key={index} className={styles.pokeCard} onClick={() => setSelectedPokemon(pokemon)}>
                        <span className={`${styles.upperCase} ${styles.titleName}`} color="purple">{pokemon.name}</span>
                        <img className={styles.imgContent} src={pokemon.sprites?.front_default} alt={pokemon.name} /> {/* Используется оператор ?. */}
                    </div>
                ))}
            </div>
            <div className={styles.itemsPlaceNumber}>
                <div className={styles.placeNumber}>
                    <span color="purple">COUNT ON PAGE</span>
                    <button onClick={() => { changeItemsOnPage(10) }} className={styles.buttonItemsNumber}><span>10</span></button>
                    <button onClick={() => { changeItemsOnPage(20) }} className={styles.buttonItemsNumber}><span>20</span></button>
                    <button onClick={() => { changeItemsOnPage(50) }} className={styles.buttonItemsNumber}><span>50</span></button>
                </div>
            </div>
        </div>
    );
};

export default Table;
