import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetalheCarrinho extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prod: [],
            ValorTotal: 0
        }
    }

    componentDidMount() {
        var array = []
        var array2 = []
        for (let i = 0; i < 99; i++) {
            let tranformador = sessionStorage.getItem(i);
            if (tranformador != null) {
                let tranformado = JSON.parse(tranformador);
                array2.push(tranformado.ValorTotal);
                array.push(tranformado);
            }
        }
        this.setState({ prod: array });
        let valor = 0;
        array2.reduce(function (total, numero) {
            valor = total + numero;
            return valor;
        }, 0)
        this.setState({ValorTotal:valor})
    }
    ProdCarrinho = () => {
        const produto = this.state.prod;
        if (produto && produto.length) {
            const htmlProd = produto.map((item, indice) => {
                return (
                    <div key={indice} className="cart-product-details">
                        <span>{item.QuantProd}x {item.nomeprod} {item.ml} ML</span>
                        <span>R$ {item.ValorTotal.toFixed(2).replace(".", ",")}</span>
                    </div>
                )
            }
            )
            return htmlProd
        }
    }
    render() {
        return (
            <div className="col-md checkout-cart-details">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark rounded p-3">
                    <a className="navbar-brand d-md-none" href="#">Carrinho de compras</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#checkout-cart-details-collapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mt-3 mt-lg-0" id="checkout-cart-details-collapse">
                        <div className="checkout-cart-details-info">
                            <h2 className="h4">Detalhes</h2>
                            <div className="cart-product-details-container">
                                {this.ProdCarrinho()}
                            </div>
                            <div className="cart-values">
                                <hr className="bg-light" />
                                <div className="cart-value-info">
                                    <span>Frete</span>
                                    <span>R$ 84,00</span>
                                </div>
                                <div className="cart-value-info">
                                    <span>Total</span>
                                    <span>R$ {this.state.ValorTotal.toFixed(2).replace(".","," )}</span>
                                </div>
                            </div>
                            <Link to="/Carrinho" className="btn btn-block btn-primary">Ver carrinho</Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default DetalheCarrinho;