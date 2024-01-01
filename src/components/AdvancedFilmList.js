import React, {useState, useEffect, useRef} from "react";
import APIService from "./APIService";
import './FilmList.css'


function AdvancedFilmList(props) {


    //const [field, setField] = useState(null)
    //const [contains, setContains] = useState(null)
    const [films, setFilms] = useState([])
    const DOMRef = useRef(null)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteKey, setDeleteKey] = useState('')
    const [filmToDelete, setFilmToDelete] = useState('')
    const [sortState, setSortState] = useState('none');

    const { REACT_APP_APIURL } = process.env;

    const fetchData = async () => {
        const data = await fetch(`${REACT_APP_APIURL}/adv-get/${props.field}/${props.contains}`, {
            'method':'GET',
            headers: {
            'Content-Type':'application/json'
            }
        })
        if(data.ok) {
          const dataJson = await data.json();
          setFilms(dataJson);
          console.log('ok');}
        else {
          console.log('not ok')
        }
      }


      useEffect(() => {   
          fetchData() 
          focusList()
    }, [])


    const focusList = () => {
        setTimeout(() => {
        DOMRef.current.scrollIntoView({ block: "start", behavior: "smooth" })
        }
        ,1000)      
      } 


    const editFilm = (film) => {
        props.editFilm(film)
        cierraAdvancedFilmsList()
        
      }

/*     const deleteFilm = (film) => {
        APIService.DeleteFilm(film.id)
        .then(() => props.deleteFilm())
    } */

    const confirmarEliminar = (film) => {
        setFilmToDelete(film.id)
        setDeleteConfirm(true)
        
    };

    
    const deleteFilm = (filmToDelete, deleteKey) => {
        APIService.DeleteFilm(filmToDelete, deleteKey)
        .then((resp) => {
            if (resp) {
            alert('ficha eliminada con eeexito')
            deleteFilmFromList(filmToDelete)
            //cierraAdvancedFilmsList()
            } else { alert('no, cualquiera') }
        })
        .catch(error => console.log(error))
        setDeleteConfirm(false)
    }

    const deleteFilmFromList = (filmToDelete) => {
        const new_films = films.filter(myfilm => {
          if(myfilm.id === filmToDelete) {
            return false;
          }
          return true
        })
        setFilms(new_films)
      } 


    function cierraAdvancedFilmsList() {
        props.cierraAdvancedFilmsList()
    }

    
    const sortMethods = {
        none: { method: (a, b) => null },
        scoreAscending: { method : (a, b) => (a.score > b.score ? 1 : -1) },
        scoreDescending: { method : (a, b) => (a.score > b.score ? -1 : 1)},
        yearAscending: { method : (a, b) => (a.year > b.year ? 1 : -1) },
        yearDescending: { method : (a, b) => (a.year > b.year ? -1 : 1)},
        originDescending: { method : (a, b) => (a.origin.toLowerCase() > b.origin.toLowerCase() ? 1 : (a.origin.toLowerCase() < b.origin.toLowerCase() ? -1 : 0))}
    }

    const sortByMethod = (method) => {
        setSortState(method)
        // blabla(sortState)
    } 
    

    /* const blabla = (sortState) => {
        films.sort(sortMethods[sortState].method)
    } */
