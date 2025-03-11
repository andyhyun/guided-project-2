import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters`);
            const json_data = await data.json();
            console.log(json_data);
            setCharacters(json_data);
        };
        fetchData();
    }, []);

    return (
        <>
            {
                characters.map((character) => (<Link key={character.id} to={`/character/${character.id}`}>{character.name}</Link>))
            }
        </>
    );
};