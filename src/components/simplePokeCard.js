import { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    // justifyContent: 'center',
    backgroundColor: '#313d4c',
    borderRadius: '20px'
}

export default function PokeCard({ url }) {
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        GetPokeData()
    }, [])

    async function GetPokeData() {
        url = 'https://pokeapi.co/api/v2/pokemon/9/';
        if (url) {
            const response = await axios.get(url.replace('pokemon-species', 'pokemon')).catch(error => console.log(error))
            const result = response.data
            setPokemon(result)
        }
    }

    return (
        <div style={style}>
            {pokemon && (
                <div>
                    {(pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other['official-artwork'].front_default)
                        ? (<button style={{ background: 'transparent', border: 'none', cursor: 'pointer', width:'fit-content'}}>
                            <img src={pokemon.sprites.other['official-artwork'].front_default} loading='lazy' width='20%' height='20%' />
                        </button>)
                        : (<button><img src='' /></button>)}
                </div>
            )}
        </div>
    )
}