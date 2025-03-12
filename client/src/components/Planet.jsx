import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Planet = () => {
    
    const [planet, setPlanet] = useState({});
    const [characters, setCharacters] = useState({});
    const [films, setFilms] = useState([]);
    let params = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            const planet_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${params.id}`);
            const json_planet_data = await planet_data.json();
            const films_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${params.id}/films`);
            const json_films_data = await films_data.json();
            const characters_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${params.id}/characters`);
            const json_characters_data = await characters_data.json();
            
            setPlanet(json_planet_data);
            setFilms(json_films_data);
            setCharacters(json_characters_data);
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>{planet.name}</h1>
            <h2>Films</h2>
            <div>
                {films.map((film) => (<div key={film.film_id}>{film.film_details[0].title}</div>))}
            </div>
            <h2>Characters</h2>
            <div>{planet.name}</div>
        </>
    );
}
