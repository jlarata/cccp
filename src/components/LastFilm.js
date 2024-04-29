import React, { useState, useEffect, useRef } from "react";
import APIService from "./APIService";
import Loading from "./Loading";
import httpClient from "../httpClient";


const { REACT_APP_APIURL } = process.env;

function LastFilm(props) {

    const [edited, SetEdited] = useState(false)
    const [films, setFilms] = useState([])
    const [user, setUser] = useState()


    // por ahora estos quedan afuera. ¿queremos que se pueda eliminar desde last-film component?
    //const [deleteConfirm, setDeleteConfirm] = useState(false)
    //const [deleteKey, setDeleteKey] = useState('')
    //const [filmToDelete, setFilmToDelete] = useState('')
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
        fetchData()
        .catch(console.error);
        
    }, [props.edited])

    const fetchData = async () => {
        const data = await fetch(`${REACT_APP_APIURL}/get-last`, {
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
            //test console.log('ok');
        }
        else {
            console.log('not ok')
        }
        
            
              try {
                const resp = await httpClient.get(`${REACT_APP_APIURL}/@me`);
                setUser(resp.data);
              } catch (error) {
                console.log("Not authenticated nop");
              }

    }

    const DOMRef = useRef(null)

    const focusList = () => {
        setTimeout(() => {
            DOMRef.current.scrollIntoView()
        }
            , 10)
    }

    const editFilm = (film) => {
        props.editFilm(film)
        // cierraFilmsList()

    }

    function cierraLastFilm() {
        props.cierraLastFilm()
    }


    if (isLoading) {
        return <Loading/>
    }

    focusList();

    
    return (
        <div className="all-films-list" ref={DOMRef}>

            <div className="all-films-list">
                <button className="btn btn-danger"
                    onClick={cierraLastFilm}
                >cerrar</button>
            </div>

                    <div key={films.id} className='film'>
                        
                        {user && user.lvl === 42 ? 
                            
                            <button className='btn editButton'
                                    onClick={() => editFilm(films)}
                                >
                        </button>
                            
                        : null}

                        {/* <button className='btn editButton'
                                    onClick={() => editFilm(films)}
                                >
                        </button> */}
                        
                        {films.imgUrl === '' ?
                            <div className='noPoster'>
                                <p className="score-row">
                                    <span className="score">{films.score}
                                    </span>
                                </p>
                            </div>
                            :
                            <div className='filmPoster'>
                                    <p className="score-row">
                                        <span className="score">{films.score}
                                        </span>
                                    </p>
                                    <img src={films.imgUrl} alt="no hay poster">
                                    </img>
                            </div>}
                                                
                        <div className='filmInfo'>
                            <h2>{films.title}</h2>
                            <p>{films.director1}
                                {films.director1Genre ? <span> ({films.director1Genre}) </span> : <span> </span>}
                                {films.director2 ? <span>, {films.director2}</span> : null}
                                {films.director2Genre ? <span>({films.director2Genre}) </span> : null}
                                {films.director3 ? <span>, {films.director3}</span> : null}
                                {films.director3Genre ? <span>({films.director3Genre}) </span> : null}
                                {films.director4 ? <span>, {films.director4}</span> : null}
                                {films.director4Genre ? <span>({films.director4Genre}) </span> : null}
                                  | {films.year} | {films.origin}
                            </p>
                            
                            <div className="cc-info">
                                <p>CC# {films.ccNumber} | By {films.host} | {films.date}</p>
                            </div>
                        </div>
                    </div>
            </div>   
    )
}




export default LastFilm