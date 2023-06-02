import useOnScreen from '@/components/useOnScreen'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

const style = {
    display: 'inline-block'
}

export default function pokeCard({ url }) {
    const cardRef = useRef()
    const cardRefValue = useOnScreen(cardRef)
    const [isCardRef, setCardRef] = useState(false)
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        GetPokeData()
        
        if (!isCardRef) {
            setCardRef(cardRefValue)
        }
    }, [cardRefValue])

    async function GetPokeData() {
        const response = await axios.get(url).catch(error => console.log(error))
        const result = response.data
        setPokemon(result)
    }

    return (
        <div style={style} ref={cardRef}>
            {isCardRef && pokemon &&(<div>
                <h1> {pokemon && pokemon.name &&(`${pokemon.name.replace('-', ' ')} #${pokemon.id}`)}</h1>
                {(pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other['official-artwork'].front_default)
                 ? (<img src={pokemon.sprites.other['official-artwork'].front_default} width='50%'/>)
                  : (<img src=''/>)}
            </div>)}
        </div>
    )
}