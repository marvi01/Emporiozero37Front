import React, { useState, useEffect } from 'react';
import { data } from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import vodka from "../../imagens/vodka2.png"
import './Carrinho.css'



export default function Carrinho(props) {
    const [Prod, setProd] = useState(true);
    const [count, setcount] = useState(true);
    const [Valor, setValor] = useState(true);
    const [redirect, setredirect] = useState(false);



    const prencherArray = () => {
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
        setProd(array);
        setValor(array2);
        console.log(Prod);
    }
    useEffect(() => {
        prencherArray()
    }, [count]);
    const exibiTotal = () => {
        var recebe = 0;
        if (Valor && Valor.length) {
            var valor
            const colunaFinal = Valor.reduce(function (total, numero) {
                valor = total + numero;
                return valor;
            }, 0);
            recebe = colunaFinal + 0;
        }
        const HtmlTotal = (
            <div className="cart-info-group">
                <h2>Total</h2>
                <span>R$ {recebe.toFixed(2).replace(".", ",")}</span>
            </div>
        )
        return HtmlTotal;


    }
    const teste = () => {
        if (Prod && Prod.length) {
            const htmlCarrinho = Prod.map((item, indice) => {
                const val = () => {
                    if (item.desconto > 0) {
                        return (
                            <div className="col">
                                <div className="cart-product-price m-lg-0">
                                    <span className="cart-old-price">
                                        R$  {item.preco.toFixed(2).replace(".", ",")}
                                        <span className="ml-2 badge badge-success">
                                            {item.desconto}%
                            </span>
                                    </span>
                                    <span className="cart-new-price">
                                        R$ {item.ValorTotal.toFixed(2).replace(".", ",")}
                                    </span>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="col">
                                <div className="cart-product-price m-lg-0">
                                    <span className="cart-new-price">
                                        R$ {item.preco.toFixed(2).replace(".", ",")}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                }
                return (
                    <div key={indice} className="cart-product-wrapper">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <div className="cart-img-product">
                                    <img src={"http://anorosa.com.br/Emporio037/storage/" + item.foto} alt="" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="row cart-product-info text-lg-center flex-lg-row">
                                    <div className="col-lg-5">
                                        <h2 className="cart-product-name mb-lg-0">{item.nomeprod}</h2>
                                    </div>
                                    <div className="col-lg-auto">
                                        <div className="cart-quantity-container">
                                            
                                            <input type="text" readonly className="form-control-plaintext form-control-lg text-center" value={item.QuantProd} />
                                            
                                        </div>
                                    </div>
                                    {val()}
                                    <div className="col-lg-auto">
                                        <button onClick={() => {
                                            sessionStorage.removeItem(item.id);
                                            alert('Deletado com sucesso ');
                                            window.location.reload();
                                        }} className="btn btn-danger btn-sm cart-product-delete mb-lg-0 mr-lg-3">
                                            <span className="d-lg-none">Tirar do carrinho</span>
                                            <i className="fas fa-times d-none d-lg-inline"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            return htmlCarrinho;
        } else {
            return (
                <div>
                    Nenhum Produto encontrado
                </div>
            )
        }
    }
    return (
        <div className="container">
            <div className="row cart bg-light">
                <div className="col-lg-3 cart-details  ml-lg-3">
                    <div className="bg-cart-details"></div>
                    <div className="cart-info-group-container px-lg-4">
                        <h2 className="mb-4 h3">Detalhes</h2>
                        <div className="cart-info-group">
                            <h2 >Quantidade de itens</h2>
                            <span>{Prod.length}</span>
                        </div>
                        {exibiTotal()}
                    </div>
                </div>
                <div className="col">
                    <div className="cart-product-wrapper-container pl-lg-5 p-lg-4">
                        <h1 className="h2 mb-4">Carrinho de compras</h1>
                        {teste()}
                    </div>
                </div>
            </div>
            <div className="float-right mb-5">
                <Link to="/" className="btn btn-lg btn-link">
                    Voltar a loja
            </Link>
                <Link to="/FinalizarCompra" className="btn btn-lg btn-success">
                    Finalizar compra
            </Link>
            </div>
            <div className="clearfix"></div>
        </div>

    )
}