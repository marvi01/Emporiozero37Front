import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuSuperior from '../MenuSuperior/MenuSuperior';
import './CategoriaEspc.css';
export default function CategoriaEspec(props) {

  const { id } = props.match.params;
  const [prod, setProd] = useState(null);
  const [estado, setEstado] = useState(false);
  const [nulo, setNulo] = useState(true);
  const [erro, setErro] = useState(null);

  async function conexao() {
    var response;
    try {
      response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/' + id);
    } catch (error) {
     
      setErro(error);
    }
    const json = await response.json();
    if (json != null) {
      setProd(json.prod);
      setNulo(false);
    };

    setEstado(true);
  };
  if(estado === false){
    conexao();
  }

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
                  <Link to={`Produto/${item.id}`}><p>Comprar</p></Link>
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
       
        <a>Nenhum produto cadastrado nesta categoria :c</a>;
      </div>
    }
  } else {
    return (
      <div>
        
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }


}