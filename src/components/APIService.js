export default class APIService {

    static UpdateFilm(id, body) {
        return fetch(`http://127.0.0.1:5000/update/${id}`, {
        'method':'PUT',
        headers: {
        'Content-Type':'application/json'    
        },
        body: JSON.stringify(body)
    })
    .then((resp) => {     
        if (!resp.ok) throw new Error(resp.status);
        else{
            this.avisoExito(' ficha editada con eeeeeeexitoooo')
            (resp => resp.json())
        }
      })  
//    .then(resp => resp.json())
    } 

    static InsertFilm(body) {
        return fetch('http://127.0.0.1:5000/add', {
        'method':'POST',
        headers: {
        'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((resp) => {
        if (!resp.ok) {
            this.avisoExito('error creando ficha. probablemente haya un campo inválido')
            throw new Error(resp.status)
        }
        else{
            this.avisoExito('ficha creada con eeeeeeexitoooo')
            (resp => resp.json())
          
        }
      })
    //.then(resp => resp.json())
    }

    static DeleteFilm(id) {
        return fetch(`http://127.0.0.1:5000/delete/${id}`, {
        'method':'DELETE',
        headers: {
        'Content-Type':'application/json'
        },
        
    })
    } 

    static avisoExito(aviso){
        return alert(aviso)
    }
    

/*         Ojo: cuando arme el boton que llame este servicio, imitar el deletefilm o update film pero lo que era BODY como parametro ahora es contains
        y ademas hay que pasar un primer parametro anterior, field, que el servicio va a usar para armar la route. */
    /* static AdvancedSearch(field, contains) {
        return fetch(`http://127.0.0.1:5000/adv-get/${field}/${contains}`, {
        'method':'GET',
        headers: {
        'Content-Type':'application/json'
        },
        contains: JSON.stringify(contains)
    })
    .then(resp => resp.json())
    } */

}