import React, { useState, useEffect, useRef } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import './Form.css'
//import APIService from "./APIService";
//import App from "../App";




function AdvancedForm(props) {

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



    const [ccNumber, setCcNumber] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [origin, setOrigin] = useState('')
    const [director1, setDirector1] = useState('')
    const [director1Genre, setDirector1Genre] = useState('')
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

        focusForm()
    }, [])

    function cierraAdvancedForm() {
        props.cierraAdvancedForm()
    }

    const cierraAdvancedFilmsList = () => {
        setAdvFilmsList(null)
    }


    return (

        <div ref={DOMRef}>

            <div /*id='nuevaFicha'*/ className='busquedaAvanzada'>

                <p className="nuevasOpciones"
                >formulario de búsqueda avanzada
                </p>

                <p className="nuevasOpciones"
                    onClick={cierraAdvancedForm}
                >cerrar formulario</p>


                <div className="opcionesDeBusqueda">
                    {/* <label htmlFor='ccNumber' className="form-label">ccNum</label> */}
                    <div className="opcionDeBusqueda">
                        <input type="number" className="form-control"

                            placeholder={"número de cc"}
                            onChange={(e) => setCcNumber(e.target.value)}
                        />
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByCCNumber}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>

                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        {/* <label htmlFor='title' className="form-label">título</label> */}
                        <input type="text" className="form-control"
                            // value = {title}
                            placeholder={"título"}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByTitle}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>

                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        <input type="text" className="form-control"
                            placeholder={"año"}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByYear}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>


                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        <input type="text" className="form-control"
                            placeholder={"origen"}
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByOrigin}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>

                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        <input type="text" className="form-control"
                            placeholder={"dirección"}
                            onChange={(e) => setDirector1(e.target.value)}
                        />
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByDirector}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>

                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        <select type="submit" className="form-control" defaultValue={'género'}
                            //value={director1Genre}
                            onChange={(e) => setDirector1Genre(e.target.value)}>
                            <option value="género" disabled>género ⮛</option>
                            <option value="Q">Q</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByDirectorGenre}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>

                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        <select type="submit" className="form-control" defaultValue={'anfitrión'}
                            //value={director1Genre}
                            onChange={(e) => setHost(e.target.value)}>
                            <option value="anfitrión" disabled>anfitrión ⮛</option>
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
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByHost}
                            >🔎︎</button>
                        </div>
                    </div>
                </div>

                <div className="opcionesDeBusqueda">
                    <div className="opcionDeBusqueda">
                        <select type="submit" className="form-control" defaultValue={'undia'}
                            //value={director1Genre}
                            onChange={(e) => setDate(e.target.value)}>
                            <option value="undia" disabled>un día del año ⮛</option>
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
                        <div className="buttonContainer">
                            <button className="btn btn-secondary btn-outline-dark btn-sm"
                                onClick={openAdvancedFilmListByDate}
                            >🔎︎</button>
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
                    <p>(buscar un film que coincida con <b>todos</b> los campos iniciados)</p>
                </div>

                <p className="nuevasOpciones"
                    onClick={cierraAdvancedForm}
                >cerrar formulario</p>
            </div>
        </div>



    )
}






export default AdvancedForm