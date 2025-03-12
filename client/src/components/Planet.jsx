import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const Planet = () => {
    
    const [planet, setPlanet] = useState({});
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    let params = useParams();
    
    useEffect(() => {
        const fetchPlanet = async () => {
            const planet_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${params.id}`);
            const json_planet_data = await planet_data.json();
            
            setPlanet(json_planet_data);
        };
        fetchPlanet();
    }, []);

    useEffect(() => {
        const fetchCharacters = async () => {
            const characters_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${params.id}/characters`);
            const json_characters_data = await characters_data.json();
            setCharacters(json_characters_data);
        }
        fetchCharacters();
    }, []);

    useEffect(() => {
        const fetchFilms = async () => {
            const films_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${params.id}/films`);
            const json_films_data = await films_data.json();
            setFilms(json_films_data);
        }
        fetchFilms();
    }, []);

    return (
        <main>
            <h1 id="name">{planet.name}</h1>
            <section id="generalInfo">
                <p>Climate: <span id="climate">{planet.climate}</span></p>
                <p>Diameter: <span id="diameter">{planet.diameter}</span></p>
                <p>Gravity: <span id="gravity">{planet.gravity}</span></p>
                <p>Terrain: <span id="terrain">{planet.terrain}</span></p>
            </section>
            <section id="films">
                <h2>Films</h2>
                <ul>
                    {films.map((film) => (<li key={film.film_id}><Link to={`/film/${film.film_id}`}>{film.film_details[0].title}</Link></li>))}
                </ul>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>
                    {characters.map((character) => (<li key={character.id}><Link to={`/character/${character.id}`}>{character.name}</Link></li>))}
                </ul>
            </section>
        </main>
    );
}
