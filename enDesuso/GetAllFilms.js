import './GetAllFilms.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

/* export function GetAllFilms(){
    
    const [films, setFilms] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1/get')

    },[])

} */

 const CCAPI_URL = 'http://127.0.0.1:5000/get'


export function GetAllFilms(){

        const [filmState, setFilmState] = useState([''])
    
        async function handleClick(){
    
            const response = await fetch(CCAPI_URL)
            if(response.ok){
                const data = await response.json()
    
                setFilmState(data[0])
            }
        }


    return (
        <div className="cajita">
        <Button onClick={handleClick} variant="success" type="submit">ver json de films</Button>
        
             <p>{filmState.ccNumber}</p>
             <p>{filmState.imgUrl}</p>
             <p>{filmState.director}</p>
             <p>{filmState.title}</p>
             <p>{filmState.year}</p>
             <p>{filmState.director}</p>
             <p>{filmState.score}</p>
             <p>{filmState.host}</p>
             <p>{filmState.date}</p>
        </div> 
            ) } 
            
    

