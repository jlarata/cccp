import React, {useState, useEffect, useRef} from "react";
import APIService from "./APIService";
import './FilmList.css'
import Loading from "./Loading";
import httpClient from "../httpClient";
import { SortBy } from "react-lodash";


function AdvancedFilmList(props) {


    //const [field, setField] = useState(null)
    //const [contains, setContains] = useState(null)
    const [edited, SetEdited] = useState(false)
    const [films, setFilms] = useState([])
    const DOMRef = useRef(null)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteKey, setDeleteKey] = useState('')
    const [filmToDelete, setFilmToDelete] = useState('')
    const [sortState, setSortState] = useState('none');
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState()


    const { REACT_APP_APIURL } = process.env;


    useEffect(() => {   
        fetchData() 
        
  }, [props.edited])

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
          setLoading(false);
          console.log('ok polilla');}
        else {
          console.log('not ok')
        }

        try {
                const resp = await httpClient.get(`${REACT_APP_APIURL}/@me`);
                setUser(resp.data);
            }
        catch (error)
            {
            console.log("Not authenticated nop");
            }
      }


      


    const focusList = () => {
        setTimeout(() => {
        DOMRef.current.scrollIntoView({ block: "start", behavior: "smooth" })
        }
        ,10)      
      } 


    const editFilm = (film) => {
        props.editFilm(film)
        // cierraAdvancedFilmsList()
        
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
    } 
    
/*INFO UTIL PARA LAS STATS: promedio año, promedio nota, lista ordenada de origenes (por consola), etc*/
    
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
    
    /* const promedioAnio = () => {
        let promedioYear = 0
        let promedioNota = 0
        let unos = 0
        let years = []

        {films.map(film => { 
            
            years.push(film.year)
            if(film.score !== 1)
            {
            return(
                promedioYear = promedioYear+film.year,
                promedioNota = promedioNota + film.score
            )} else {
                return(
                    promedioYear = promedioYear+film.year,
                    unos = unos +1
                )
            }
        })}

        
        const yearsAmount = {};
        years.forEach(function (x) {
            yearsAmount[x] = (yearsAmount[x] || 0) + 1;
        });
        
        console.log("el siguiente es un objeto, en el que cada año fue transformado en propiedad que se corresponde a un valor numérico ")
        console.log(yearsAmount)

        return ( 
            <div>
                <p> fueron eliminadas de la cuenta {unos} películas por no haber subido nota</p>
            <p>promedio año: {promedioYear/films.length}</p>
            <p>promedio nota: {promedioNota/(films.length-unos)}</p>
            </div>

        )
        
    } */

    if (isLoading) {
        return <Loading/>
    }
    focusList();

    return (

        
        <div className="all-films-list">
            
            {/* <h5>búsqueda avanzada</h5> */}

        <div className="films-list">
        
        <div className="infoBusqueda" ref={DOMRef}>
            <p>Se buscaron films que en el campo {props.field} contengan total o parcialmente el valor {props.contains}</p>
            
            {films.length === 0 ?
                            <span>No se encontró ningún resultado. Probá de nuevo por favor (a veces el servidor falla, no es culpa del diseñador que es un tipazo)</span>
                            :
                            films.length === 1 ?
                                <span>Se encontró solo un resultado</span>
                                :
                                <span>Se encontraron {films.length} resultados</span>
                
            }

            

        <select defaultValue={'none'} onChange={(e) => sortByMethod(e.target.value)}>
            <option value="none" disabled>ordenar por</option>
            <option value="yearAscending">Año más bajo</option>
            <option value="yearDescending">Año más alto</option>
            <option value="scoreAscending">Puntaje más bajo</option>
            <option value="scoreDescending">Puntaje más alto</option>
            <option value="originDescending">Origen</option>
      </select>
      {/* {promedioAnio()} */}
        </div>
 
        <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedFilmsList}
            >cerrar</button>
            </div>

            

            {films.sort(sortMethods[sortState].method) && films.map(film => {

  
               
                return (
                    
                    <div key={film.id} className='film'>
                        
                    {/* <h5 className="cc-number">CC# {film.ccNumber}</h5> */}
                    {/* , id# {film.id} */}

                    {user && user.lvl === 42 ? 
                            
                        <button className='btn editButton'
                        onClick={() => editFilm(film)}
                        >
                        </button>
                    : null}

                {film.imgUrl === '' ? <div className='noPoster'>
                    <p className="score-row"><span className="score">{film.score}</span></p>
                    </div> : <div className='filmPoster'>
                        <p className="score-row"><span className="score">{film.score}</span></p><img src={film.imgUrl} alt="no hay poster"></img></div>}
                
                    
                
                <div className='filmInfo'>
                    <h2>{film.title}</h2>
                    <p>{film.director1}
                        {film.director1Genre ? <span> ({film.director1Genre}) </span> : <span> </span>}
                        {film.director2 ? <span>, {film.director2}</span> : null}
                        {film.director2Genre ? <span>({film.director2Genre}) </span> : null}
                        {film.director3 ? <span>, {film.director3}</span> : null}
                        {film.director3Genre ? <span>({film.director3Genre}) </span> : null}
                        {film.director4 ? <span>, {film.director4}</span> : null}
                        {film.director4Genre ? <span>({film.director4Genre}) </span> : null}
                          | {film.year} | {film.origin}
                    </p>
                    
                    <div className="cc-info">
                        <p>CC# {film.ccNumber} | By {film.host} | {film.date}</p>
                    </div>
                </div>

                {user && user.lvl === 42 ? 
                            
                            <button className='btn-outline-dark deleteButton'
                            onClick={() => confirmarEliminar(film)}
                             // onClick={() => deleteFilm(film)}
                             >
                            </button>
                        : null}

                
            </div>
        );
    })}
            
            

            {films.length !== 0 ?
                    <div className="all-films-list" id="TopOfAdvFilmList">
                    <button className="btn btn-danger"
                        onClick={cierraAdvancedFilmsList}
                    >cerrar</button>
                </div>
                :
                null}
            
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