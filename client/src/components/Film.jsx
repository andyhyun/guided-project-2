import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

export const Film = () => {
    const [film, setFilm] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    let params = useParams();
    
    useEffect(() => {
        const fetchFilm = async () => {
            const film_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/films/${params.id}`);
            const json_film_data = await film_data.json();
            setFilm(json_film_data);
        };
        fetchFilm();
    }, []);
    
    useEffect(() => {
        const fetchCharacters = async () => {
            const characters_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/films/${params.id}/characters`);
            const json_characters_data = await characters_data.json();
            setCharacters(json_characters_data);
        };
        fetchCharacters();
    }, []);
    
    useEffect(() => {
        const fetchPlanets = async () => {
            const planets_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/films/${params.id}/planets`);
            const json_planets_data = await planets_data.json();
            setPlanets(json_planets_data);
        };
        fetchPlanets();
    }, []);

    return (
        <main>
            <h1 id="title">{film.title}</h1>
            <section id="generalInfo">
                <p><span id="crawl">{film.opening_crawl}</span></p>
                <p>Released: <span id="released">{film.release_date}</span></p>
                <p>Director: <span id="director">{film.director}</span></p>
                {/* <p>Episode: <span id="episode">{film.episode_id}</span></p> */}
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>
                    {characters.map((character) => <li key={character.character_id}><Link to={`/character/${character.character_id}`}>{character.character_details[0]?.name}</Link></li>)}
                </ul>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <ul>
                    {planets.map((planet) => <li key={planet.planet_id}><Link to={`/planet/${planet.planet_id}`}>{planet.planet_details[0]?.name}</Link></li>)}
                </ul>
            </section>
        </main>
    );
};