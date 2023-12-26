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

    const focusList = () => {
        setTimeout(() => {
        DOMRef.current.scrollIntoView()
        }
        ,100)      
      } 
    
      const { REACT_APP_APIURL } = process.env;

//const data = await fetch(`${REACT_APP_APIURL}/adv-get`, {


      useEffect(() => {
        
        fetch(`${REACT_APP_APIURL}/adv-get/${props.field1}/${props.contains1}/${props.field2}/${props.contains2}/${props.field3}/${props.contains3}/${props.field4}/${props.contains4}/${props.field5}/${props.contains5}/${props.field6}/${props.contains6}/${props.field7}/${props.contains7}/${props.field8}/${props.contains8}/`, {
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


/*     const editFilm = (film) => {
        props.editFilm(film)
        
      } */

/*     const deleteFilm = (film) => {
        APIService.DeleteFilm(film.id)
        .then(() => props.deleteFilm())
    } */

    
    
    function cierraAdvancedFilmsListMultiple() {
        props.cierraAdvancedFilmsListMultiple()
    }


    return (

        <div className="all-films-list">
            
            <h5>búsqueda avanzada</h5>

        <div className="films-list"
         ref={DOMRef}>

        <div className="infoBusqueda"><p>se buscaron films con los siguientes criterios </p>
            
            <table className="table">
                <tbody>
                {(props.contains1 != ' ') ? 
                    <tr>
                        <th> cc # </th>
                        <td> {props.contains1} </td> 
                    </tr>
                :   <tr>
                        <th> cc # </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains2 != ' ') ? 
                    <tr>
                        <th> título </th>
                        <td> {props.contains2} </td> 
                    </tr>
                :   <tr>
                        <th> título </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains3 != ' ') ? 
                    <tr>
                        <th> año </th>
                        <td> {props.contains3} </td> 
                    </tr>
                :   <tr>
                        <th> año </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains4 != ' ') ? 
                    <tr>
                        <th> origen </th>
                        <td> {props.contains4} </td> 
                    </tr>
                :   <tr>
                        <th> origen </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains5 != ' ') ? 
                    <tr>
                        <th> dirección </th>
                        <td> {props.contains5} </td> 
                    </tr>
                :   <tr>
                        <th> dirección </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains6 != ' ') ? 
                    <tr>
                        <th> género </th>
                        <td> {props.contains6} </td> 
                    </tr>
                :   <tr>
                        <th> género </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains7 != ' ') ? 
                    <tr>
                        <th> Anfitrión </th>
                        <td> {props.contains7} </td> 
                    </tr>
                :   <tr>
                        <th> Anfitrión </th>
                        <td> cualquiera </td> 
                    </tr>}
                {(props.contains8 != ' ') ? 
                    <tr>
                        <th> fecha </th>
                        <td> {props.contains8} </td> 
                    </tr>
                :   <tr>
                        <th> fecha </th>
                        <td> cualquiera </td> 
                    </tr>}
                
                </tbody>
            </table>
            
            
        <p>se encontraron {films.length} resultados</p></div>
 
        <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedFilmsListMultiple}
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
                        <div className='filmPoster'><img src={film.imgUrl} alt="no hay poster"></img></div>
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

            <div className="all-films-list" id="TopOfAdvFilmList">
            <button className="btn btn-danger"
            onClick={cierraAdvancedFilmsListMultiple}
            >Descartar búsqueda</button>
            </div>
            
        </div>
        
        </div>
    
            
    )
    
}



export default AdvancedFilmList