import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import '../app/globals.css';

export default function TypeChart() {
    const [currentGen, setCurrentGen] = useState('1');

    const changeGen = (gen) => {
        setCurrentGen(gen);
    }

    return <>
        <Head>
            <title>Type chart</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" async></script>
        </Head>
        <section style={{ display: "flex", justifyContent: 'center', padding: '30px 30px'}}>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentGen ? 'Gen ' + currentGen : 'Generations'}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" type="button" onClick={() => changeGen('1')}>Gen 1</button>
                        <button className="dropdown-item" type="button" onClick={() => changeGen('2-5')}>Gen 2-5</button>
                        <button className="dropdown-item" type="button" onClick={() => changeGen('6~')}>Gen 6~</button>
                    </li>
                </ul>
            </div>
        </section>
        <section style={{ display: "flex", justifyContent: 'center', padding: '30px 30px', height: '50%' }}>
            {currentGen === '1' && <Image src={'/typechart-gen1.png'} alt='Gen 1' width={840} height={840} />}
            {currentGen === '2-5' && <Image src={'/typechart-gen2345.png'} alt='Gen 2-5' width={840} height={840} />}
            {currentGen === '6~' && <Image src={'/typechart.png'} alt='Gen 6~' width={840} height={840} />}
        </section>
    </>
}