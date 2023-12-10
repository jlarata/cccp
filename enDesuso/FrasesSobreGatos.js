import './FrasesSobreGatos.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


const CatAPI_URL = 'https://meowfacts.herokuapp.com/'


export function FrasesSobreGatos(){

    const [phraseState, setPhraseState] = useState('')

    async function handleClick(){

        const response = await fetch(CatAPI_URL)
        if(response.ok){
            const data = await response.json()

            setPhraseState(data.data[0])
        }
    }

    return (
        
    <div className="cajita">
        <Button onClick={handleClick} variant="dark" type="submit">generar frase sobre gato</Button>
        <p>{phraseState}</p>
    </div>
    )
}



