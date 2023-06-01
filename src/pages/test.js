import { useState, useEffect } from 'react'
import axios from "axios"
import Head from 'next/head'

export default () => {
    const baseUrl = 'https://pokeapi.co/api/v2/'

    const [poke, setPoke] = useState()
    const [pokeName, setPokeName] = useState('ditto')
    const [pokemons, setPokemons] = useState([])

    const style = {
        display: 'inline-block'
    }

    useEffect(() => {
        test()
        GetPoke()
    }, [])

    async function test() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=16&offset=0')
        const data = await response.data

        var pokes = []

        for (const item of data.results) {
            const response = await axios.get(item.url);
            const result = response.data;
            pokes.push(result);
        }

        setPokemons(pokes)
    }

    function GetPoke() {
        axios.get(`${baseUrl}pokemon/${pokeName}`)
            .then((response) => {
                return response.data
            })
            .then((result) => {
                setPoke(result)
            })
            .catch((error) => {
                console.log(`Falha: ${error}`)
            })
    }

    function CallApi() {
        GetPoke()
    }

    return (
        <div>
            <Head>
                <title>Pokédex</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <input type='text' onChange={(e) => setPokeName(e.target.value.toLowerCase().trim().replace(' ', '-'))} />
            <button onClick={CallApi}>Search</button>

            {pokemons.length > 0 ? (pokemons.map((pokemon, index) => {
                return (
                    <div style={style} key={pokemon.id}>
                        <h1>
                            {pokemon ? (`${pokemon.name} #${pokemon.id}`) : (`No data`)}
                        </h1>
                        <img src={pokemon ? (pokemon.sprites.other['official-artwork'].front_default) : ''} />
                    </div>)
            })) : (<div>No data</div>)}
        </div>
    )
}