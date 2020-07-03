import React, { Component } from 'react'; //Importa o método componente e react
import './Produtos.css';//Importa css
import vodka from "../../imagens/vodka2.png"



class Produto extends Component {
    render() {//Aqui acontece a renderização da página
     
        return (
            <div className="product-wrapper bg-white ">
                <div className="row align-items-center no-gutters">
                    <div className="col-auto px-3">
                        <div className="product-img-wrapper">
                            <img src={vodka} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="product-info">
                            <h3 class="h6 my-3">Exercitation ex sit veniam commodo incididunt occaecat amet.</h3>
                            <div className="price mb-3">
                                <div className="old-price">
                                    60,00
                                    <span class="badge badge-success ml-2">20% OFF</span>
                                </div>
                                <span class="h4">R$ 50,00
                                </span>
                            </div>
                        </div>
                        <a href="#" class="btn btn-primary mb-3">Ver mais</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Produto; //Aqui retorna o componente