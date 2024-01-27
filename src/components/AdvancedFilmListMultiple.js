import React, { useState, useEffect, useRef } from "react";
import APIService from "./APIService";
import './FilmList.css'
import Loading from "./Loading";



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

    useEffect(() => {
        props.contains ? fetchSuperData() : fetchData()
        .catch(console.error);
    }, [props.edited])

    /* useEffect(() => {

        props.contains ?

            APIService.SuperSearchFilm(props.contains)
                .then(resp => resp.json())
                .then(resp => setFilms(resp))
                .then(console.log('ok advanced'))
                .then(focusList())
                // .then(document.getElementById("TopOfAdvFilmList").scrollIntoView(true))
                .catch(error => console.log(error))

            :

            //props.cierraFormSimplified()
            //console.log("buscando solo "+ props.contains)

            fetch(`${REACT_APP_APIURL}/adv-get/${props.field1}/${props.contains1}/${props.field2}/${props.contains2}/${props.field3}/${props.contains3}/${props.field4}/${props.contains4}/${props.field5}/${props.contains5}/${props.field6}/${props.contains6}/${props.field7}/${props.contains7}/${props.field8}/${props.contains8}/`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                .then(resp => resp.json())
                .then(resp => setFilms(resp))
                .then(focusList())
                // .then(document.getElementById("TopOfAdvFilmList").scrollIntoView(true))
                .catch(error => console.log(error))


    }, [props.edited]) */


    const fetchSuperData = async () => {
        const data = await APIService.SuperSearchFilm(props.contains)
        if (data.ok) {
            const dataJson = await data.json();
            setFilms(dataJson);
            setLoading(false);
            console.log('ok advanced múltiple');
        }
        else {
            console.log('not ok')
        } 
    }

    const fetchData = async () => {
        const data = await fetch(`${REACT_APP_APIURL}/adv-get/${props.field1}/${props.contains1}/${props.field2}/${props.contains2}/${props.field3}/${props.contains3}/${props.field4}/${props.contains4}/${props.field5}/${props.contains5}/${props.field6}/${props.contains6}/${props.field7}/${props.contains7}/${props.field8}/${props.contains8}/`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (data.ok) {
            const dataJson = await data.json();
            setFilms(dataJson);
            setLoading(false);
            console.log('ok advanced simplified');
        }
        else {
            console.log('not ok')
        }  
    }

    const focusList = () => {
        setTimeout(() => {
            DOMRef.current.scrollIntoView()
        }
            , 10)
    }

    const { REACT_APP_APIURL } = process.env;

    //const data = await fetch(`${REACT_APP_APIURL}/adv-get`, {

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


    const editFilm = (film) => {
        props.editFilm(film)
        // cierraAdvancedFilmsListMultiple()

    }

    /*     const deleteFilm = (film) => {
            APIService.DeleteFilm(film.id)
            .then(() => props.deleteFilm())
        } */



    function cierraAdvancedFilmsListMultiple() {
        props.cierraAdvancedFilmsListMultiple()
    }

    const sortMethods = {
        none: { method: (a, b) => null },
        scoreAscending: { method: (a, b) => (a.score > b.score ? 1 : -1) },
        scoreDescending: { method: (a, b) => (a.score > b.score ? -1 : 1) },
        yearAscending: { method: (a, b) => (a.year > b.year ? 1 : -1) },
        yearDescending: { method: (a, b) => (a.year > b.year ? -1 : 1) },
        originDescending: { method: (a, b) => (a.origin.toLowerCase() > b.origin.toLowerCase() ? 1 : (a.origin.toLowerCase() < b.origin.toLowerCase() ? -1 : 0)) }
    }

    const sortByMethod = (method) => {
        setSortState(method)
    }


    /*INFO UTIL PARA LAS STATS: promedio año, promedio nota, lista ordenada de origenes (por consola), etc*/

    /* const promedioAnio = () => {
        let promedioYear = 0
        let promedioNota = 0
        let unos = 0

        {films.map(film => { 
            
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
        return ( 
            <div>
                <p> fueron eliminadas de la cuenta {unos} películas por no haber subido nota</p>
            <p>promedio año: {promedioYear/films.length}</p>
            <p>promedio nota: {promedioNota/(films.length-unos)}</p></div>
            
        )
    } */

    if (isLoading) {
        return <Loading/>
    }

    focusList();

    return (

        <div className="all-films-list">

            {/* <h5>búsqueda avanzada</h5> */}

            <div className="films-list"
                ref={DOMRef}>

                {props.contains ?
                    <div className="infoBusqueda"><p>Se buscaron films que en cualquier campo contenga total o parcialmente el valor {props.contains} </p>

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
                    </div>
                    :
                    <div className="infoBusqueda"><p>Se buscaron films con los siguientes criterios </p>

                        <table className="table">
                            <tbody>
                                {(props.contains1 !== ' ') ?
                                    <tr>
                                        <th> cc # </th>
                                        <td> {props.contains1} </td>
                                    </tr>
                                    : <tr>
                                        <th> cc # </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains2 !== ' ') ?
                                    <tr>
                                        <th> Título </th>
                                        <td> {props.contains2} </td>
                                    </tr>
                                    : <tr>
                                        <th> Título </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains3 !== ' ') ?
                                    <tr>
                                        <th> Año </th>
                                        <td> {props.contains3} </td>
                                    </tr>
                                    : <tr>
                                        <th> Año </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains4 !== ' ') ?
                                    <tr>
                                        <th> Origen </th>
                                        <td> {props.contains4} </td>
                                    </tr>
                                    : <tr>
                                        <th> Origen </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains5 !== ' ') ?
                                    <tr>
                                        <th> Dirección </th>
                                        <td> {props.contains5} </td>
                                    </tr>
                                    : <tr>
                                        <th> Dirección </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains6 !== ' ') ?
                                    <tr>
                                        <th> Género </th>
                                        <td> {props.contains6} </td>
                                    </tr>
                                    : <tr>
                                        <th> Género </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains7 !== ' ') ?
                                    <tr>
                                        <th> Anfitrión </th>
                                        <td> {props.contains7} </td>
                                    </tr>
                                    : <tr>
                                        <th> Anfitrión </th>
                                        <td> cualquiera </td>
                                    </tr>}
                                {(props.contains8 !== ' ') ?
                                    <tr>
                                        <th> Fecha </th>
                                        <td> {props.contains8} </td>
                                    </tr>
                                    : <tr>
                                        <th> Fecha </th>
                                        <td> cualquiera </td>
                                    </tr>}

                            </tbody>
                        </table>


                        <p>Se encontraron {films.length} resultados</p>
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
                }


                <div className="all-films-list">
                    <button className="btn btn-danger"
                        onClick={cierraAdvancedFilmsListMultiple}
                    >cerrar</button>
                </div>
              

                {films.sort(sortMethods[sortState].method) && films.map(film => {

                    //revisar form.js
                    /* function hasMoreDirectors() {
                        if (film.director4 !== '') {
                            return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre}), {film.director4}, ({film.director4Genre})</span>;
                        } else if (film.director3 !== '') {
                            return <span>, {film.director2}, ({film.director2Genre}), {film.director3}, ({film.director3Genre})</span>;
                        } else if (film.director2 !== '') {
                            return <span>, {film.director2}, ({film.director2Genre})</span>;
                        }
                    } */

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


                {films.length !== 0 ?
                    <div className="all-films-list" id="TopOfAdvFilmList">
                    <button className="btn btn-danger"
                        onClick={cierraAdvancedFilmsListMultiple}
                    >cerrar</button>
                </div>
                :
                null}
                        

                

            </div>

        </div>


    )

}



export default AdvancedFilmList