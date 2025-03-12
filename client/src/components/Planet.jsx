import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        <>
            <h1>{planet.name}</h1>
            <p>{`Climate: ${planet.climate}`}</p>
            <p>{`Diameter: ${planet.diameter}`}</p>
            <p>{`Gravity: ${planet.gravity}`}</p>
            <p>{`Terrain: ${planet.terrain}`}</p>
            <h2>Films</h2>
            <div>
                {console.log(characters)}
                {films.map((film) => (<div key={film.film_id}>{film.film_details[0].title}</div>))}
            </div>
            <h2>Characters</h2>
            <div>
                {characters.map((character) => (<div key={character.id}>{character.name}</div>))}
            </div>
        </>
    );
}
