import { useState, useEffect } from 'react'
import axios from "axios"
import Head from 'next/head'
import PokeCard from '@/components/pokeCard'
import { Poppins } from 'next/font/google'
import { debounce } from 'lodash'
import SearchBar from '@/components/searchBar'
import '../app/globals.css';

const poppins = Poppins({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function Pokedex() {
    const limit = 24;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [offset, setOffset] = useState(0);
    const [pokemonName, setPokemonName] = useState('');
    const [currentGen, setCurrentGen] = useState(null);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if(!currentGen)
            fetchData()
    }, [offset])

    useEffect(() => {
        setPokemons([])
        setOffset(0)
        fetchData()
    }, [currentGen])

    const handleScroll = debounce(() => {
        if ((window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) && prevOffset < 1025) {

            if((prevOffset + limit) > 1025){
                prevOffset =+ limit;
                prevOffset =- (1025 - prevOffset);
                
                setOffset((prevOffset) => prevOffset + limit);
                return;
            }

            setOffset((prevOffset) => prevOffset + limit);
        }
    }, 200)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            if(currentGen){
                setPokemons([]);

                const response = await axios.get(`https://pokeapi.co/api/v2/generation/${currentGen}/`);
                const data = await response.data;

                data.pokemon_species.sort((a, b) => {
                    const idA = parseInt(a.url.split('/').filter(Boolean).pop(), 10);
                    const idB = parseInt(b.url.split('/').filter(Boolean).pop(), 10);

                    return idA - idB;
                });

                setPokemons(data.pokemon_species);
            }else{
                console.log(offset);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const data = await response.data;

                setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
            }

            setIsLoading(false);
        } catch (error) {
            console.log('Erro fetching data: ', error);

            setIsLoading(false)
        }
    }

    const handleSearch = (name, gen) => {
        setPokemonName(name);
        setCurrentGen(gen)
    };

    return (
        <div className={poppins.className}>
            <Head>
                <title>Pokédex</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" async></script>
            </Head>
            <section style={{ display: 'flex', justifyContent:'center', padding: '30px 0px' }}>
                <SearchBar onSearch={handleSearch} />
            </section>
            <section style={{ display: "flex", justifyContent: 'center', padding: '30px 30px', height: '50%' }}>
                <div style={{ display: "flex", width: '65%', gap: '16px 24px',background: '#3c4a5b', borderRadius: '1rem', padding: '20px 0px', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {pokemons.length > 0 ? (pokemons.map((pokemon, index) => {
                        return (
                            <PokeCard key={index} url={pokemon.url} />
                        )
                    })) : (<div>No data</div>)}
                    {isLoading && <p>Loading...</p>}
                </div>
            </section>
        </div>
    )
}