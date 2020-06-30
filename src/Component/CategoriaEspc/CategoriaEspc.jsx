import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuSuperior from '../MenuSuperior/MenuSuperior';
import './CategoriaEspc.css';


export default function CategoriaEspec(props) {//Este é um hook, ele retorna algo a ser lido no site. Mesma coisa que um componente, mas com o código um pouco mais compacto

  //Criação das constantes e seus estados
  const { id } = props.match.params; //Pegando um valor que foi mandado pela url
  const [prod, setProd] = useState(null); //Objeto produto
  const [estado, setEstado] = useState(false);//bool que indica se a api já foi consultada
  const [nulo, setNulo] = useState(true);//bool que indica se o resultado da api foi != null
  const [countconexao, setCountconexao] = useState(0);
  const [erro, setErro] = useState(null);

  async function conexao() { //Função para consultar a api
    var response;
    console.log('consumiu');
    try {
      response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/' + id); //Consulta a api
    } catch (error) {
     
      setErro(error); //Muda o estado da tela para erro se ao consultar a api a resposta não for 200
    }
    const json = await response.json(); //Convertendo o resultado da consulta para json
    if (json != null) { //Verifica se existiu uma resposta da api
      setProd(json.prod);  //Muda o estado de produto
      setNulo(false); //Seta que a api não foi nula
    };

    setEstado(true);//Seta que a api foi consutada
  };
  useEffect( ()=>{ //Este método faz que, após o site ser renderizado, execute a função dentro dele
    conexao();
  }, [countconexao]);//Enquanto countconexao não mudar, este metodo não será executado novamente
  
  if (estado === true) { //Caso a api foi consultada
    if (nulo === false) { //Caso o retorno da api foi != null

      ///Cria um mapa (array) com o html de cada card de produto
      const ProdCod = prod.map((item, indice) => {
        return (

          <div className={`menu-item`} key={indice}>
            <div className="card tamanho" >
              <img className="card-img-top foto" src={`https://anorosa.com.br/Emporio037/storage/${item.foto}`} />
              <div className="sobrefoto" />
              <div className="body card-body ">
                <div className='titulocard'>
                  <h4 className="card-title titulo">COMBO JOHNNIE WALKER GOLD RESERVE 250ML + 2 COPOS DE VIDRO HIGHBALL+ 2 COPOS DE VIDRO HIGHBALL</h4>
                </div>
                <h3 className="card-text"> R${item.preco.toFixed(2).replace(".", ",")}</h3>
                <div className="botao">
                  <Link to={`/Produto/${item.id}`}><p>Comprar</p></Link>
                </div>
              </div>
            </div>
          </div>

        )
      }
      );
      //E retorna o seguinte html para ser exibido no site:
      return (
        <div>
          
          <div className='width'>
            {ProdCod}{/*Esta é a constante onde temos um array com todos os cards (linha 43 a 57)*/}
          </div>
        </div>


      )
    } else {
      //Caso a api não retorne nada é exibido no site:
      return <div>
        <a>Nenhum produto cadastrado nesta categoria :c</a>;
      </div>
    }
  } else {
    //Enquanto a api não é consultada este html é exibido no site:
    return (
      <div>
        
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }


}