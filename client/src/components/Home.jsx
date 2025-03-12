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
        <section id="charactersList">
            {
                characters.map((character) => <div key={character.id}><Link to={`/character/${character.id}`}>{character.name}</Link></div>)
            }
        </section>
    );
};