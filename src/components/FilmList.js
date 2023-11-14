import React, {useState, useEffect} from "react";
import APIService from "./APIService";
import './FilmList.css'



function FilmList(props) {

    
    const[director2, setDirector2] = useState('')
    const[director2Genre, setDirector2Genre] = useState('')
    const[director3, setDirector3] = useState('')
    const[director3Genre, setDirector3Genre] = useState('')
    const[director4, setDirector4] = useState('')
    const[director4Genre, setDirector4Genre] = useState('')

    useEffect(() => {
        setDirector2('')
        setDirector2Genre('')
        setDirector3('')
        setDirector3Genre('')
        setDirector4('')
        setDirector4Genre('')
    }, [props.film])

    const editFilm = (film) => {
        props.editFilm(film)
        
      }

    const deleteFilm = (film) => {
        APIService.DeleteFilm(film.id)
        .then(() => props.deleteFilm(film))
    }

    
    //revisar form.js
    function hasMoreDirectors(film){
        if (film.director4 !=='') {
            return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre}), {film.director4}, ({film.director4Genre})</span>;
        } else if (film.director3 !=='') {
            return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre})</span>;
        } else if (film.director2 !=='') {
            return <span>, {film.director2}, ({film.director2Genre})</span>;
        } 
    }

    function cierraFilmsList() {
        props.cierraFilmsList()
    }

    

    return (
        <div className="films-list">

            

            {props.films && props.films.map(film => {
                
                

                return (
                    
                    
                    <div key={film.id} className='film'>
                        <div className='filmInfo'>
                            <h3>cc# {film.ccNumber}, id# {film.id}</h3>
                            
                        </div>
                        <div className='filmPoster'><img src={film.imgUrl}></img></div>
                        <div className='filmInfo'>
                            <h2>{film.title}</h2>   
                            <p>dirigida por {film.director1}, ({film.director1Genre}) {hasMoreDirectors(film)} </p>
                            
                            

                            <p>{film.year}</p>
                            <p>puntaje final: {film.score}</p>
                            <p>invitó {film.host}</p>
                            <p>{film.date}</p></div>
                        <div className='botoneria'>
                            <div className="col">
                                <button className='btn btn-primary'
                                    onClick={() => editFilm(film)}>editar</button>
                            </div>
                            <div className="col">
                                <button className='btn btn-danger'
                                onClick={() => deleteFilm(film)}
                                >eliminar</button>
                            </div>
                        </div>
                    </div>

                );
            })}
        <div className="all-films-list">
            <h5
            onClick={cierraFilmsList}
            >Cerrar todas las fichas</h5>
            </div>
        </div>
    
    )
}



export default FilmList