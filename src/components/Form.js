import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import APIService from "./APIService";

function Form(props) {


    const[ccNumber, setCcNumber] = useState('')
    const[title, setTitle] = useState('')
    const[imgUrl, setImgUrl] = useState('')
    const[year, setYear] = useState('')
    const[origin, setOrigin] = useState('')
    const[director, setDirector] = useState('')
    const[score, setScore] = useState('')
    const[host, setHost] = useState('')
    const[date, setDate] = useState('')

    useEffect(() => {
        setCcNumber(props.film.ccNumber)
        setTitle(props.film.title)
        setImgUrl(props.film.imgUrl)
        setYear(props.film.year)
        setOrigin(props.film.origin)
        setDirector(props.film.director)
        setScore(props.film.score)
        setHost(props.film.host)
        setDate(props.film.date)
    }, [props.film])

    const updateFilm = () => {
        APIService.UpdateFilm(props.film.id, {ccNumber, imgUrl, title, year, origin, director, score, host, date})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    const insertFilm = () => {
        APIService.InsertFilm({ccNumber, imgUrl, title, year, origin, director, score, host, date})
        .then(resp=>  props.insertedFilm(resp))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.film ? (
                <div /*id='nuevaFicha'*/ className='editarFicha'>
                
                {
                    props.film.id ? 
                    <h3>editar ficha {props.film.id}</h3>
                    :
                    <h3>crear nueva ficha {props.film.id}</h3>
                }
                

                <form>
                <label htmlFor='ccNumber' className ="form-label">ccNum</label>
                <input type="number" className="form-control" 
                value = {ccNumber}
                placeholder = {"enter ccnum"}
                onChange={(e) => setCcNumber(e.target.value)}
                />

                <label htmlFor='imgUrl' className="form-label">imgUrl</label>
                <input type="text" className="form-control"
                value = {imgUrl}
                placeholder = {'enter img url'}
                onChange={(e) => setImgUrl(e.target.value)}>
                </input>
                        

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
                
                <label htmlFor='director' className="form-label">dirección</label>
                <input type="text" className="form-control"
                value={director}
                placeholder = {"enter director"}
                onChange={(e) => setDirector(e.target.value)}></input>

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
                
                {
                    props.film.id ? <Button
                     onClick={updateFilm}
                     className="btn btn-primary mt-3"
                     >actualizar ficha</Button>
                     :
                     <Button
                     onClick={insertFilm}
                     className="btn btn-primary mt-3"
                     >crear nueva ficha</Button>
                }

                

            </form>
        </div>
            ) : null
}
</div>) }

export default Form