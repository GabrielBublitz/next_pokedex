import { useState, useEffect } from 'react'
import axios from "axios"

export default () => {

    const [pokeName, setPokeName] = useState('ditto')
    const [poke, setPoke] = useState()

    useEffect(() => {
        GetPoke()
    }, [])

    function GetPoke() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
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

    function CallApi(){
        GetPoke(pokeName)
    }

    return <>
        <div>
            <input type='text' onChange={(e) => setPokeName(e.target.value.toLowerCase())}/>
            <button onClick={CallApi}>Search</button>
            <h1>
                {poke ? (`${poke.name}`) : (`No data`)}
            </h1>
            <img src={poke ? (poke.sprites.other['official-artwork'].front_default) : ''} />
        </div>
    </>
}