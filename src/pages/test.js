import { useState, useEffect } from 'react'
import axios from "axios"
import Head from 'next/head'
import PokeCard from '@/components/pokeCard'
import { Poppins } from 'next/font/google'
import { debounce } from 'lodash'

const poppins = Poppins({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default () => {
    const limit = 12;
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        fetchData()
    }, [offset])

    const handleScroll = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setOffset((prevOffset) => prevOffset + limit);
        }
    }, 200)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            const data = await response.data
            setPokemons((prevPokemons) => [...prevPokemons, ...data.results])
            setIsLoading(false)
        } catch (error) {
            console.log('Erro fetching data: ', error)
            setIsLoading(false)
        }
    }

    return (
        <div className={poppins.className}>
            <Head>
                <title>Pokédex</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {pokemons.length > 0 ? (pokemons.map((pokemon, index) => {
                return (
                    <PokeCard key={index} url={pokemon.url} />
                )
            })) : (<div>No data</div>)}
            {isLoading && <p>Loading...</p>}
        </div>
    )
}