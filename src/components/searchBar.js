import { Poppins } from 'next/font/google'
import { useState } from 'react'

const poppins = Poppins({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentGen, setCurrentGen] = useState('');
    const generations = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const style =
    {
        marginRight: '.5rem',
        appearance: 'none',
        border: '1px solid #ced4da',
        borderRadius: '.25rem',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.5',
        padding: '.375rem .75rem',
        backgroundColor: '#fff',
        color: '#212529'
    }

    const Search = () => {
        if (searchTerm.trim() || currentGen) {
            onSearch(searchTerm.trim(), currentGen);
        } else {
            alert('Please enter a Pokémon name!');
        }
    }

    const changeGen = (gen) => {
        setCurrentGen(gen);
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '.5rem'}}>
            <div className={poppins.className} style={{ display: "flex"}}>
                <input style={style} type="search" placeholder="Ditto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} aria-label="Search" />
                <button className='btn btn-success' onClick={Search}>Search</button>
            </div>
            <div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {currentGen ? 'Gen ' + currentGen : 'Generations'}
                    </button>
                    <ul className="dropdown-menu">
                        {generations.map((gen, index) => {
                            if(index == 0){
                                return (
                                    <li key={index}>
                                        <button className="dropdown-item" type="button" onClick={() => changeGen(null)}>All</button>
                                    </li>
                                )                                
                            }

                            return (
                                <li key={index}>
                                    <button className="dropdown-item" type="button" onClick={() => changeGen(gen)}>Gen {gen}</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>)
}