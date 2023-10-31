import './Films.css';
import { Film } from './Film';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


export function Films(){

    
    const allFilms = [
        {
        ccNumber: '066',
        imgUrl: 'https://a.ltrbxd.com/resized/sm/upload/ct/sk/hw/s3/f8HomPJlyPGIWgBODNbWQrRgjxW-0-500-0-750-crop.jpg?v=6aa2690b2e',
        title: 'The Brown Bunny',
        year: '2003',
        director: 'Vincent Gallo',
        score: '8,50',
        origin: 'EE.UU.',
        ccMember: 'J',
        ccDate: '2015/09/25',
        },
        {
        ccNumber: '067',
        imgUrl: 'https://a.ltrbxd.com/resized/sm/upload/pp/ya/j6/9k/kH7Jwo3Pv0pbosU4rzDafTigIZx-0-500-0-750-crop.jpg?v=5acfbde8a0',
        title: 'Swiss Army Man',
        year: '2016',
        director: 'Daniel Scheinert, Daniel Kwan',
        score: '1',
        origin: 'EE.UU.',
        ccMember: 'Lucía',
        ccDate: '2015/07/10',
        }
    ]


    const [allFilmsState, setAllFilmsState] = useState(allFilms)

    const [titleState, setTitleState] = useState()
    const [yearState, setYearState] = useState()
    const [originState, setOriginState] = useState()


    function handleSubmit(e){
        e.preventDefault();
    
        const allFilmsClone = [...allFilmsState]
 
        allFilmsClone.push({
            title: titleState,
            year: yearState,
            origin: originState,
        })

        setAllFilmsState(allFilmsClone)
    
    }

    



    return (
    <>

    

        <div className='nuevaFicha'>
        <h3>Nueva ficha</h3>
        <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Título</label>
        <input onChange={(e)=>setTitleState(e.target.value)} name="title"></input>
        <label htmlFor='year'>Año</label>
        <input onChange={(e)=>setYearState(e.target.value)} name="year"></input>
        <label htmlFor='origin'>Origen</label>
        <input onChange={(e)=>setOriginState(e.target.value)} name="origin"></input>
        
        <Button variant="success" type="submit">agregar ficha</Button>
       
        </form>
    </div>

    <div className="films-list">
        {allFilmsState.map((film) => {
        return <Film film={film}></Film>
        })}
    </div>

    


    </>
    )

}