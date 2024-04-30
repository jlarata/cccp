import './loginAndRegister.css';
import React, {useState, useEffect, useRef} from "react";
import httpClient from "./httpClient";
const { REACT_APP_APIURL } = process.env;

function LogInPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post(`${REACT_APP_APIURL}/login`, {
        email,
        password,
      });

      window.location.href = "/cccp";
      }
      catch (error) { // decia error: any pero tiraba error de js a ts... creo
      if (error.response.status === 401) {
        alert("hay un error en el usuario o contraseña");
      }
    }
    }   


    return (
        <div class="cajaCampos">
        <form class="formCampos">
          <div class="formCampo">
            <label>Email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="formCampo">
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div><button class="btn btn-outline-success" type="button" onClick={() => logInUser()}>
            Loguear
          </button></div>
          
        </form>
      </div>
    ) 
    

}

export default LogInPage;

  

