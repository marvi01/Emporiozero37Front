import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderMeio from '../HeaderMeio/HeaderMeio';
import './CategoriaEspc.css';


export default function CategoriaEspec(props) {//Este é um hook, ele retorna algo a ser lido no site. Mesma coisa que um componente, mas com o código um pouco mais compacto

  //Criação das constantes e seus estados
  const { id } = props.match.params; //Pegando um valor que foi mandado pela url
  const [prod, setProd] = useState(null); //Objeto produto
  const [estado, setEstado] = useState(false);//bool que indica se a api já foi consultada
  const [nulo, setNulo] = useState(true);//bool que indica se o resultado da api foi != null
  const [countconexao, setCountconexao] = useState(0);
  const [erro, setErro] = useState(null);

  async function conexao() { 
    var response;
    console.log('consumiu');
    try {
      response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/' + id); 
    } catch (error) {

      setErro(error); 
    }
    const json = await response.json(); 
    if (json.prod != null) {
      setProd(json.prod);  
      setNulo(false); 
    };

    setEstado(true);
  };
  useEffect(() => {
    setEstado(false);
    setNulo(true);
    conexao();
  }, [id]);

  if (estado === true) { 
    if (nulo === false) { 

      
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
     
      return (
        <div>

          <div className='width'>
            {ProdCod}
          </div>
        </div>


      )
    } else {
   
      return <div>
        <a>Nenhum produto cadastrado nesta categoria :c</a>
      </div>
    }
  } else {
   
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