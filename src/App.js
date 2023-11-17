import './App.css';
import { Header } from './components/Header';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import FilmList from './components/FilmList';
import AdvancedForm from './components/AdvancedForm.js';
import { FrasesSobreGatos } from './components/FrasesSobreGatos';




function App() {

  const [films, setFilms] = useState([])

  const [editedFilm, setEditedFilm] = useState(null)

  const [allFilmsList, setAllFilmsList] = useState(false)

  const [advancedEditedFilm, setAdvancedEditedFilm] = useState(null)

  const { REACT_APP_APIURL } = process.env;
  
  useEffect(() => {
    
    const fetchData = async () => {
      const data = await fetch(`${REACT_APP_APIURL}`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
          }
        }
      )
      if(data.ok) {
        const dataJson = await data.json();
        setFilms(dataJson);
        console.log('ok');}
      else {
        console.log('not ok')
      }
      
    } 
    fetchData() 
      .catch(console.error);
  }, [])

/* esto que sigue fue mi ultimo intento para hacer el fetch mejor en el useEffect. estoy bastante
seguro que no está funcionando el .then y por eso no activa el SetFilms de la linea 36

useEffect(() => {
    
 
    const fetchData = () => {
      const data = fetch(`${REACT_APP_APIURL}`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        }
      })
      return data}
    
    fetchData((data) => {
      if(data.ok)
        {
          const films = data.json(); 
          setFilms(films);
          console.log('ok');
        } else {console.log('not ok')}
    })
       
}, [])*/




    
    
  
    /* .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }) */

    //.then((resp) => {if (resp.status.code == 200) {setA('b')}})
    //.then(console.log(a))
    //.then(resp => resp.json())

/*     .then(resp => setFilms(resp))
    .catch(error => console.log(error))
}, []) */


/* useEffect(() => {
  fetch(`http://127.0.0.1:5000/adv-get/${field}/${contains}`, {
      'method':'GET',
      headers: {
      'Content-Type':'application/json'
      }
  })
  .then(resp => resp.json())
  .then(resp => setAdvFilms(resp))
  .catch(error => console.log(error))
  }, []) */

  const editFilm = (film) => {
    setEditedFilm(film)
    
  }
  const updatedData = (film) => {
    const new_film = films.map(my_film => {
      if(my_film.id === film.id) {
        return film
      } else {
        return my_film
      }
    })
    setFilms(new_film)
  }

  const openForm = () => {
    setEditedFilm({title:'', imgUrl:'', ccNumber:'', year:'', origin:'', director1:'', director1Genre:'', director2:'', director2Genre:'', director3:'', director3Genre:'', director4:'', director4Genre:'', score:'', host:'', date:''})
  }

  const openAdvancedForm = () => {
    setAdvancedEditedFilm({title:'', imgUrl:'', ccNumber:'', year:'', origin:'', director1:'', director1Genre:'', director2:'', director2Genre:'', director3:'', director3Genre:'', director4:'', director4Genre:'', score:'', host:'', date:''})
  }

  const insertedFilm = (film) => {
    const new_films = [...films, film]
    setFilms(new_films)
  }

  const deleteFilm = (film) => {
    const new_films = films.filter(myfilm => {
      if(myfilm.id === film.id) {
        return false;
      }
      return true
    })
    setFilms(new_films)
  } 


  const cierraFormsList = () => {
    setEditedFilm(null)
  }

  const cierraAdvancedForm = () => {
    setAdvancedEditedFilm(null)
  }

  const cierraFilmsList = () => {
    setAllFilmsList(false)
    
  }
  const abreFilmsList = () => {
    setAllFilmsList(true)
  }

  return (


    //react fragment
    <div className='general-container'>
    <div className='films-list'>
      <Header></Header>
      {/* <Examplefunctions></Examplefunctions> */}
  

      <div className='bodyContainer'>
      <div className="all-films-list">
            <h4
            onClick={abreFilmsList}
            >Ver todas las fichas</h4>
            </div>
      {allFilmsList? <FilmList films = {films} editFilm = {editFilm} deleteFilm = {deleteFilm} cierraFilmsList = {cierraFilmsList} /> : null}
      
      <div className="all-films-list">
            <h4
            onClick={openForm}
            >Insertar nueva ficha</h4>
            </div>

      {editedFilm ? <Form film = {editedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm} cierraFormsList ={cierraFormsList} /> : null }
      
      {/* <AdvancedFilmList films = {advFilms} editFilm = {editFilm} deleteFilm = {deleteFilm}></AdvancedFilmList> */}
      
      <div className="all-films-list">
            <h4
            onClick={openAdvancedForm}
            >búsqueda avanzada</h4>
            </div>

     
      {/* <GetAllFilms></GetAllFilms>
      <Films></Films> */}
      {advancedEditedFilm ? <AdvancedForm film = {advancedEditedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm} cierraAdvancedForm ={cierraAdvancedForm} /> : null }
      {/* <FrasesSobreGatos></FrasesSobreGatos> */}
        </div>
      </div>
    </div>
    
  );
}

export default App;
