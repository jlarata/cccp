import React, { useState, useEffect, useRef } from "react";
import APIService from "./APIService";

//asd

const { REACT_APP_APIURL } = process.env;

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

    useEffect(() => {

        // setEmptyDirectors(); aparentemente todo esto ya no sería necesario dado que estoy usando props

        console.log(REACT_APP_APIURL)

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
                console.log('ok');
            }
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
                        
                            <h5 className="cc-number">CC# {film.ccNumber}
                                {/* , id# {film.id} */}
                            </h5>
                        
                        {film.imgUrl === '' ? <div className='noPoster'>asdasdasdasd</div> : <div className='filmPoster'><img src={film.imgUrl} alt="no hay poster"></img></div>}

                        <div className='filmInfo'>
                            <h2>{film.title}</h2>
                            <p>{film.director1}
                                {film.director1Genre ? <span>({film.director1Genre}) </span> : null}
                                {film.director2 ? <span>, {film.director2}</span> : null}
                                {film.director2Genre ? <span>({film.director2Genre}) </span> : null}
                                {film.director3 ? <span>, {film.director3}</span> : null}
                                {film.director3Genre ? <span>({film.director3Genre}) </span> : null}
                                {film.director4 ? <span>, {film.director4}</span> : null}
                                {film.director4Genre ? <span>({film.director4Genre}) </span> : null}
                                  | ({film.year})
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

            </div> : null}

            <div className="all-films-list">
                <h5
                    onClick={cierraFilmsList}
                >cerrar todas las fichas</h5>
            </div>
        </div>

    )
}



export default FilmList