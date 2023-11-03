import logo from './logo.svg';
import './App.css';
import { Films } from './components/Films';
import { Header } from './components/Header';
import { FrasesSobreGatos } from './components/FrasesSobreGatos';
import { GetAllFilms } from './components/GetAllFilms';
import { Examplefunctions } from './components/ExampleFunctions';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import FilmList from './components/FilmList';




function App() {


  const [films, setFilms] = useState([])
  const [editedFilm, setEditedFilm] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
        'method':'GET',
        headers: {
        'Content-Type':'applications/json'
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

  return (
    //react fragment
    <div>
      <Header></Header>
      <Examplefunctions></Examplefunctions>
      <FilmList films = {films} editFilm = {editFilm}/>

      {editedFilm ? <Form film = {editedFilm} updatedData = {updatedData} /> : null }

      
    
     {/*  <GetAllFilms></GetAllFilms>
      <Films></Films>
      <FrasesSobreGatos></FrasesSobreGatos> */}
    </div>
    
  );
}

export default App;
