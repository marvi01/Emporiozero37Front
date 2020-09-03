import React, { Component } from 'react';
import Admin from '../Admin';
import './Admin.css';

class EditProd extends Component {
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
            nomeinicial: "",
            categoria: {
                "id": 0,
                "nomecategoria": ""
            },
            inputerror: {
                'nomeprod': null,
                'foto': null,
                'preco': null,
                'teor': null,
                'ml': null,
                'quantidade': null,
                'categoria_id': null,
                'desconto': null
            },
            status: false
        }
        
        
    }
    componentDidMount() {
        const id = this.props.match.params;
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
            .then(data => data.json().then(data => {
                this.setState({ categoria: data.data })
                this.setState({ status: data.status })
            }))
            .catch(erro => this.setState(erro));
            fetch("https://anorosa.com.br/Emporio037/api/produto/"+id.id)
            .then(data => data.json().then(data => {
                this.setState({ produto: data.data, nomeinicial: data.data.nomeprod })
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
    async onChangeImg(file) {
        var base64 = null;
        var reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onload = await function () {
            base64 = reader.result;
            this.setState(prevState => ({
                produto: { ...prevState.produto, foto: base64 }
            }))

        }.bind(this);
        reader.onerror = function (error) {

            console.log('Error: ', error);
        };

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
        const id = this.props.match.params;
        const token = localStorage.getItem("JWT_token");
        var json;
        
        if(this.state.nomeinicial === this.state.produto.nomeprod){
            json = {
                "descricao": this.state.produto.descricao,
                "desconto": this.state.produto.desconto,
                "destaque": this.state.produto.destaque,
                "foto": this.state.produto.foto,
                "preco": this.state.produto.preco,
                "teor": this.state.produto.teor,
                "ml": this.state.produto.ml,
                "quantidade": this.state.produto.quantidade,
                "categoria_id": this.state.produto.categoria_id
            }
        }else{
            json = this.state.produto;
        }
        console.log(json);
        fetch("https://anorosa.com.br/Emporio037/api/produto/update/"+id.id,{
            method:"put",
            body : JSON.stringify(json),
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+token
            }
        }).then(data => data.json().then(data => {
            console.log(data);
            if (data.status !== true) {
                if (data.error === 1) {//Input error code
                    alert('Erro ao alterar produto.')
                    this.setState({ inputerror: data.errors })
                } else {
                    alert(data.error)
                }
            } else {
                this.setState({inputerror: {'nomeprod': null, 'foto': null, 'preco': null, 'teor': null, 'ml': null, 'quantidade': null, 'categoria_id': null, 'desconto': null}})
                alert("Produto alterado com sucesso!!!");
            }
        }))
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nome do Produto</label>
                            <input onChange={this.handleInputChange} defaultValue={this.state.produto.nomeprod} name="nomeprod" type="text" class="form-control" id="inputText1" />
                            <span className="error">{this.state.inputerror.nomeprod}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Descrição</label>
                            <input onChange={this.handleInputChange} defaultValue={this.state.produto.descricao} name="descricao" type="text" class="form-control" id="inputPassword4" />
                            <span className="error">{this.state.inputerror.descricao}</span>
                        </div>
                    </div><div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputCity">Preço</label>
                            <input onChange={this.handleInputChange} value={this.state.produto.preco} name="preco" type="number" class="form-control" id="inputCity" />
                            <span className="error">{this.state.inputerror.preco}</span>
                        </div>
                        <div class="form-group col-md-2">
                            <label  for="inputState">Teor</label>
                            <input onChange={this.handleInputChange} value={this.state.produto.teor} name="teor" type="number" id="inputState" class="form-control"/>
                            <span className="error">{this.state.inputerror.teor}</span>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Quantidade</label>
                            <input onChange={this.handleInputChange} value={this.state.produto.quantidade} name="quantidade" type="number" class="form-control" id="inputZip" />
                            <span className="error">{this.state.inputerror.quantidade}</span>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Desconto</label>
                            <input onChange={this.handleInputChange} value={this.state.produto.desconto} name="desconto" type="number" class="form-control" id="inputZip" />
                            <span className="error">{this.state.inputerror.desconto}</span>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">ML</label>
                            <input onChange={this.handleInputChange} value={this.state.produto.ml} name="ml" type="number" class="form-control" id="inputZip" />
                            <span className="error">{this.state.inputerror.ml}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputState">Categorias</label>
                            <select onChange={this.handleSelect} id="inputState" class="form-control">
                                <option defaultValue={this.state.produto.categoria_id}>Escolha uma Categoria</option>
                               
                            </select>
                            <span className="error">{this.state.inputerror.categoria_id}</span>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Imagem</label>
                            <input onChange={(e) => this.onChangeImg(e.target.files[0])} name="foto" type="file" class="form-control" id="inputZip" />
                            <span className="error">{this.state.inputerror.foto}</span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Alterar</button>
                </form>
            </div>
        );
    }
}

export default EditProd;