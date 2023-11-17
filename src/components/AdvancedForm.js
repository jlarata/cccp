import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import './Form.css'
import APIService from "./APIService";
import App from "../App";
import AdvancedFilmList from "./AdvancedFilmList";




function AdvancedForm(props) {

 /*    const [films, setFilms] = useState([])
    let field = 'titulo'
    let contains = 'contiene' */

    /* useEffect(() => {
        fetch(`http://127.0.0.1:5000/adv-get/${field}/${contains}`, {
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

    
    const openAdvancedFilmList = () => {
        setField('ccNumber')
        setContains(ccNumber)
        setAdvFilmsList({contains:ccNumber})
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
        setCcNumber(props.film.ccNumber)
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
        setDate(props.film.date)
    }, [props.film])

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
        
        <div>
             <div className="all-films-list">
            <button className="btn btn-danger"
            onClick={cierraAdvancedForm}
            >Cancelar</button>
            </div>

                <div /*id='nuevaFicha'*/ className='editarFicha'>
                
                
                <form>
                <div className="opcionDeBusqueda">
                    <div className="campos">              
                        <label htmlFor='ccNumber' className ="form-label">ccNum</label>
                        <input type="number" className="form-control" 
                        value = {ccNumber}
                        placeholder = {"enter ccnum"}
                        onChange={(e) => setCcNumber(e.target.value)}
                        />
                    </div>
                    <div className="botoneria">
                    <Button
                    onClick={openAdvancedFilmList}
                    className="btn btn-primary mt-3"
                    >buscar por n° de CC</Button>
                    </div>
                </div>

                <label htmlFor='title' className="form-label">Título</label>
                <input type="text" className="form-control"
                value = {title}
                placeholder = {'enter title'}
                onChange={(e) => setTitle(e.target.value)}></input>
                
                <label htmlFor='year' className="form-label">Año</label>
                <input type="number" className="form-control"
                value = {year}
                placeholder = {"enter year"}
                onChange={(e) => setYear(e.target.value)}></input>

                <label htmlFor='origin' className="form-label">Origen</label>
                <input type="text" className="form-control"
                value={origin}
                placeholder = {"enter film origin"}
                onChange={(e) => setOrigin(e.target.value)}></input>
                
                <label htmlFor='director1' className="form-label">director</label>
                <input type="text" className="form-control"
                value={director1}
                placeholder = {"enter director"}
                onChange={(e) => setDirector1(e.target.value)}></input>
                
                <label htmlFor='director1Genre' className="form-label">género</label>
                <select type="submit" className="form-control"
                value={director1Genre}
                onChange={(e) => setDirector1Genre(e.target.value)}>
                    <option value="Q">Q</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>                
                
                <span>
                <label htmlFor='director2' className="form-label">director</label>
                <input type="text" className="form-control"
                value={director2}
                placeholder = {"enter another director"}
                onChange={(e) => setDirector2(e.target.value)}></input>
                

                <label htmlFor='director2Genre' className="form-label">género</label>
                <select type="submit" className="form-control"
                value={director2Genre}
                onChange={(e) => setDirector2Genre(e.target.value)}>
                    <option value="Q">Q</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select></span>

                <span>
                <label htmlFor='director3' className="form-label">director</label>
                <input type="text" className="form-control"
                value={director3}
                placeholder = {"enter another director"}
                onChange={(e) => setDirector3(e.target.value)}></input>
                
                <label htmlFor='director3Genre' className="form-label">género</label>
                <select type="submit" className="form-control"
                value={director3Genre}
                onChange={(e) => setDirector3Genre(e.target.value)}>
                    <option value="Q">Q</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
                </span>

                <span>
                <label htmlFor='director4' className="form-label">director</label>
                <input type="text" className="form-control"
                value={director4}
                placeholder = {"enter another director"}
                onChange={(e) => setDirector4(e.target.value)}></input>
                
                <label htmlFor='director4Genre' className="form-label">género</label>
                <select type="submit" className="form-control"
                value={director4Genre}
                onChange={(e) => setDirector4Genre(e.target.value)}>
                    <option value="Q">Q</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
                </span>

                <label htmlFor='score' className="form-label">puntaje final</label>
                <input type="number" step={0.01} className="form-control"
                value={score}
                placeholder = {"enter final cc score"}
                onChange={(e) => setScore(e.target.value)}></input>

                <label htmlFor='host' className="form-label">invitó</label>
                <input type="text" className="form-control"
                value={host}
                placeholder = {"enter host"}
                onChange={(e) => setHost(e.target.value)}></input>

                <label htmlFor='date' className="form-label">fecha de visionado</label>
                <input type="date" className="form-control"
                value={date}
                placeholder = {"enter date"}
                onChange={(e) => setDate(e.target.value)}></input>
                
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

                

            </form>
        </div>

        { advFilmsList ? <AdvancedFilmList contains = {contains} field = {field} cierraAdvancedFilmsList = {cierraAdvancedFilmsList} /> : null }

</div>



) }


 

 

export default AdvancedForm