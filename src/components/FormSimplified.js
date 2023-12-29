import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import '../App.css'


function FormSimplified(props) {


    const [contains, setContains] = useState('')
    const DOMRef = useRef(null)
    const [ccNumber, setCcNumber] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [origin, setOrigin] = useState('')
    const [director1, setDirector1] = useState('')
    const [director1Genre, setDirector1Genre] = useState('')
    const [host, setHost] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        focusList()
        setCcNumber(' ')
        setTitle(' ')
        setYear(' ')
        setOrigin(' ')
        setDirector1(' ')
        setDirector1Genre(' ')
        setHost(' ')
        setDate(' ')
        
    }, [])


    const focusList = () => {
        setTimeout(() => {
            DOMRef.current.scrollIntoView({ block: "start", behavior: "smooth" })
        }
            , 100)
    }

    const openAdvancedForm = () => {
        props.openAdvancedForm()
        props.cierraFormSimplified()
    }

    const openAdvancedFilmListByMultipleSimplified = () => {
        props.abreAdvancedFilmsListMultiple(contains)
        props.cierraFormSimplified()
    }

    const cierraFormSimplified = () => {
        props.cierraFormSimplified()
    }

    return (
        <div>
            <div className="formulario-simple">
                <div className="formulario-fila">
                    <input type="text" className="form-control form-simple"
                        onChange={(e) => setContains(e.target.value)}
                    />
                    <Button type="button"
                        onClick={openAdvancedFilmListByMultipleSimplified}
                        className="btn btn-primary btn-outline btn-sm"
                    >🔎︎</Button>
                </div>
            </div>
            <div className="formulario-opciones"
            ref={DOMRef}>
                <p className="nuevasOpciones"
                    onClick={openAdvancedForm}
                >búsqueda avanzada</p>
                <p className="nuevasOpciones"
                    onClick={cierraFormSimplified}
                >cancelar</p>
            </div>
        </div>
    )
}



export default FormSimplified