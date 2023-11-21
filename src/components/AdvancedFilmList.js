import React, {useState, useEffect, useRef} from "react";
import APIService from "./APIService";
import './FilmList.css'



function AdvancedFilmList(props) {


    const [field, setField] = useState(null)
    const [contains, setContains] = useState(null)
    const [films, setFilms] = useState([])
    const DOMRef = useRef(null)

    const focusList = () => {
        setTimeout(() => {
        DOMRef.current.scrollIntoView()
        }
        ,100)      
      } 

    
      useEffect(() => {
        

        fetch(`http://127.0.0.1:5000/adv-get/${props.field}/${props.contains}`, {
            'method':'GET',
            headers: {
            'Content-Type':'application/json'
            }
        })
        
       
        .then(resp => resp.json())
        .then(resp => setFilms(resp))
        .then(focusList())
        // .then(document.getElementById("TopOfAdvFilmList").scrollIntoView(true))
        .catch(error => console.log(error))
        
    }, [])

    

/*     const editFilm = (film) => {
        props.editFilm(film)
        
      } */

/*     const deleteFilm = (film) => {
        APIService.DeleteFilm(film.id)
        .then(() => props.deleteFilm())
    } */

    
    function cierraAdvancedFilmsList() {
        props.cierraAdvancedFilmsList()
    }


    return (

        <div className="all-films-list">
            
            <h5>búsqueda avanzada</h5>

        <div className="films-list"
         ref={DOMRef}>
 
        <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedFilmsList}
            >Descartar búsqueda</button>
            </div>

            {films && films.map(film => {
                
                //revisar form.js
                function hasMoreDirectors() {
                    if (film.director4 !=='') {
                        return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre}), {film.director4}, ({film.director4Genre})</span>;
                    } else if (film.director3 !=='') {
                        return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre})</span>;
                    } else if (film.director2 !=='') {
                        return <span>, {film.director2}, ({film.director2Genre})</span>;
                    } 
                }

                return (
                    
                    
                    <div key={film.id} className='film'>
                        <div className='filmInfo'>
                            <h3>cc# {film.ccNumber}, id# {film.id}</h3>
                            
                        </div>
                        <div className='filmPoster'><img src={film.imgUrl}></img></div>
                        <div className='filmInfo'>
                            <h2>{film.title}</h2>   
                            <p>dirigida por {film.director1}, ({film.director1Genre}) {hasMoreDirectors()} </p>
                            
                            

                            <p>{film.year}</p>
                            <p>puntaje final: {film.score}</p>
                            <p>invitó {film.host}</p>
                            <p>{film.date}</p></div>
                        <div className='botoneria'>
                            <div className="col">
                                <button className='btn btn-primary'
                                    // onClick={() => editFilm(film)}
                                    >editar</button>
                            </div>
                            <div className="col">
                                <button className='btn btn-danger'
                                // onClick={() => deleteFilm(film)}
                                >eliminar</button>
                            </div>
                        </div>
                    </div>

                );
            })}
            <div className="all-films-list" id="TopOfAdvFilmList">
            <button className="btn btn-danger"
            onClick={cierraAdvancedFilmsList}
            >Descartar búsqueda</button>
            </div>
            
        </div>
        
        </div>
    
            
    )
    
}



export default AdvancedFilmList