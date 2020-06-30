import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';


export default function Login(){
    const [login, setLogin] = useState(true);
    if(login === true){
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
              <p><Link  onClick={()=> setLogin(false)} className="form-check-label texto">Cadastre-se </Link></p>
              </div>
            </div>
            <button type="submit" class="btn btn-outline-success">Submit</button>
          
          </fieldset>
          </form>
            </div>
           
            
        );
    }else{
        return (
            <div>
                <p>HTLML DE CADASTRO DENTRO DESSA DIV</p>
            <button onClick={()=> setLogin(true)}>
                troca
            </button>
            </div>
        );
        
    }
    
}



    
