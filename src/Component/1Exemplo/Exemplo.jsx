import React, { Component } from 'react'; //Importa o método componente e react
import cell from '../../imagens/telefone.png';//Importa imagem
import './Exemplo.css';//Importa css


class Exemplo extends Component {
    produto(){//Você pode criar algum outro estado de html para tela
        return(
            <div>
                <p>Algum html</p>
                <img src={cell} /> {/**Aqui temos o uso de uma imagem importada */}
            </div>
        )
    }

    render() {//Aqui acontece a renderização da página
        //O metodo return define o que vai ser renderizado no site
        if(1 !== 1 ){
           return(this.produto()) 
        }
        return (
            <div>
                
                <div>
                    <p>HTML AQUI</p>
               </div>                 
            </div>
        );
    }
}
export default Exemplo; //Aqui retorna o componente