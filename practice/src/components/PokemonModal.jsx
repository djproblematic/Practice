import React from "react";
import styles from './assets/modal.module.css';

const PokemonModal = ({ pokemon, onClose }) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.titleName}>{pokemon.name}</h2>
                <div className={styles.pokemonContainer}>
                    <img className={styles.imgContent} src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <div className={styles.infoContainer}>
                    <div>
                        <h3>TYPE:</h3>
                        <ul>
                            {pokemon.types.map((type, index) => (
                                <li key={index}>{type.type.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>STATS:</h3>
                        <ul>
                            {pokemon.stats.map((stat, index) => (
                                <li key={index}>{stat.stat.name.toUpperCase()}: {stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;
