import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import APIService from "./APIService";

function Form(props) {

    const[ccNumber, setCcNumber] = useState('')
    const[title, setTitle] = useState('')

    useEffect(() => {
        setCcNumber(props.film.ccNumber)
        setTitle(props.film.title)
    }, [props.article])

    const updateFilm = () => {
        APIService.UpdateFilm(props.film.id, {ccNumber, title})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.film ? (

<div /*id='nuevaFicha'*/ className='editarFicha'>

<h3>editar ficha</h3>
<form>
    <label htmlFor='ccNumber' className = "form-label">ccNum</label>
    <input type="number" className="form-control" 
    value = {ccNumber}
    placeholder = {"enter ccnum"}
    onChange={(e) => setCcNumber(e.target.value)}></input>
    <label htmlFor='title'>Título</label>
    <input /*onChange={(e) => setTitleState(e.target.value)} */ name="title" className="form-control"
    value = {title}
    placeholder = {props.film.title}
    onChange={(e) => setTitle(e.target.value)}></input>
    <label htmlFor='imgUrl'>imgUrl</label>
    <input name="imgUrl" className="form-control"
    placeholder = {props.film.imgUrl}></input>
    <label htmlFor='year'>Año</label>
    <input /* onChange={(e) => setYearState(e.target.value)} */ name="year" className="form-control"
    placeholder = {props.film.year}></input>
    <label htmlFor='origin'>Origen</label>
    <input /* onChange={(e) => setOriginState(e.target.value)} */ name="origin" className="form-control"
    placeholder = {props.film.origin}></input>
    
    <label htmlFor='direccion'>dirección</label>
    <input name="director" className="form-control"
    placeholder = {props.film.director}></input>
    <label htmlFor='score'>puntaje final</label>
    <input name="score" className="form-control"
    placeholder = {props.film.score}></input>
    <label htmlFor='host'>invitó</label>
    <input name="host" className="form-control"
    placeholder = {props.film.host}></input>
    <label htmlFor='date'>fecha de visionado</label>
    <input name="date" className="form-control"
    placeholder = {props.film.date}></input>
    
   

    <Button onClick={updateFilm}
    variant="success" type="submit">actualizar ficha</Button>


            </form>
        </div>
            ) : null
}
</div>) }

export default Form