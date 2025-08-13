import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [allPokemon, setAllPokemon] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);


    useEffect(() => {
        setHighlightedIndex(-1);
    }, [query, suggestions]);


    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
            .then(res => res.json())
            .then(data => setAllPokemon(data.results.map(p => p.name)))
            .catch(() => setError("Error al cargar la lista de Pokémon"));
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        setError("");

        if (value === "") {
            setSuggestions([]);
            return;
        }

        const filtered = allPokemon.filter(name => name.startsWith(value));
        setSuggestions(filtered.slice(0, 10));
    };

    const handleSelect = (name) => {
        setQuery(name);
        setSuggestions([]);
        setError("");
        navigate(`/pokemon/${name}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (allPokemon.includes(query)) {
            setSuggestions([]);
            setError("");
            navigate(`/pokemon/${query}`);
        } else {
            setError("No hay ninguna coincidencia.");
        }
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            setSuggestions([]);
        }, 100);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(prev => (prev + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter") {
            if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
                e.preventDefault();
                handleSelect(suggestions[highlightedIndex]);
            } else if (suggestions.length === 1) {
                e.preventDefault();
                handleSelect(suggestions[0]);
            }
        }
    };

    return (
        <div className="searchbar-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    ref={inputRef}
                    value={query}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar Pokémon..."
                    className="search-input"
                    autoComplete="off"
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            {suggestions.length > 0 && (
                <ul className="suggestions-list" ref={listRef}>
                    {suggestions.map((name, i) => (
                        <li
                            key={i}
                            onMouseDown={() => handleSelect(name)}
                            className={i === highlightedIndex ? "highlighted" : ""}
                        >
                            {name}
                        </li>
                    ))}

                </ul>
            )}

            {error && <p className="search-error">{error}</p>}
        </div>
    );
};

export default SearchBar;
