const { REACT_APP_APIURL } = process.env;

export default class APIService {

    static resultado(aviso){
        return alert(aviso)
    }

    static SuperSearchFilm(contains){
        return fetch(`${REACT_APP_APIURL}/simp-get/${contains}/`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        }
        })
        }

    static UpdateFilm(id, body) {
        return fetch(`${REACT_APP_APIURL}/update/${id}`, {
        'method':'PUT',
        headers: {
        'Content-Type':'application/json'    
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .catch(error => console.log(error))
    } 

    static InsertFilm(body) {
        return fetch(`${REACT_APP_APIURL}/add`, {
        'method':'POST',
        headers: {
        'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    //.catch(this.resultado('error creando ficha. probablemente haya un campo inválido'))
    .catch(error => console.log(error))
    }


    
    
    /* static InsertFilm(body) {
        return fetch('http://127.0.0.1:50000/add', {
        'method':'POST',
        headers: {
        'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
        if (!response.ok) throw new Error})
    .then(() => 
        this.resultado('ficha creada con eeeeeeexitoooo'))
    .then(() => 
        resp => resp.json())
    //.catch(this.resultado('error creando ficha. probablemente haya un campo inválido'))
    .catch(error => console.log(error))
    //.then(resp => resp.json())
    } */

    static DeleteFilm(id, deleteKey) {
        return fetch(`${REACT_APP_APIURL}/delete/${id}/${deleteKey}`, {
        'method':'DELETE',
        headers: {
        'Content-Type':'application/json'
        },
    })
    .then(resp => resp.json())
    .catch(error => console.log(error))
    } 

    
    

/*         Ojo: cuando arme el boton que llame este servicio, imitar el deletefilm o update film pero lo que era BODY como parametro ahora es contains
        y ademas hay que pasar un primer parametro anterior, field, que el servicio va a usar para armar la route. */
    /* static AdvancedSearch(field, contains) {
        return fetch(`http://127.0.0.1:50000/adv-get/${field}/${contains}`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        },
        contains: JSON.stringify(contains)
    })
    .then(resp => resp.json())
    } */

}