import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getResourceDetails } from "../services/apiService";
import "../styles/PokemonDetail.css";

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        getResourceDetails("pokemon", id).then(setPokemon);
    }, [id]);

    if (!pokemon) return <p className="text-center mt-5">Cargando...</p>;

    const getStatColor = (value) => {
        if (value < 30) return "#f34444";
        if (value < 60) return "#ff7f0f";
        if (value < 90) return "#ffdd57";
        if (value < 120) return "#a0e515";
        return "#23cd5e";
    };

    const stats = [
        { name: "HP", value: pokemon.stats[0].base_stat },
        { name: "Ataque", value: pokemon.stats[1].base_stat },
        { name: "Defensa", value: pokemon.stats[2].base_stat },
        { name: "Ataque Esp.", value: pokemon.stats[3].base_stat },
        { name: "Defensa Esp.", value: pokemon.stats[4].base_stat },
        { name: "Velocidad", value: pokemon.stats[5].base_stat }
    ];

    return (
        <>
        <div class="container">
            <motion.div
                className="pokemon-detail-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="pokemon-info">
                    <motion.img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="pokemon-image"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />
                </div>
                <div>
                    <h1>{pokemon.name}</h1>
                    <p><strong>Peso:</strong> {pokemon.weight} kg</p>
                    <p><strong>Altura:</strong> {pokemon.height} m</p>
                    <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
                </div>
                <motion.div
                    className="pokemon-stats"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h3>Estadísticas base</h3>
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-row">
                            <span className="stat-name">{stat.name}</span>
                            <span className="stat-value">{stat.value}</span>
                            <div className="stat-bar">
                                <div className="stat-fill" style={{ width: `${(stat.value / 255) * 100}%`, backgroundColor: getStatColor(stat.value) }}></div>
                            </div>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="pokemon-stats"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h3>Estadísticas base</h3>
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-row">
                            <span className="stat-name">{stat.name}</span>
                            <span className="stat-value">{stat.value}</span>
                            <div className="stat-bar">
                                <div className="stat-fill" style={{ width: `${(stat.value / 255) * 100}%`, backgroundColor: getStatColor(stat.value) }}></div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                className="pokemon-stats-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h3>Segundo contenedor</h3>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-row">
                        <span className="stat-name">{stat.name}</span>
                        <span className="stat-value">{stat.value}</span>
                        <div className="stat-bar">
                            <div className="stat-fill" style={{ width: `${(stat.value / 255) * 100}%`, backgroundColor: getStatColor(stat.value) }}></div>
                        </div>
                    </div>
                ))}
            </motion.div>

        </div>
        
        </>
        
    );
    
};

export default PokemonDetail;