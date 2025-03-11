import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getResourceList } from "../services/apiService";
import { getResourceDetails } from "../services/apiService";

const Home = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getResourceList("pokemon", 1151).then(data => setPokemons(data?.results || []));
    }, []);

    return (
        <div className="container mt-4">
            <motion.h1
                className="text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Lista de Pokémon
            </motion.h1>

            <div className="row">
                {pokemons.map((pokemon, index) => {
                    const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
                    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                    return (
                        <motion.div
                            key={index}
                            className="col-md-3 mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">{pokemon.name}</h5>
                                    <img src={spriteUrl} alt={pokemon.name} className="img-fluid" />
                                    <Link to={`/pokemon/${pokemonId}`} className="btn btn-primary">Ver Detalles</Link>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
