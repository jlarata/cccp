import './App.css';
import { Header } from './components/Header';
import { Examplefunctions } from './components/ExampleFunctions';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import FilmList from './components/FilmList';



/* import { Films } from './components/Films';
import { GetAllFilms } from './components/GetAllFilms';  */
import { FrasesSobreGatos } from './components/FrasesSobreGatos';



function App() {


  const [films, setFilms] = useState([])
  const [editedFilm, setEditedFilm] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        }
    })

    .then(resp => resp.json())
    .then(resp => setFilms(resp))
    .catch(error => console.log(error))
}, [])

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
    setEditedFilm({title:'', imgUrl:'', ccNumber:'', year:'', origin:'', director:'', score:'', host:'', date:''})
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
          onClick={openForm}>Instertar nueva ficha</button>
        </div>
      </div>

      {editedFilm ? <Form film = {editedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm}/> : null }

      <FilmList films = {films} editFilm = {editFilm} deleteFilm = {deleteFilm} />

      

      
    
      {/* <GetAllFilms></GetAllFilms>
      <Films></Films> */}
      <FrasesSobreGatos></FrasesSobreGatos>
    </div>
    
  );
}

export default App;
