import React, { useState, useEffect } from 'react';
import { data } from 'jquery';



export default function Carrinho(props) {

  const [carrinho, setCarrinho] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setErro] = useState(null);
  const [estado, setEstado] = useState(false);
  const [nulo, setNulo] = useState(true);
  const [countconexao] = useState(0);
  const [Produto, setProduto] = useState(true);
  
  async function conexao() { //Função para consultar a api
    var response;
    var response2;
    try {
      const token = localStorage.getItem("JWT_token");
      console.log(token);
      response = await fetch('http://anorosa.com.br/Emporio037/api/me?token=' + token,{method: "post"}) 
      let usuario = await response.json();
      console.log(usuario);
      setUser(usuario=>
        setUser(usuario)); 
      console.log(localStorage.getItem("JWT_token"));
      console.log(user);
    } catch (error) {

      setErro(error);
    }
      try {
        console.log(user);
        response2 = await fetch('http://anorosa.com.br/Emporio037/api/selectusercarrinho/' +2 );
        const responseCarrinho = await response2.json();
        const json2 = responseCarrinho.data
        console.log(json2[0]);
        setCarrinho(responseCarrinho);
      } catch (error) {
        setErro(error);
      }
      const carro = await response2;
      if (carro.data != null) {
        setCarrinho(carro.data);
        setNulo(false);
        try {
          //Buscando o parametro passado 
          const id = carrinho.produto_id
          const response3 = await fetch('https://anorosa.com.br/Emporio037/api/produto/' + id);
          const json3 = await response3.json();
          console.log(response3.json());
          if(json3 !=null){
            
              setProduto(json3.data)
              console.log(Produto);
          }
        } catch (error) {
          console.log(error);
          this.setProduto(error )
        }
      };
    ;

    setEstado(true);
  };

  useEffect(() => {
    conexao();
  }, [countconexao]);
  if (estado === true) {
    if (nulo === false) {
      return(
        <p>HTML EXIBIDO PARA O CARRINHO</p>
      )
    } else {
      return (
        <p>HTML CASO CARRINHO ESTEJA VAZIO</p>
      )
    }
  } else {
    return (
      <p>HTML EXIBIDO ENQUANTO A API É CONSULTADA</p>
    )
  }

  if (error) {
    return (
      <p>HTML CASO DÊ UM ERRO NA API</p>
    )
  }
}