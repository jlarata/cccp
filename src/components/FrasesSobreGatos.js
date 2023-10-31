import './FrasesSobreGatos.css';
import Button from 'react-bootstrap/Button';

const API_URL = 'https://meowfacts.herokuapp.com/'


export function FrasesSobreGatos(){

    function handleClick(){

        console.log('exito')
    }


    return (
        
        
        <div className="cajita">
            
            <Button onClick={handleClick} variant="secondary" type="submit">generar frase sobre gato</Button>


        </div>
        

    )

}

