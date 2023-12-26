import React, {useState, useEffect, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import './Form.css'
//import APIService from "./APIService";
//import App from "../App";




function AdvancedForm(props) {

 /*    const [films, setFilms] = useState([])
    let field = 'titulo'
    let contains = 'contiene' */

    /* useEffect(() => {
        fetch(`http://127.0.0.1:50000/adv-get/${field}/${contains}`, {
            'method':'GET',
            headers: {
            'Content-Type':'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp => setFilms(resp))
        .catch(error => console.log(error))
        }, []) */

    const [advFilmsList, setAdvFilmsList] = useState(null)
    const [field, setField] = useState(null)
    const [contains, setContains] = useState(null)

    const DOMRef = useRef(null)

    const focusForm = () => {
        DOMRef.current.scrollIntoView()     
      } 

    
    const openAdvancedFilmListByCCNumber = () => {
        /*setAdvFilmsList({contains:ccNumber})*/
        props.abreAdvancedFilmsList('ccNumber', ccNumber)
        props.cierraAdvancedForm() 
      }

    const openAdvancedFilmListByTitle = () => {
        props.abreAdvancedFilmsList('title', title)
        props.cierraAdvancedForm() 
      }

    const openAdvancedFilmListByYear = () => {
        props.abreAdvancedFilmsList('year', year)
        props.cierraAdvancedForm() 
    }
    
    const openAdvancedFilmListByOrigin = () => {
        props.abreAdvancedFilmsList('origin', origin)
        props.cierraAdvancedForm() 
    }

    const openAdvancedFilmListByDirector = () => {
        props.abreAdvancedFilmsList('director1', director1)
        props.cierraAdvancedForm() 
    }

    const openAdvancedFilmListByDirectorGenre = () => {
        props.abreAdvancedFilmsList('director1Genre', director1Genre)
        props.cierraAdvancedForm() 
    }

    const openAdvancedFilmListByHost = () => {
        props.abreAdvancedFilmsList('host', host)
        props.cierraAdvancedForm() 
    }

    const openAdvancedFilmListByDate = () => {
        props.abreAdvancedFilmsList('date', date)
        props.cierraAdvancedForm() 
    }

    const openAdvancedFilmListByMultiple = () => {
        props.abreAdvancedFilmsListMultiple('ccNumber', ccNumber, 'title', title, 'year', year, 'origin', origin, 'director1', director1, 'director1Genre', director1Genre, 'host', host, 'date', date)
        props.cierraAdvancedForm() 
      }

 

    const[ccNumber, setCcNumber] = useState('')
    const[title, setTitle] = useState('')
    const[year, setYear] = useState('')
    const[origin, setOrigin] = useState('')
    const[director1, setDirector1] = useState('')
    const[director1Genre, setDirector1Genre] = useState('')
    const[director2, setDirector2] = useState('')
    const[director2Genre, setDirector2Genre] = useState('')
    const[director3, setDirector3] = useState('')
    const[director3Genre, setDirector3Genre] = useState('')
    const[director4, setDirector4] = useState('')
    const[director4Genre, setDirector4Genre] = useState('')
    const[score, setScore] = useState('')
    const[host, setHost] = useState('')
    const[date, setDate] = useState('')

    useEffect(() => {
        setCcNumber(' ')
        setTitle(' ')
        setYear(' ')
        setOrigin(' ')
        setDirector1(' ')
        setDirector1Genre(' ')
        setDirector2(' ')
        setDirector2Genre(' ')
        setDirector3(' ')
        setDirector3Genre(' ')
        setDirector4(' ')
        setDirector4Genre(' ')
        setScore(' ')
        setHost(' ')
        setDate(' ')
        /* setCcNumber(props.film.ccNumber)
        setTitle(props.film.title)
        setYear(props.film.year)
        setOrigin(props.film.origin)
        setDirector1(props.film.director1)
        setDirector1Genre(props.film.director1Genre)
        setDirector2(props.film.director2)
        setDirector2Genre(props.film.director2Genre)
        setDirector3(props.film.director3)
        setDirector3Genre(props.film.director3Genre)
        setDirector4(props.film.director4)
        setDirector4Genre(props.film.director4Genre)
        setScore(props.film.score)
        setHost(props.film.host)
        setDate(props.film.date) */
        focusForm()
    }, [/*props.film*/])

    /* const AdvancedSearch = () => {
        APIService.AdvancedSearch(field, contains)
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    } */

   /*  const SBCcNumber = () => {
        APIService.searchByCcNumber({ccNumber})
        .then(resp=>  props.insertedFilm(resp))
        .catch(error => console.log(error))
    }
 */
    function cierraAdvancedForm() {
        props.cierraAdvancedForm()
    }

    const cierraAdvancedFilmsList = () => {
        setAdvFilmsList(null)
      }


    return (
        
        <div ref={DOMRef}>
             <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedForm}
            >cerrar formulario</button>
            </div>

                <div /*id='nuevaFicha'*/ className='busquedaAvanzada'>
                
                
                
                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='ccNumber' className ="form-label">ccNum</label>
                            <div className="opcionDeBusqueda">    
                                <input type="number" className="form-control" 
                            
                                placeholder = {"número de cc"}
                                onChange={(e) => setCcNumber(e.target.value)}
                                />
                                <Button type="button"
                                onClick={openAdvancedFilmListByCCNumber}
                                className="btn btn-secondary btn-outline-dark btn-sm"
                                >buscar por n° de CC</Button> 
                            </div>
                    </div>
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='title' className ="form-label">título</label>
                        <div className="opcionDeBusqueda">
                            <input type="text" className="form-control" 
                            // value = {title}
                            placeholder = {"título"}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            <Button
                            onClick={openAdvancedFilmListByTitle}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por título</Button> 
                        </div>
                    </div>
                   
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='year' className ="form-label">año</label>
                        <div className="opcionDeBusqueda">
                            <input type="number" className="form-control" 
                            // value = {title}
                            placeholder = {"año de estreno"}
                            onChange={(e) => setYear(e.target.value)}
                            />
                            <Button
                            onClick={openAdvancedFilmListByYear}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por año de estreno</Button> 
                        </div>
                    </div>
                   
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='origin' className ="form-label">origen</label>
                        <div className="opcionDeBusqueda">
                            <input type="text" className="form-control" 
                            // value = {title}
                            placeholder = {"origen"}
                            onChange={(e) => setOrigin(e.target.value)}
                            />
                            <Button
                            onClick={openAdvancedFilmListByOrigin}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por origen</Button> 
                        </div>
                    </div>
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='director1' className ="form-label">dirección</label>
                        <div className="opcionDeBusqueda">
                            <input type="text" className="form-control" 
                            // value = {title}
                            placeholder = {"dirección"}
                            onChange={(e) => setDirector1(e.target.value)}
                            />
                            <Button
                            onClick={openAdvancedFilmListByDirector}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por dirección</Button> 
                        </div>
                    </div>
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='director1Genre' className ="form-label">género</label>
                        <div className="opcionDeBusqueda">
                            
                        <select type="submit" className="form-control" defaultValue={'↓'}
                            //value={director1Genre}
                            onChange={(e) => setDirector1Genre(e.target.value)}>
                            <option value="↓" disabled>↓</option>
                            <option value="Q">Q</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                         </select> 
                            
                            <Button
                            onClick={openAdvancedFilmListByDirectorGenre}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por género</Button> 
                        </div>
                    </div>
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">
                        <label className ="form-label">anfitrión</label>
                        <div className="opcionDeBusqueda">

                        <select type="submit" className="form-control" defaultValue={'↓'}
                            //value={director1Genre}
                            onChange={(e) => setHost(e.target.value)}>
                            <option value="↓" disabled>↓</option>
                            <option value="Axel">Axel</option>
                            <option value="Antuña">Antu</option>
                            <option value="Lucía">Luci</option>
                            <option value="Ariel">J</option>
                            <option value="Andrea">Andrea</option>
                            <option value="Sergio">Sergio</option>
                            <option value="Mery">Mery</option>
                            <option value="Wen">Wen</option>
                            <option value="Leo">Roll</option>
                         </select> 

                            <Button
                            onClick={openAdvancedFilmListByHost}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por anfitrión</Button> 
                        </div>
                    </div>
                </div>

                <div className="opcionDeBusqueda">
                    <div className="campos">
                        <label className ="form-label">Año-CC</label>
                        <div className="opcionDeBusqueda">

                        <select type="submit" className="form-control" defaultValue={'↓'}
                            //value={director1Genre}
                            onChange={(e) => setDate(e.target.value)}>
                            <option value="↓" disabled>↓</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>                            
                         </select> 

                            <Button
                            onClick={openAdvancedFilmListByDate}
                            className="btn btn-secondary btn-outline-dark btn-sm"
                            >buscar por año</Button> 
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div>
                    <Button
                    onClick={openAdvancedFilmListByMultiple}
                    className="btn btn-primary mt-3"
                    >búsqueda avanzada combinada</Button>
                <p></p>
                <p>(buscar un film que coincida con todos los campos llenos)</p>
                </div>

               {/*  <label htmlFor='score' className="form-label">puntaje final</label>
                <input type="number" step={0.01} className="form-control"
                value={score}
                placeholder = {"enter final cc score"}
                onChange={(e) => setScore(e.target.value)}></input> */}
              
                
                {/* {
                    props.film.id ? <Button
                     onClick={updateFilm}
                     className="btn btn-primary mt-3"
                     >actualizar ficha</Button>
                     :
                     <Button
                     onClick={insertFilm}
                     className="btn btn-primary mt-3"
                     >crear nueva ficha</Button>
                } */}

                

            
            <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedForm}
            >cerrar formulario</button>
            </div>
        </div>
        
        {/* { advFilmsList ? <AdvancedFilmList contains = {contains} field = {field} cierraAdvancedForm = {cierraAdvancedForm} cierraAdvancedFilmsList = {cierraAdvancedFilmsList} /> : null } */}

</div>



) }


 

 

export default AdvancedForm