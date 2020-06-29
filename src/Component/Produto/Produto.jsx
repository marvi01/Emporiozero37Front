/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Produto.css';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
 
 
/*const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
 */
const selected = 'false';
 
class Produto extends Component {

  constructor(props) {
    var cat = props.idcat;
    super(props);
    this.state = {
      idcat: cat,
      nulo: true,
      estado: false,
      prod: [{
        id: 0,
        nomeprod: "",
        descricao: "",
        foto: "",
        preco: 0,
        teor: 0,
        ml: 0,
        quantidade: 0,
        categoria_id: 0,
        created_at: "",
        updated_at: ""
      }],
      status: false,
    };
  };
  async componentDidMount() {
    var response;
    var idcat = this.state.idcat;
    try {
      response = await fetch('https://anorosa.com.br/Emporio037/api/categoria/produtos/' + idcat, { method: 'POST' });

    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response.json();
    if (json != null) {
      this.setState({ prod: json, nulo: false });
    }
    
    this.setState({ estado: true });


  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }
  exibeProduto() {
    const { prod } = this.state.prod;
    if (this.state.estado !== false) {
      if (this.state.nulo !== true) {
        const ProdCod = prod.map((item, indice) => {
         
          return (
            <div className={`menu-item ${selected ? 'active' : ''}`} key={indice}>
              <div  className="card tamanho" >
                <img className="card-img-top foto" src={`https://anorosa.com.br/Emporio037/storage/${item.foto}`} />
                <div className="sobrefoto"/>
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
        )
        
        return (
          <ScrollMenu
          data={ProdCod}
          onSelect={null}
          alignCenter={false}
          wheel = {false}
          useButtonRole = {false}
          
          />  
          );
      } else {
        return (
          <div className="alert alert-light">
            <p>Nenhum produto encontrado :(</p>
          </div>)
      }
    }
  }
  

  //
  render() {
    return (

      <div className=" container">

        <div>{this.exibeErro() || this.exibeProduto()}</div>
      </div>
    );
  };


};
export default Produto;