/* 
    const hasMultipleDirectors = (film) => {
        if (film.director4 !=='') {
            setCantidadDeDirectores('4')
        } else if (film.director3 !=='') {
            setCantidadDeDirectores('3')
        } else if (film.director2 !=='') {
            setCantidadDeDirectores('2')
        }
    } */
    
    const promedioAnio = () => {
        let promedioYear = 0

        {films.map(film => { 
            return(
                promedioYear = promedioYear+film.year
            )
        })}
        return (
            <p>promedio anual: {promedioYear/films.length}</p>
        )
    }



    console.log('parala lakaaa')

    return (

        
        <div className="all-films-list">
            
            {/* <h5>búsqueda avanzada</h5> */}

        <div className="films-list">
        
        <div className="infoBusqueda" ref={DOMRef}>
            <p>se buscaron films que en el campo {props.field} contengan total o parcialmente el valor {props.contains}</p>
            <p>se encontraron {films.length} resultados, ordenados por #CC</p>

        <select defaultValue={'none'} onChange={(e) => sortByMethod(e.target.value)}>
            <option value="none" disabled>ordenar por</option>
            <option value="yearAscending">Año más bajo</option>
            <option value="yearDescending">Año más alto</option>
            <option value="scoreAscending">Puntaje más bajo</option>
            <option value="scoreDescending">Puntaje más alto</option>
            <option value="originDescending">Origen</option>
      </select>
      {promedioAnio()}
        </div>
 
        <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedFilmsList}
            >Descartar búsqueda</button>
            </div>

            

            {films.sort(sortMethods[sortState].method) && films.map(film => {

            // hasMultipleDirectors(film)
                
                //revisar form.js
                 function hasMoreDirectors() {
                        if (film.director4 !=='') {
                            return <span>, {film.director2}({film.director2Genre}), {film.director3}({film.director3Genre}), {film.director4}({film.director4Genre})</span>;
                        } else if (film.director3 !=='') {
                            return <span>, {film.director2}({film.director2Genre}), {film.director3}({film.director3Genre})</span>;
                        } else if (film.director2 !=='') {
                            return <span>, {film.director2}({film.director2Genre})</span>;
                        } 
                    } 
               
                return (
                    
                    <div key={film.id} className='film'>
                        <div className='filmInfo'>
                            
                            <h3>cc# {film.ccNumber}
                            {/* , id# {film.id} */}
                            </h3>
                            
                        </div>
                        {film.imgUrl === '' ? <div className='noPoster'>asdasdasdasd</div> : <div className='filmPoster'><img src={film.imgUrl} alt="no hay poster"></img></div>}
                        
                        <div className='filmInfo'>
                            <h2>{film.title}</h2>
                            <p>{film.director1} ({film.director1Genre}) {hasMoreDirectors()} | ({film.year}) 
                            {/* {(cantidadDeDirectores > 1) ? <span>, {film.director2}, ({film.director2Genre}) </span> : null }
                            {(cantidadDeDirectores > 2) ? <span>, {film.director3}, ({film.director3Genre}) </span> : null }
                            {(cantidadDeDirectores > 3) ? <span>, {film.director4}, ({film.director4Genre}) </span> : null } */}
                            </p>
                            <p>{film.origin}</p>
                            <p>puntaje final: {film.score}</p>
                            <p>invitó {film.host}</p>
                            <p>{film.date}</p></div>
                        <div className='botoneria'>
                            <div className="col">
                                <button className='btn btn-primary'
                                    onClick={() => editFilm(film)}
                                    >editar</button>
                            </div>
                            <div className="col">
                                <button className='btn btn-danger'
                                onClick={() => confirmarEliminar(film)}
                                // onClick={() => deleteFilm(film)}
                                >eliminar</button>
                            </div>
                            

                            {/* {deleteConfirm ?
                             <span>
                                <label htmlFor='confirmar' className="form-label">¿qué vehículo participa en el cc?</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => setDeleteKey(e.target.value)}>
                                <div className="col">
                                <button className='btn btn-danger'
                                onClick={() => deleteFilm(film)}
                                >eliminar</button>
                            </div>
                                </input>
                            </span> : null } */}
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
        
        {deleteConfirm ? <div className="confirmBox">
                                <label htmlFor='confirmar' className="form-label">¿qué vehículo participa en el cc?</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => setDeleteKey(e.target.value)}>
                                </input>
                                <button className='btn btn-outline-danger'
                                onClick={() => deleteFilm(filmToDelete, deleteKey)}
                                >confirmar eliminar</button>
                                
                        </div> :null }

        </div>
    
            
    )
    
}



export default AdvancedFilmList