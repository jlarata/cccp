import './loginAndRegister.css';
import React, {useState, useEffect, useRef} from "react";
import httpClient from "./httpClient";
const { REACT_APP_APIURL } = process.env;

function Register(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {
        try {
          const resp = await httpClient.post(`${REACT_APP_APIURL}/register`, {
            email,
            password,
          });
           window.location.href = "/cccp";
        } catch (error) //de nuevo, error: any 
          { if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      };
      
      return (
        <div className="cajaCampos">
        <form className="formCampos">
              <div className="formCampo">
                <label>Email: </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formCampo">
                <label>Password: </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              { <button className='btn btn-outline-primary' type="button" onClick={() => registerUser()}>
                Registrarse
              </button> }
            </form>
          </div>
      )
      
};

export default Register;
