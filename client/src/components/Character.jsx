import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export const Character = () => {
    const [character, setCharacter] = useState({});
    const [planet, setPlanet] = useState('');
    const [films, setFilms] = useState([]);
    let params = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            const character_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}`);
            const json_character_data = await character_data.json();
            const films_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}/films`);
            const json_films_data = await films_data.json();
            const planet_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${json_character_data.homeworld}`);
            const json_planet_data = await planet_data.json();
            setCharacter(json_character_data);
            setPlanet(json_planet_data);
            setFilms(json_films_data);
            console.log(json_planet_data);
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>{character.name}</h1>
            <h2>Films</h2>
            <div>
                {films.map((film) => (<div key={film.film_id}>{film.film_details[0].title}</div>))}
            </div>
            <h2>Homeworld</h2>
            <div>{planet.name}</div>
        </>
    );
};