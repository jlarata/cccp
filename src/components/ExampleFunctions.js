//import './GetAllFilms.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './ExampleFunctions.css';

export function Examplefunctions(){
    
    const [films, setFilms] = useState([])
    const[editedFilm, setEditedFilm] = useState(null)
    
    useEffect(() => {
        fetch('http://127.0.0.1:5000/get', {
            'method':'GET',
            headers: {
            'Content-Type':'applications/json'
            }
        })

        .then(resp => resp.json())
        .then(resp => setFilms(resp))
        .catch(error => console.log(error))
    }, [])

    

    return(
        <><div className='films-list'>

            
        </div>
        </>

    )

}