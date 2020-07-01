import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';


export default function Login(){
  //Constante para fazer a troca de telas entre Login e Cadastro 
    const [login, setLogin] = useState(true);
      //HTLML DE LOGIN DENTRO DESSA DIV
        return(
            <div>
                <form>
                  <fieldset className = "layout">
            
            <div className="form-group">
                <h3 align = "center">Logar</h3>
              <label for="exampleInputEmail1">Email </label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Senha</label>
              <input type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="form-group form-check ">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
              <div className="">
              <label className="form-check-label" for="exampleCheck1">Lembre-se de mim</label>
              <p><Link  to="/Cadastro" className="form-check-label texto">Cadastre-se </Link></p>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success">Submit</button>
          
          </fieldset>
          </form>
            </div>
           
            
        );
    }
        
    



    
