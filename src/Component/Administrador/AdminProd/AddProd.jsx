import React, { Component } from 'react';
import Admin from '../Admin';

class AddProd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produto: {
                "id": 0,
                "nomeprod": "",
                "descricao": "",
                "desconto": 0,
                "destaque": 0,
                "foto": "",
                "preco": 0,
                "teor": 0,
                "ml": 0,
                "quantidade": 0,
                "categoria_id": 0
            },
            categoria:{
                "id":0,
                "nomecategoria":""
            },
            status:false
        }
    }
    componentDidMount(){
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
        .then(data => data.json().then(data => {
            this.setState({ categoria: data.data })
            this.setState({ status: data.status })
        }))
        .catch(erro => this.setState(erro));
    }
    render() {
        return (
            <div>
                <Admin/>
                {console.log(this.state)}
                Criar o Formulario para cadastrar Produtos
            </div>
        );
    }
}

export default AddProd;