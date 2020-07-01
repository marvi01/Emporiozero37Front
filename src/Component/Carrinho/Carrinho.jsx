import React, { useState, useEffect } from 'react';



export default function Carrinho(props) {

  const [carrinho, setCarrinho] = useState(null);
  const [userid, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setErro] = useState(null);
  const [estado, setEstado] = useState(false);
  const [nulo, setNulo] = useState(true);
  const [countconexao] = useState(0);
  async function conexao() { //Função para consultar a api
    var response;
    var response2;
    try {
      response = await fetch('http://anorosa.com.br/Emporio037/api/me?token=' + token);
    } catch (error) {

      setErro(error);
    }
    const json = await response.json();
    if (json.id != null) {
      setUserId(json.id);
      try {
        response2 = await fetch('http://anorosa.com.br/Emporio037/api/selectusercarrinho/' + userid);
      } catch (error) {
        setErro(error);
      }
      const json2 = await response2.json();
      if (json2.data != null) {
        setCarrinho(json2.data);
        setNulo(false);
      };
    };

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