import React, { useState, useEffect, useRef } from "react";
import APIService from "./APIService";
import Loading from "./Loading";


//asd

const { REACT_APP_APIURL } = process.env;

function FilmList(props) {

    const [edited, SetEdited] = useState(false)
    const [films, setFilms] = useState([])
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteKey, setDeleteKey] = useState('')
    const [filmToDelete, setFilmToDelete] = useState('')
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
        fetchData()
        .catch(console.error);
        
    }, [props.edited])

    const fetchData = async () => {
        const data = await fetch(`${REACT_APP_APIURL}/get`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        if (data.ok) {
            const dataJson = await data.json();
            setFilms(dataJson);
            setLoading(false);
            console.log('ok');
        }
        else {
            console.log('not ok')
        }

    }

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
            if (myfilm.id === filmToDelete) {
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
            , 100)
    }

    

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
        // cierraFilmsList()

    }




    //revisar form.js


    function cierraFilmsList() {
        props.cierraFilmsList()
    }


    if (isLoading) {
        return <Loading/>
    }
    focusList();
    
    return (
        <div className="all-films-list" ref={DOMRef}>



            <div className="all-films-list">
                <button className="btn btn-danger"
                    onClick={cierraFilmsList}
                >cerrar</button>
            </div>

            {films && films.map(film => {

                return (
                    <div key={film.id} className='film'>
                        
                            {/* <h5 className="cc-number">CC# {film.ccNumber}</h5> */}
                            {/* , id# {film.id} */}
                        <button className='btn editButton'
                                    onClick={() => editFilm(film)}
                                >
                        </button>
                        
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
                        <button className='btn-outline-dark deleteButton'
                                    onClick={() => confirmarEliminar(film)}
                                // onClick={() => deleteFilm(film)}
                                >
                        </button>
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

            </div> : null}


            <div className="all-films-list">
                <button className="btn btn-danger"
                    onClick={cierraFilmsList}
                >cerrar</button>
            </div>
            {/* <div className="all-films-list">
                <h5
                    onClick={cierraFilmsList}
                >cerrar todas las fichas</h5>
            </div> */}
        </div>
        
    )
    
}




export default FilmList