import '../app/globals.css';
import SimplePokeCard from '../components/simplePokeCard';

export default function TeamBuilder() {
    return (
        <div>
            <div style={{display: 'grid', justifyContent: 'center', margin: '1rem 0'}}>
                <SimplePokeCard />
            </div>
        </div>
    )
}