import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [allPokemon, setAllPokemon] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [keyboardActive, setKeyboardActive] = useState(false);

    const inputRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
            .then((res) => res.json())
            .then((data) => setAllPokemon(data.results.map((p) => p.name)))
            .catch(() => setError("Error al cargar la lista de Pokémon"));
    }, []);

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [query, suggestions]);

    useEffect(() => {
        const handleMouseMove = () => {
            if (keyboardActive){
                setKeyboardActive(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [keyboardActive]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleInputChange = (e) => {
        const value = capitalize(e.target.value);
        setQuery(value);
        setError("");

        if (value === "") {
            setSuggestions([]);
            return;
        }

        const filtered = allPokemon.filter((name) =>
            name.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 10));
    };

    const handleSelect = (name) => {
        setQuery(capitalize(name));
        setSuggestions([]);
        setError("");
        navigate(`/pokemon/${name}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const match = allPokemon.find(
            (p) => p.toLowerCase() === query.toLowerCase()
        );
        if (match) {
            setSuggestions([]);
            setError("");
            navigate(`/pokemon/${match}`);
        } else {
            setError("No hay ninguna coincidencia.");
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 100);
    };

    const handleKeyDown = (e) => {
        if (!keyboardActive) setKeyboardActive(true);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                const next = (prev + 1) % suggestions.length;
                scrollToItem(next);
                return next;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                const next = (prev - 1 + suggestions.length) % suggestions.length;
                scrollToItem(next);
                return next;
            });
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

    const scrollToItem = (index) => {
        if (listRef.current && listRef.current.children[index]) {
            listRef.current.children[index].scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
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
                <button type="submit" className="search-button">
                    Buscar
                </button>
            </form>

            {suggestions.length > 0 && (
                <ul className="suggestions-list" ref={listRef}>
                    {suggestions.map((name, i) => (
                        <li
                            key={i}
                            onMouseDown={() => handleSelect(name)}
                            onMouseEnter={() => setKeyboardActive(false)}
                            className={i === highlightedIndex ? "highlighted" : ""}
                            style={keyboardActive ? { pointerEvents: "none" } : {}}
                        >
                            {capitalize(name)}
                        </li>

                    ))}
                </ul>
            )}

            {error && <p className="search-error">{error}</p>}
        </div>
    );
};

export default SearchBar;
