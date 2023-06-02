import { useState, useEffect} from 'react'
import axios from "axios"
import Head from 'next/head'
import PokeCard from '@/components/pokeCard'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default () => {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        GetPokeList()
    }, [])

    async function GetPokeList() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
        const data = await response.data
        setPokemons(data.results)
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
        </div>
    )
}