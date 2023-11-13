import './App.css';
import { Header } from './components/Header';
//import { Examplefunctions } from './components/ExampleFunctions';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import FilmList from './components/FilmList';
import AdvancedForm from './components/AdvancedForm.js';
//import AdvancedFilmList from './components/AdvancedFilmList';



/* import { Films } from './components/Films';
import { GetAllFilms } from './components/GetAllFilms';  */
import { FrasesSobreGatos } from './components/FrasesSobreGatos';




function App() {

  //let field = 'title'
  //let contains = 'asdsad'

  
  //const [a, setA] = useState('abc')

  const [films, setFilms] = useState([])

  const [editedFilm, setEditedFilm] = useState(null)

  const [advancedEditedFilm, setAdvancedEditedFilm] = useState(null)

  const { REACT_APP_APIURL } = process.env;
  
  useEffect(() => {   
    fetch(`${REACT_APP_APIURL}`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        }
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    //.then((resp) => {if (resp.status.code == 200) {setA('b')}})
    //.then(console.log(a))
    //.then(resp => resp.json())
    .then(resp => setFilms(resp))
    .catch(error => console.log(error))
}, [])


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


  return (


    //react fragment
    <div className='films-list'>
      <Header></Header>
      {/* <Examplefunctions></Examplefunctions> */}
      <div className='film'>
        <div className='col'>
          <button
          className='btn btn-success'
          onClick={openForm}>Insertar nueva ficha</button>
        </div>
      </div>

      {editedFilm ? <Form film = {editedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm}/> : null }
      
      <FilmList films = {films} editFilm = {editFilm} deleteFilm = {deleteFilm} />

      
      {/* <AdvancedFilmList films = {advFilms} editFilm = {editFilm} deleteFilm = {deleteFilm}></AdvancedFilmList> */}
      <div className='film'>
        <div className='col'>
          <button
          className='btn btn-success'
          onClick={openAdvancedForm}>búsqueda avanzada</button>
        </div>
      </div>
      {/* <GetAllFilms></GetAllFilms>
      <Films></Films> */}
      {advancedEditedFilm ? <AdvancedForm film = {advancedEditedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm}/> : null }
      <FrasesSobreGatos></FrasesSobreGatos>
    </div>
    
  );
}

export default App;
