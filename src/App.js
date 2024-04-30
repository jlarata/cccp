import './App.css';
import './loginAndRegister.css';
import { Header } from './components/Header';
import { useState, setState, useEffect, useRef/*, useMemo*/, React } from 'react';
import Form from './components/Form';
import LastFilm from './components/LastFilm.js';
import FilmList from './components/FilmList';
import AdvancedForm from './components/AdvancedForm.js';
import AdvancedFilmList from './components/AdvancedFilmList.js';
import AdvancedFilmListMultiple from './components/AdvancedFilmListMultiple.js';
import ButtonGoTop from './components/ButtonGoTop';
import FormSimplified from './components/FormSimplified';
import httpClient from './httpClient.js';

import LogInPage from './LogInPage.js'
import Register from './Register.js';
//import _ from 'lodash';
// import { FrasesSobreGatos } from './components/FrasesSobreGatos';


const { REACT_APP_APIURL } = process.env;


function App() {

  const [user, setUser] = useState(null);
  
  

  const [edited, setEdited] = useState(false)
  const [films, setFilms] = useState([])
  const [editedFilm, setEditedFilm] = useState(null)
  const [allFilmsList, setAllFilmsList] = useState(false)
  const [showLastFilm, setShowLastFilm] = useState(false)
  const [advancedEditedFilm, setAdvancedEditedFilm] = useState(null)
  const [formSimplified, setFormSimplified] = useState(null)

  const [field, setField] = useState(null)
  const [contains, setContains] = useState(null)

  const [field1, setField1] = useState(null)
  const [contains1, setContains1] = useState(null)
  const [field2, setField2] = useState(null)
  const [contains2, setContains2] = useState(null)
  const [field3, setField3] = useState(null)
  const [contains3, setContains3] = useState(null)
  const [field4, setField4] = useState(null)
  const [contains4, setContains4] = useState(null)
  const [field5, setField5] = useState(null)
  const [contains5, setContains5] = useState(null)
  const [field6, setField6] = useState(null)
  const [contains6, setContains6] = useState(null)
  const [field7, setField7] = useState(null)
  const [contains7, setContains7] = useState(null)
  const [field8, setField8] = useState(null)
  const [contains8, setContains8] = useState(null)

  const [advFilmsList, setAdvFilmsList] = useState(false)
  const [advFilmsListMultiple, setAdvFilmsListMultiple] = useState(false)
  
  const logoutUser = async () => {
    await httpClient.post(`${REACT_APP_APIURL}/logout`);
    window.location.href = "/cccp";
    };

  useEffect(() => {
  (async () => {
    try {
      const resp = await httpClient.get(`${REACT_APP_APIURL}/@me`);
      setUser(resp.data);
    } catch (error) {
      console.log("Not authenticated nop");
    }
  })();
}, []);

  const resetStates = () => {
  setEdited(false)
  setFilms([])
  setEditedFilm(null)
  setAllFilmsList(false)
  setShowLastFilm(false)
  setAdvancedEditedFilm(null)
  setFormSimplified(null)
  setField(null)
  setContains(null)
  setField1(null)
  setContains1(null)
  setField2(null)
  setContains2(null)
  setField3(null)
  setContains3(null)
  setField4(null)
  setContains4(null)
  setField5(null)
  setContains5(null)
  setField6(null)
  setContains6(null)
  setField7(null)
  setContains7(null)
  setField8(null)
  setContains8(null)
  setAdvFilmsList(false)
  setAdvFilmsListMultiple(false)
  }

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
    setEdited(!edited)
  }

  const openForm = () => {
    setEditedFilm({title:'', imgUrl:'', ccNumber:'', year:'', origin:'', director1:'', director1Genre:'', director2:'', director2Genre:'', director3:'', director3Genre:'', director4:'', director4Genre:'', score:'', host:'', date:''})
  }

  const openAdvancedForm = () => {
    setAdvancedEditedFilm({title:'', imgUrl:'', ccNumber:'', year:'', origin:'', director1:'', director1Genre:'', director2:'', director2Genre:'', director3:'', director3Genre:'', director4:'', director4Genre:'', score:'', host:'', date:''})
  }

  const openFormSimplified = () =>
  setFormSimplified(true)

  const closeFormSimplified = () =>
  setFormSimplified(null)

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

  const cierraFormSimplified = () => {
    setFormSimplified(null)
  }

  const cierraLastFilm = () => {
    setShowLastFilm(false)
    
  }
  const cierraFilmsList = () => {
    setAllFilmsList(false)
    
  }

  const cierraAdvancedFilmsList = () => {
    setAdvFilmsList(false)
  }

  const cierraAdvancedFilmsListMultiple = () => {
    setAdvFilmsListMultiple(false)
  }
  
  function abreAdvancedFilmsList(field, contains) {
    //test console.log(field)
    setField(field)
    setContains(contains)
    //test console.log(contains)
    setAdvFilmsList({contains:contains}, {field:field})
  }

  function abreAdvancedFilmsListMultiple(contains, field1, contains1, field2, contains2, field3, contains3, field4, contains4, field5, contains5, field6, contains6, field7, contains7, field8, contains8) {
    console.log("campos: "+field1+", "+field2+", "+field3+", "+field4+", "+field5+", "+field6+", "+field7+", "+field8)
    /* if(contains1 === null) {
      contains = ''
    } */
    setContains(contains)
    setField1(field1)
    setField2(field2)
    setField3(field3)
    setField4(field4)
    setField5(field5)
    setField6(field6)
    setField7(field7)
    setField8(field8)
    setContains1(contains1)
    setContains2(contains2)
    setContains3(contains3)
    setContains4(contains4)
    setContains5(contains5)
    setContains6(contains6)
    setContains7(contains7)
    setContains8(contains8)
    //test console.log("valor: "+contains+"; valores: "+contains1+", "+contains2+", "+contains3+", "+contains4+", "+contains5+", "+contains6+", "+contains7+", "+contains8)
    setAdvFilmsListMultiple({contains:contains}, {contains1:contains1}, {field1:field1}, {contains2:contains2}, {field2:field2}, {contains3:contains3}, {field3:field3}, {contains4:contains4}, {field4:field4}, {contains5:contains5}, {field5:field5}, {contains6:contains6}, {field6:field6}, {contains7:contains7}, {field7:field7}, {contains8:contains8}, {field8:field8})
  }

  const abreLastFilm = () => {
    setShowLastFilm(true)
  }

  const abreFilmsList = () => {
    setAllFilmsList(true)
  }

  
   
  return (  

    <div className='general-container'>
    <div className=''>
      <Header></Header>  





      <div>
             
      {user != null ? (
        <div class="cajaLogin">
          <div class="cajaCampos"><p>{user.email}</p>
          {user.lvl === 42 ? <p>admin</p> : <p> user</p>}
          {/* <h2>Logged in</h2>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Autorización de nivel: {user.lvl}</h3>
          {user.lvl === 42 ? <p>code a</p> : <p> code b</p>} */}

          <button class="btn btn-outline-primary" onClick={logoutUser}>Logout</button>
          </div>
        </div>
      ) : (
        <div class="cajaLogin">
          <div class="tituloCampos">
            <p>No estás logueadx</p>
            <div>
              <div>{<LogInPage/>}</div>
              <div>{<Register/>}</div>
            {/* <a href="/register">
            <button>Register</button>
            </a> */}
            </div>
            </div>
        </div>
      )}
    </div>





      <ButtonGoTop/>      
      
      <div className='bodyContainer'>

      <div className="all-films-list">
            <p className='title'
            onClick={resetStates}
            >CCApp</p>
            </div>

      <div className="all-films-list">
            <h4
            onClick={abreLastFilm}
            >ver última ficha</h4>
            </div>
      {showLastFilm ? <LastFilm films = {films} edited={edited} editFilm = {editFilm} cierraLastFilm = {cierraLastFilm} /> : null}


      <div className="all-films-list">
            <h4
            onClick={abreFilmsList}
            >ver todas las fichas</h4>
            </div>
      {allFilmsList ? <FilmList films = {films} edited={edited} editFilm = {editFilm} deleteFilm = {deleteFilm} cierraFilmsList = {cierraFilmsList} /> : null}
      
      {user && user.lvl === 42 ? 
        <div className="all-films-list">
          <h4
            onClick={openForm}
            >insertar nueva ficha
          </h4>
        </div>
      : null}
      

      {editedFilm ? <Form film = {editedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm} cierraFormsList ={cierraFormsList} /> : null }

      <div className="all-films-list">
            <h4
            onClick={openFormSimplified}
            >buscar ficha</h4>
            </div>

      {/* <div className="all-films-list">
            <h4
            onClick={openAdvancedForm}
            >buscar ficha</h4>
            </div> */}

      
      {advancedEditedFilm ? <AdvancedForm /*film = {advancedEditedFilm} updatedData = {updatedData} insertedFilm = {insertedFilm}*/ cierraAdvancedForm = {cierraAdvancedForm} abreAdvancedFilmsList={abreAdvancedFilmsList} abreAdvancedFilmsListMultiple={abreAdvancedFilmsListMultiple} setFilms = {setFilms} /> : null }
      
      { advFilmsList ? <AdvancedFilmList edited={edited} contains = {contains} field = {field} editFilm = {editFilm} cierraAdvancedFilmsList = {cierraAdvancedFilmsList} /> : null }
      { advFilmsListMultiple ? <AdvancedFilmListMultiple edited={edited} editFilm = {editFilm} contains={contains} contains1 = {contains1} contains2 = {contains2} contains3 = {contains3} contains4 = {contains4} contains5 = {contains5} contains6 = {contains6} contains7 = {contains7} contains8 = {contains8} field1 = {field1} field2 = {field2} field3 = {field3} field4 = {field4} field5 = {field5} field6 = {field6} field7 = {field7} field8 = {field8} cierraAdvancedFilmsListMultiple = {cierraAdvancedFilmsListMultiple} /> : null }

      {formSimplified ? <div className="all-films-list">
            <FormSimplified contains = {contains} abreAdvancedFilmsListMultiple = {abreAdvancedFilmsListMultiple} cierraFormSimplified = {cierraFormSimplified} openAdvancedForm={openAdvancedForm} ></FormSimplified>
            </div>
       : null }

      

      
      
        </div>
      </div>
    </div>
    
  );
}

export default App;
