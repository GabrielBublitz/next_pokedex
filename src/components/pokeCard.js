import { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    display: 'inline-block',
    width: '175px',
    fontSize: '11px'
}

export default function PokeCard({ url }) {
    const [pokemon, setPokemon] = useState([])
    const [isLoading, setIsLoading] = useState([])

    useEffect(() => {
        GetPokeData()
    }, [])

    async function GetPokeData() {
        setIsLoading(true);
        try{
            const response = await axios.get(url.replace('pokemon-species', 'pokemon')).catch(error => console.log(error));
            const result = response.data;
            setPokemon(result);

            setIsLoading(false);
        }catch (ex){
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div style={style}>
                {pokemon && (<div>
                    {(pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other['official-artwork'].front_default)
                        ? (<img src={pokemon.sprites.other['official-artwork'].front_default} alt='' width='100%' />)
                        : (<img src='/lazy_loading_image.png' />)}
                </div>)}
            </div>
            <h1 style={{ textAlign: 'center', fontSize: '1.3em' }}>
                {pokemon && pokemon.name && (`${(pokemon.name).charAt(0).toUpperCase() + pokemon.name.replace('-', ' ').slice(1)} #${pokemon.id}`)}
            </h1>
        </div>
    )
}