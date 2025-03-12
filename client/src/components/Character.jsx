import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export const Character = () => {
    const [character, setCharacter] = useState({});
    const [planet, setPlanet] = useState({});
    const [films, setFilms] = useState([]);
    let params = useParams();
    
    useEffect(() => {
        const fetchCharacter = async () => {
            const character_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}`);
            const json_character_data = await character_data.json();
            setCharacter(json_character_data);
        };
        fetchCharacter();
    }, []);
    
    useEffect(() => {
        const fetchFilms = async () => {
            const films_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/characters/${params.id}/films`);
            const json_films_data = await films_data.json();
            setFilms(json_films_data);
        };
        fetchFilms();
    }, []);
    
    useEffect(() => {
        const fetchPlanet = async () => {
            const planet_data = await fetch(`${import.meta.env.VITE_SWAPI_URL}/planets/${character?.homeworld}`);
            const json_planet_data = await planet_data.json();
            setPlanet(json_planet_data);
        };
        fetchPlanet();
    }, [character]);

    return (
        <main>
            <h1 id="name">{character?.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height">{character?.height} cm</span></p>
                <p>Mass: <span id="mass">{character?.mass} kg</span></p>
                <p>Born: <span id="height">{character?.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p><span id="homeworld">{planet?.name}</span></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {films.map((film) => (<li key={film.film_id}>{film.film_details[0].title}</li>))}
                </ul>
            </section>
        </main>
    );
};