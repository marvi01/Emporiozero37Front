import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProdutoEspc extends Component {
    constructor(props) {
        super(props);
        this.state ={
            "data": {
                "id": 0,
                "nomeprod": "",
                "descricao": "",
                "foto": "",
                "preco":0 ,
                "teor":0 ,
                "ml":0 ,
                "quantidade": 0,
                "categoria_id": 0,
                "created_at": "",
                "updated_at": ""
            },
            "status": false
        }
    }
    async componentDidMount() {
        var response;
        const { id } = this.props.match.params;
    
          try{
            response = await fetch(`https://anorosa.com.br/Emporio037/api/Produto/` + id);
        
          } catch (error){
            console.log(error);
            this.setState({error})
          }       
          const json = await response.json();
          if(json != null){
            this.setState({data:json, nulo: false}) 
          }
          this.setState({estado : true});}
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
      formulario() {
        console.log(this.state.data);
        const form  = (
            <div>
            <p>{this.state.data.nomeprod}</p>
          </div>
        )
        return form
      }
    render() {
        return (
            <div>
                {this.formulario()}
                {this.state.data.preco}
                
            </div>
        );
    }
}

export default ProdutoEspc;