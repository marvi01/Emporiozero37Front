import React, { Component } from 'react'; //Importa o método componente e react
import BestSellers from './BestSellers/BestSellers';
import Promotions from './Promotions/Promotions';
import Releases from './Releases/Releases';



class Section extends Component {
    render() {//Aqui acontece a renderização da página
        return (
          <div>
              <Releases />
              <BestSellers />
              <Promotions />
          </div>
        );
    }
}
export default Section; //Aqui retorna o componente