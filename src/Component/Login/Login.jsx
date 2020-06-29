import React, {useState} from 'react';


export default function Login(){
    const [login, setLogin] = useState(true);
    if(login === true){
        return(
            <div>
                <p>Login</p>
            <button onClick={()=> setLogin(false)}>
                troca
            </button>
            </div>
            
        );
    }else{
        return (
            <div>
                <p>Cadastr</p>
            <button onClick={()=> setLogin(true)}>
                troca
            </button>
            </div>
        );
        
    }
    
}



    
