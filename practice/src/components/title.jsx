import React, { useEffect, useRef, useState } from "react";
import styles from './assets/pokeTitle.module.css';
import { useData } from "./common/dataContext";

const Table = (prop) => {

    const title = useRef();
    const itemsOnPage = useData();
    const [activeTags, changeActiveTag] = useState([]);
    const searchContent = useRef();

    const changeItemsOnPage = (newValue) => {
        itemsOnPage.updateItemsValue(newValue);
    }

    const changeTags = (newValue) => {
        itemsOnPage.updatePokeTags(newValue);
    }

    const searchButtonClick = () => {
        itemsOnPage.updateSearchContent(searchContent.current.value.toLowerCase());
    }

    const setActiveTag = (event) => {
        if (event.target.style.backgroundColor != 'rgb(242, 121, 170)') {
            event.target.style.backgroundColor = 'rgb(242, 121, 170)';
            event.target.style.color = 'rgb(40, 42, 54)';
        } else {
            event.target.style.backgroundColor = 'rgb(38, 26, 54)';
            event.target.style.color = 'rgb(32, 147, 218)';
        }
        let index = activeTags.indexOf(event.target.textContent);
        if (index !== -1) {
            activeTags.splice(index, 1);
        } else {
            activeTags.push(event.target.textContent.toLowerCase());
        }
        changeTags(activeTags);
    }

    return (
        <div className={styles.pokeArea}>
            <div className={styles.pokePlaceTitle} ref={title} >
                <div className={styles.searchArea}>
                <input onChange={searchButtonClick} ref={searchContent} className={styles.searcher}placeholder=" SEARCH"></input>
                </div>
                <div className={styles.pokePlaceTags}>
                <span color="purple" className={styles.tags}>TAGS</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>NORMAL</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>FIRE</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>WATER</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>GRASS</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>ELECTRIC</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>ICE</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>FIGHTING</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>POISON</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>GROUND</span>
                    <span onClick={setActiveTag} className={styles.pokeTags}>FLYING</span>
                </div>
                <div className={styles.itemsPlaceNumber}>
                    <div className={styles.placeNumber}>
                    <span color="purple">COUNT ON PAGE</span>
                        <button onClick={() => {changeItemsOnPage(10)}} className={styles.buttonItemsNumber}><span>1O</span></button>
                        <button onClick={() => {changeItemsOnPage(20)}} className={styles.buttonItemsNumber}><span>2O</span></button>
                        <button onClick={() => {changeItemsOnPage(50)}} className={styles.buttonItemsNumber}><span>5O</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;