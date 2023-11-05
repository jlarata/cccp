import React from "react";
import APIService from "./APIService";
import './FilmList.css'

function FilmList(props) {

    const editFilm = (film) => {
        props.editFilm(film)
        
      }

      const deleteFilm = (film) => {
        APIService.DeleteFilm(film.id)
        .then(() => props.deleteFilm())
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
                            <p>dirigida por {film.director}</p>
                            <p>{film.year}</p>
                            <p>puntaje final: {film.score}</p>
                            <p>invitó {film.host}</p>
                            <p>{film.date}</p></div>
                        <div className='botoneria'>
                            <div className="col-md-1">
                                <button className='btn btn-primary'
                                    onClick={() => editFilm(film)}>editar</button>
                            </div>
                            <div className="col-md-1">
                                <button className='btn btn-danger'
                                onClick={() => deleteFilm(film)}
                                >eliminar</button>
                            </div>
                        </div>
                    </div>

                );
            })}
        </div>
    )
}

export default FilmList