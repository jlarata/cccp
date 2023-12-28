import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import './Form.css'
import APIService from "./APIService";


function FormSimplified(props) {



    const [contains, setContains] = useState('')
    const [isrender, setIsRender] = useState(false)

    const[ccNumber, setCcNumber] = useState('')
    const[title, setTitle] = useState('')
    const[year, setYear] = useState('')
    const[origin, setOrigin] = useState('')
    const[director1, setDirector1] = useState('')
    const[director1Genre, setDirector1Genre] = useState('')
    const[host, setHost] = useState('')
    const[date, setDate] = useState('')

    /* const searchFilm = () => {
        APIService.SuperSearchFilm(contains)
            console.log('se activo el searchfilm')
            */
            
            /* .then((resp) => {
            if (resp) {
                props.insertedFilm(resp); alert('ficha creada con eeexito')
            } else { alert('error, probablemente llenaste mal un campo, burro') }
            }) */

            /*
        .catch(error => console.log(error))

    props.cierraFormSimplified()
    //openAdvancedFilmListByMultiple()
    } */

    useEffect(() => {
        setIsRender(true)

        setCcNumber(' ')
        setTitle(' ')
        setYear(' ')
        setOrigin(' ')
        setDirector1(' ')
        setDirector1Genre(' ')
        setHost(' ')
        setDate(' ')
    }, [])

    

    const openAdvancedFilmListByMultipleSimplified = () => {
        props.abreAdvancedFilmsListMultiple(contains)
        props.cierraFormSimplified() 
    }

    return (
            <div className="formulario-simple">
                <div>
                    <input type="text" className="form-control"
                    onChange={(e) => setContains(e.target.value)}
                    /> 
                </div>
                <div>
                    <Button type="button"
                    onClick={openAdvancedFilmListByMultipleSimplified}
                    className="btn btn-secondary btn-outline-dark btn-sm"
                    >buscar</Button> 
                </div>
            </div>
           )
}



export default FormSimplified