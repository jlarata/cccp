import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import './Form.css'
import APIService from "./APIService";


function Form(props) {



    const [ccNumber, setCcNumber] = useState('')
    const [title, setTitle] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [year, setYear] = useState('')
    const [origin, setOrigin] = useState('')
    const [director1, setDirector1] = useState('')
    const [director1Genre, setDirector1Genre] = useState('')
    const [cantidadDeDirectores, setCantidadDeDirectores] = useState('')
    const [director2, setDirector2] = useState('')
    const [director2Genre, setDirector2Genre] = useState('')
    const [director3, setDirector3] = useState('')
    const [director3Genre, setDirector3Genre] = useState('')
    const [director4, setDirector4] = useState('')
    const [director4Genre, setDirector4Genre] = useState('')
    const [score, setScore] = useState('')
    const [host, setHost] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        setCcNumber(props.film.ccNumber)
        setTitle(props.film.title)
        setImgUrl(props.film.imgUrl)
        setYear(props.film.year)
        setOrigin(props.film.origin)
        setDirector1(props.film.director1)
        setDirector1Genre(props.film.director1Genre)
        setCantidadDeDirectores(1)
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

    const insertFilm = () => {
        APIService.InsertFilm({ ccNumber, imgUrl, title, year, origin, director1, director1Genre, director2, director2Genre, director3, director3Genre, director4, director4Genre, score, host, date })
            .then((resp) => {
                if (resp) {
                    props.insertedFilm(resp); alert('ficha creada con eeexito')
                } else { alert('error, probablemente llenaste mal un campo, burro') }
            })
            .catch(error => console.log(error))

        props.cierraFormsList()

    }

    const updateFilm = () => {
        APIService.UpdateFilm(props.film.id, { ccNumber, imgUrl, title, year, origin, director1, director1Genre, director2, director2Genre, director3, director3Genre, director4, director4Genre, score, host, date })
            .then((resp) => { props.updatedData(resp) })
            .catch(error => console.log(error))
    }






    //busca las cajas para agregar directores adicionales y les quita la clase (en las clases esta el display:none)
    // ya no es necesario, parte del viejo método
    //var directores = 1

    const agregarDirector = () => {
        if (cantidadDeDirectores <= 3) {
            setCantidadDeDirectores(cantidadDeDirectores + 1)
        };
        console.log('cantidad de directores = ' + (cantidadDeDirectores + 1));
        /* if(cantidadDeDirectores === 1){
            var cajaSegundoDirector = document.getElementsByClassName("segundoDirector");
                cajaSegundoDirector[0].classList.remove('segundoDirector')
            } 
        if(cantidadDeDirectores === 2){
            var cajaTercerDirector = document.getElementsByClassName("tercerDirector");
            cajaTercerDirector[0].classList.remove('tercerDirector')
        }
        if(cantidadDeDirectores === 3){
            var cajaCuartoDirector = document.getElementsByClassName("cuartoDirector");
            cajaCuartoDirector[0].classList.remove('cuartoDirector')
        }   antiguo método para mostrar cajas (ahora son renderizadas)*/
    }


    /* const agregarDirector = () => {
        if(directores<4){
            directores++
            if(directores === 2){
                var cajaSegundoDirector = document.getElementsByClassName("segundoDirector");
                    cajaSegundoDirector[0].classList.remove('segundoDirector')
                }
            if(directores === 3){
                var cajaTercerDirector = document.getElementsByClassName("tercerDirector");
                cajaTercerDirector[0].classList.remove('tercerDirector')
            }
            if(directores === 4){
                var cajaCuartoDirector = document.getElementsByClassName("cuartoDirector");
                cajaCuartoDirector[0].classList.remove('cuartoDirector')
            }   
        }
    } */

    function cierraFormsList() {
        props.cierraFormsList()
    }

    return (

        <div>

            <div className="all-films-list">
                <button className="btn btn-danger"
                    onClick={cierraFormsList}
                >cancelar</button>
            </div>

            {props.film ? (
                <div /*id='nuevaFicha'*/ className='editarFicha'>

                    {
                        props.film.id ?
                            <h3>editar ficha {props.film.id}</h3>
                            :
                            <h3>crear nueva ficha {props.film.id}</h3>
                    }

                    <form>
                        <label htmlFor='ccNumber' className="form-label">ccNum</label>
                        <input type="number" className="form-control"
                            value={ccNumber}
                            placeholder={"enter ccnum"}
                            onChange={(e) => setCcNumber(e.target.value)}
                        />

                        <label htmlFor='imgUrl' className="form-label">imgUrl</label>
                        <input type="text" className="form-control"
                            value={imgUrl}
                            placeholder={'enter img url'}
                            onChange={(e) => setImgUrl(e.target.value)}>
                        </input>


                        <label htmlFor='title' className="form-label">Título</label>
                        <input type="text" className="form-control"
                            value={title}
                            placeholder={'enter title'}
                            onChange={(e) => setTitle(e.target.value)}></input>

                        <label htmlFor='year' className="form-label">Año</label>
                        <input type="number" className="form-control"
                            value={year}
                            placeholder={"enter year"}
                            onChange={(e) => setYear(e.target.value)}></input>

                        <label htmlFor='origin' className="form-label">Origen</label>
                        <input type="text" className="form-control"
                            value={origin}
                            placeholder={"enter film origin"}
                            onChange={(e) => setOrigin(e.target.value)}></input>

                        <label htmlFor='director1' className="form-label">director</label>
                        <input type="text" className="form-control"
                            value={director1}
                            placeholder={"enter director"}
                            onChange={(e) => setDirector1(e.target.value)}></input>

                        <label htmlFor='director1Genre' className="form-label">género</label>
                        <select type="submit" className="form-control"
                            value={director1Genre}
                            onChange={(e) => setDirector1Genre(e.target.value)}>
                            <option value="Q">Q</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>

                        {(cantidadDeDirectores < 4) &&
                            <span className="botoneria agregaDirector">
                                <Button
                                    onClick={agregarDirector}
                                    className="btn btn-primary mt-3">agregar Director</Button>
                            </span>}

                        {(cantidadDeDirectores > 1) &&
                            <span>
                                <label htmlFor='director2' className="form-label">segundx director</label>
                                <input type="text" className="form-control"
                                    value={director2}
                                    placeholder={"enter another director"}
                                    onChange={(e) => setDirector2(e.target.value)}></input>


                                <label htmlFor='director2Genre' className="form-label">género</label>
                                <select type="submit" className="form-control"
                                    value={director2Genre}
                                    onChange={(e) => setDirector2Genre(e.target.value)}>
                                    <option value="Q">Q</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select></span>}

                        {(cantidadDeDirectores > 2) &&
                            <span>
                                <label htmlFor='director3' className="form-label">tercerx director</label>
                                <input type="text" className="form-control"
                                    value={director3}
                                    placeholder={"enter another director"}
                                    onChange={(e) => setDirector3(e.target.value)}></input>

                                <label htmlFor='director3Genre' className="form-label">género</label>
                                <select type="submit" className="form-control"
                                    value={director3Genre}
                                    onChange={(e) => setDirector3Genre(e.target.value)}>
                                    <option value="Q">Q</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </span>}

                        {(cantidadDeDirectores === 4) &&
                            <span>
                                <label htmlFor='director4' className="form-label">cuartx director</label>
                                <input type="text" className="form-control"
                                    value={director4}
                                    placeholder={"enter another director"}
                                    onChange={(e) => setDirector4(e.target.value)}></input>

                                <label htmlFor='director4Genre' className="form-label">género</label>
                                <select type="submit" className="form-control"
                                    value={director4Genre}
                                    onChange={(e) => setDirector4Genre(e.target.value)}>
                                    <option value="Q">Q</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </span>}

                        {/*  <input type="submit" className="form-control"
                value={director1Genre}
                placeholder = {"enter director"}
                onChange={(e) => setDirector1Genre(e.target.value)}></input> */}


                        <label htmlFor='score' className="form-label">puntaje final</label>
                        <input type="number" step={0.01} className="form-control"
                            value={score}
                            placeholder={"enter final cc score"}
                            onChange={(e) => setScore(e.target.value)}></input>

                        <label htmlFor='host' className="form-label">invitó</label>
                        <input type="text" className="form-control"
                            value={host}
                            placeholder={"enter host"}
                            onChange={(e) => setHost(e.target.value)}></input>

                        <label htmlFor='date' className="form-label">fecha de visionado</label>
                        <input type="date" className="form-control"
                            value={date}
                            placeholder={"enter date"}
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
        </div>)
}



export default Form