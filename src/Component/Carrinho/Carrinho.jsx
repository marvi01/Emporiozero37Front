import React, { useState, useEffect } from 'react';
import { data } from 'jquery';
import { Redirect } from 'react-router-dom';
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
  }

  useEffect(() => {
      prencherArray()
  }, [count]);

  const carrinho = () => {
      if (Prod && Prod.length) {
         let verifica = window.confirm('Deseja finalizar a compra?');
         setredirect(verifica);
         if(verifica){
             console.log(verifica);
          return(
          <div> 
          <Redirect to="/ConfirmaCompra" />
          </div>)
         }
      }
      else {
          alert( 'Nenhum Produto Cadastrado')
      }
  }
  const redireciona =()=>{
      if(redirect){
       return(
       <div> 
       <Redirect to="/ConfirmaCompra" />
       </div>)
      }

  }
  const a = () => {
      setcount(1)
  }
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
        <tr >
            <th scope="row">Total</th>
            <td></td>
            <td></td>
            <td></td>
            <td>R$ {recebe.toFixed(2).replace(".", ",")}</td>
            <td><button onClick={carrinho}   className="btn btn-success">Confirmar</button></td>

        </tr>
    )
    return HtmlTotal;
  }

  const exibiCarrinho = () => {

      if (Prod && Prod.length) {
          const ProdutoCarrinho = Prod.map((item, indice) =>
              (

                  <tr key={indice}>
                      <th scope="row">{indice + 1}</th>
                      <td>
                          <img src={`https://anorosa.com.br/Emporio037/storage/${item.foto}`} className="img-tamanho mr-3" alt="..." />
                      </td>
                      <td>{item.nomeprod}</td>
                      <td>{item.QuantProd}</td>
                      <td>R$ {item.ValorTotal.toFixed(2).replace(".", ",")}</td>
                      <td><a onClick={() => {
                          sessionStorage.removeItem(item.id);
                          alert('Deletado com sucesso ')
                      }} href="/Carrinho" className="btn btn-danger " role="button" aria-pressed="true">Excluir</a></td>

                  </tr>
              )
          )

          return ProdutoCarrinho;
      } else {
          return (
              <tr>
                  <th>
                      Nenhum produto encontrado no carrinho :(
                  </th>

              </tr>)
      }

  }

  function headTabela() {
      const head = (
          <thead className="thead-dark">
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Imagem</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Valor total</th>
                  <th scope="col">Excluir</th>
              </tr>
          </thead>
      )
      return head;
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
                        <span>10</span>
                    </div>
                    <div className="cart-info-group">
                        <h2>Subtotal</h2>
                        <span>R$ 800,00</span>
                    </div>
                    <div className="cart-info-group">
                        <h2>Total</h2>
                        <span>R$ 1000,00</span>
                    </div>
                </div>
            </div>
            <div className="col">
            <div className="cart-product-wrapper-container pl-lg-5 p-lg-4">
                <h1 className="h2 mb-4">Carrinho de compras</h1>
                <div className="cart-product-wrapper">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <div className="cart-img-product">
                                <img src={vodka} alt="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="row cart-product-info text-lg-center flex-lg-row">
                                <div className="col-lg-5">
                                    <h2 className="cart-product-name mb-lg-0">Vodka Absolut 600 ML Mais recomendada</h2>
                                </div>
                                <div className="col-lg-auto">
                                    <div className="cart-quantity-container">
                                        <button type="button" className="btn btn-secondary btn-sm">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input type="text" readonly className="form-control-plaintext form-control-lg text-center" value="1" />
                                        <button type="button" className="btn btn-primary btn-sm">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="cart-product-price m-lg-0">
                                        <span className="cart-old-price">
                                            R$ 900,00  
                                            <span className="ml-2 badge badge-success">
                                                -20%
                                            </span>
                                        </span>
                                        <span className="cart-new-price">
                                            R$ 800,00
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-auto">
                                    <button className="btn btn-danger btn-sm cart-product-delete mb-lg-0 mr-lg-3">
                                        <span className="d-lg-none">Tirar do carrinho</span>
                                        <i className="fas fa-times d-none d-lg-inline"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="float-right mb-5">
            <button className="btn btn-lg btn-link">
                Voltar a loja
            </button>
            <button className="btn btn-lg btn-success">
                Finalizar compra
            </button>
        </div>
        <div className="clearfix"></div>
    </div>      
    
    )
}