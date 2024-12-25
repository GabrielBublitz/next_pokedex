import { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    display: 'inline-block',
    width: '200px',
    fontSize: '12px'
}

export default function PokeCard({ url }) {
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        GetPokeData()
    }, [])

    async function GetPokeData() {
        const response = await axios.get(url.replace('pokemon-species', 'pokemon')).catch(error => console.log(error))
        const result = response.data
        setPokemon(result)
    }

    return (
        <div style={style}>
            {pokemon && (<div>
                <h1 style={{textAlign: 'center', fontSize: '1.3em'}}>{pokemon && pokemon.name && (`${(pokemon.name).charAt(0).toUpperCase() + pokemon.name.replace('-', ' ').slice(1)} #${pokemon.id}`)}</h1>
                {(pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other['official-artwork'].front_default)
                    ? (<img src={pokemon.sprites.other['official-artwork'].front_default} width='100%' />)
                    : (<img src='' />)}
            </div>)}
        </div>
    )
}