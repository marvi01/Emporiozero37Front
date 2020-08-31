import React, { Component } from 'react';
import Admin from '../Admin';
import { data } from 'jquery';
import { Redirect } from 'react-router-dom';

class AddProd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produto: {

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
            categoria: {
                "id": 0,
                "nomecategoria": ""
            },
            status: false
        }
    }
    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
            .then(data => data.json().then(data => {
                this.setState({ categoria: data.data })
                this.setState({ status: data.status })
            }))
            .catch(erro => this.setState(erro));
    }
    categMap =()=>{
        const status = this.state.status;
        const categ = this.state.categoria;

        if(status){
            const Option = categ.map((item,indice)=>(
            <option key={indice} value ={item.id}>{item.nomecategoria}</option>
            ))
                return Option
        }else if(!status){

        }else{

        }
    }
    handleInputChange = event =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState=>({
            produto:{...prevState.produto,[name]:value}
        }))
    }
    handleSelect = event =>{
        const target = event.target;
        const value = target.value;
        this.setState(prevState=>({
            produto:{...prevState.produto,categoria_id:value}
        }))
    }
    handleSubmit = event =>{
        const token = localStorage.getItem("JWT_token");
        
        fetch("https://anorosa.com.br/Emporio037/api/produto/add",{
            method:"post",
            body :JSON.stringify(this.state.produto),
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+token
            }
        }).then(data=>{
                if(data.ok){
                    alert("Cadastrado com sucesso");
                }
        })
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <Admin />
                {console.log(this.state.produto)}
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nome do Produto</label>
                            <input onChange={this.handleInputChange} name="nomeprod" type="text" class="form-control" id="inputText1" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input onChange={this.handleInputChange} name="descricao" type="text" class="form-control" id="inputPassword4" />
                        </div>
                    </div><div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputCity">Preço</label>
                            <input onChange={this.handleInputChange} name="preco" type="text" class="form-control" id="inputCity" />
                        </div>
                        <div class="form-group col-md-2">
                            <label  for="inputState">Teor</label>
                            <input onChange={this.handleInputChange} name="teor" type="number" id="inputState" class="form-control"/>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Quantidade</label>
                            <input onChange={this.handleInputChange} name="quantidade" type="number" class="form-control" id="inputZip" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Desconto</label>
                            <input onChange={this.handleInputChange} name="desconto" type="number" class="form-control" id="inputZip" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">ML</label>
                            <input onChange={this.handleInputChange} name="ml" type="number" class="form-control" id="inputZip" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputState">Categorias</label>
                            <select onChange={this.handleSelect} id="inputState" class="form-control">
                                <option defaultValue="0">Escolha uma Categoria</option>
                                {this.categMap()}
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Imagem</label>
                            <input onChange={this.handleInputChange} name="foto" type="file" class="form-control" id="inputZip" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
        );
    }
}

export default AddProd;