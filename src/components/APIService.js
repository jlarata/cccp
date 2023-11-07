export default class APIService {

    static UpdateFilm(id, body) {
        return fetch(`http://127.0.0.1:5000/update/${id}`, {
        'method':'PUT',
        headers: {
        'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    } 

    static InsertFilm(body) {
        return fetch('http://127.0.0.1:5000/add', {
        'method':'POST',
        headers: {
        'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    }

    static DeleteFilm(id) {
        return fetch(`http://127.0.0.1:5000/delete/${id}`, {
        'method':'DELETE',
        headers: {
        'Content-Type':'application/json'
        },
        
    })
    } 


/*         Ojo: cuando arme el boton que llame este servicio, imitar el deletefilm o update film pero lo que era BODY como parametro ahora es contains
        y ademas hay que pasar un primer parametro anterior, field, que el servicio va a usar para armar la route. */
    static AdvancedSearch(field, contains) {
        return fetch(`http://127.0.0.1:5000/${field}/${contains}`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        },
        contains: JSON.stringify(contains)
    })
    .then(resp => resp.json())
    }

}