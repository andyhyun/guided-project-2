import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export const Character = () => {
    const [character, setCharacter] = useState({});
    const [films, setFilms] = useState([])
    let params = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            const character_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}`);
            const json_character_data = await character_data.json();
            setCharacter(json_character_data);
            // const character_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}`);
            // const json_data = await character_data.json();
            // setCharacter(json_character_data);
            const films_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}/films`);
            const json_films_data = await films_data.json();
            setFilms(json_films_data);
            console.log(json_films_data);
        };
        fetchData();
    }, []);

    return (
        <>
            <div>{character.name}</div>
            <div>
                {films.map((film) => (<div key={film.id}>{film.title}</div>))}
            </div>
        </>
    );
};