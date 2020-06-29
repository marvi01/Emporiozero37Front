import React, {useState} from 'react';


export default function Login(){
    const [login, setLogin] = useState(true);
    if(login === true){
        return(
            <div>
                <p>Login</p>
                <input type="email" id="user-name" class="form-control" placeholder="Full name" required="true" autofocus=""/>
                <input type="password" id="user-name" class="form-control" placeholder="Full name" required="" autofocus=""/>
                    <button onClick={()=> setLogin(false)}>
                        troca
                    </button>
            </div>
            
        );
    }else{
        return (
            <div>
                <p>Cadastro</p>
            <button onClick={()=> setLogin(true)}>
                troca
            </button>
            </div>
        );
        
    }
    
}



    
