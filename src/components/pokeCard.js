import { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    display: 'inline-block'
}

export default function pokeCard({ url }) {
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        GetPokeData()
    }, [])

    async function GetPokeData() {
        const response = await axios.get(url).catch(error => console.log(error))
        const result = response.data
        setPokemon(result)
    }

    return (
        <div style={style}>
            {pokemon && (<div>
                <h1> {pokemon && pokemon.name && (`${pokemon.name.replace('-', ' ')} #${pokemon.id}`)}</h1>
                {(pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other['official-artwork'].front_default)
                    ? (<img src={pokemon.sprites.other['official-artwork'].front_default} width='50%' />)
                    : (<img src='' />)}
            </div>)}
        </div>
    )
}