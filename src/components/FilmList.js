import React, {useState, useEffect, useRef} from "react";
import APIService from "./APIService";
import './FilmList.css'

//asd

function FilmList(props) {

    const [films, setFilms] = useState([])
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteKey, setDeleteKey] = useState('')
    const [filmToDelete, setFilmToDelete] = useState('')
    // const [cantidadDeDirectores, setCantidadDeDirectores] = useState('')

/*  aparentemente todo esto ya no sería necesario dado que estoy usando props
   const[director2, setDirector2] = useState('')
    const[director2Genre, setDirector2Genre] = useState('')
    const[director3, setDirector3] = useState('')
    const[director3Genre, setDirector3Genre] = useState('')
    const[director4, setDirector4] = useState('')
    const[director4Genre, setDirector4Genre] = useState('') */

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

    const DOMRef = useRef(null)

    const focusList = () => {
        setTimeout(() => {
        DOMRef.current.scrollIntoView()
        }
        ,100)      
      } 

    useEffect(() => {

        // setEmptyDirectors(); aparentemente todo esto ya no sería necesario dado que estoy usando props
        const { REACT_APP_APIURL } = process.env;

        const fetchData = async () => {
            const data = await fetch(`${REACT_APP_APIURL}/get`, {
              'method':'GET',
              headers: {
              'Content-Type':'application/json'
                }
              }
            )
            if(data.ok) {
              const dataJson = await data.json();
              setFilms(dataJson);
              console.log('ok');}
            else {
              console.log('not ok')
            }
            
          }
          fetchData() 
          .catch(console.error);
          focusList()
        }, [])
        
        
    /* aparentemente todo esto ya no sería necesario dado que estoy usando props
        const setEmptyDirectors = () => {
        setDirector2('')
        setDirector2Genre('')
        setDirector3('')
        setDirector3Genre('')
        setDirector4('')
        setDirector4Genre('')
    } */

    const editFilm = (film) => {
        props.editFilm(film)
        cierraFilmsList()
        
      }

    

    
    //revisar form.js
    function hasMoreDirectors(film){
        if (film.director4) {
            return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre}), {film.director4}, ({film.director4Genre})</span>;
        } else if (film.director3) {
            return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre})</span>;
        } else if (film.director2) {
            return <span>, {film.director2}, ({film.director2Genre})</span>;
        } 
    }

    /* const resetCantidadDeDirectores = () => {
        setCantidadDeDirectores(1)
    }

    const agregarDirectores = () => {
        if (film.director4){
            setCantidadDeDirectores(cantidadDeDirectores + 3)
        } else
        if (film.director3) {
            setCantidadDeDirectores(cantidadDeDirectores + 2)
        } else
        if (film.director2) {
            setCantidadDeDirectores(cantidadDeDirectores + 1)
        };
    } */

    function cierraFilmsList() {
        props.cierraFilmsList()
    }

    

    return (
        <div className="films-list" ref={DOMRef}>
            

            <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraFilmsList}
            >cierra la lista</button>
            </div>

            {films && films.map(film => {
                
                

                return (
                    
                    
                    <div key={film.id} className='film'>
                        <div className='filmInfo'>
                            <h3>cc# {film.ccNumber}, id# {film.id}</h3>
                            
                        </div>
                        <div className='filmPoster'>
                            <img src={film.imgUrl}
                            alt="poster de la peli"></img>
                            </div>
                        <div className='filmInfo'>
                            <h2>{film.title}</h2>   

                            {/* {resetCantidadDeDirectores()}
                            {agregarDirectores()} */}

                            <p>dirigida por {film.director1}, ({film.director1Genre}) {hasMoreDirectors(film)} </p>
                            

                            <p>{film.year}, {film.origin}</p>
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
                                onClick={() => confirmarEliminar(film)}
                                // onClick={() => deleteFilm(film)}
                                >eliminar</button>
                            </div>

                            
                        </div>
                    </div>
                    

                );
            })}

            {deleteConfirm ? <div className="confirmBox">
                                <label htmlFor='confirmar' className="form-label">¿qué vehículo participa en el cc?</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => setDeleteKey(e.target.value)}>
                                </input>
                                <button className='btn btn-outline-danger'
                                onClick={() => deleteFilm(filmToDelete, deleteKey)}
                                >confirmar eliminar</button>
                                
                        </div> :null }

        <div className="all-films-list">
            <h5
            onClick={cierraFilmsList}
            >cerrar todas las fichas</h5>
            </div>
        </div>
    
    )
}



export default FilmList