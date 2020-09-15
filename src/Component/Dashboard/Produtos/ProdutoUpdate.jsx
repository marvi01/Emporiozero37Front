
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Produtos.css";

class ProdutoUpdate extends Component {
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
            isApiRequested: false,
            nomeinicial: "",
            categoria: {
                "id": 0,
                "nomecategoria": ""
            },
            prodEdit: {},
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
                this.setState({ produto: data.data, nomeinicial: data.data.nomeprod, isApiRequested: true })
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
                prodEdit: { ...prevState.prodEdit, foto: base64 }
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
        if(event.target.length === 0 || event.target === null){
            var prodEditi = this.state.prodEdit;
            delete prodEditi.name;
            this.setState({prodEdit: prodEditi})
        }else{
            this.setState(prevState=>({
                prodEdit:{...prevState.prodEdit,[name]:value}
            }))
        }
        
        
    }
    handleSelect = event =>{
        const target = event.target;
        const value = target.value;
        this.setState(prevState=>({
            prodEdit:{...prevState.prodEdit,categoria_id:value}
        }))
    }
    handleSubmit = event =>{
        this.setState({inputerror: {'nomeprod': null, 'foto': null, 'preco': null, 'teor': null, 'ml': null, 'quantidade': null, 'categoria_id': null, 'desconto': null}})
        const id = this.props.match.params;
        const token = localStorage.getItem("JWT_token");
        var json;
        console.log(json);
        fetch("https://anorosa.com.br/Emporio037/api/produto/update/"+id.id,{
            method:"put",
            body : JSON.stringify(this.state.prodEdit),
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
                
                this.props.history.goBack();
            }
        }))
        event.preventDefault();
    }
    render() {//Aqui acontece a renderização da página
      
        return (
            <div>
               <div className="dashboard-page-title p-md-5">
                    <h1 className="dashboard-page-title-header">Bebidas</h1>
                    <p className="dashboard-page-title-desc">Cadastre, atualiza ou remova as bebidas ofertadas na loja.</p>
                </div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb px-md-5 mb-0">
                        <li className="breadcrumb-item"><Link to="/dashboard/produtos">Bebidas</Link></li>
                        {this.state.isApiRequested
                            ?<li className="breadcrumb-item">{this.state.produto.nomeprod} {this.state.produto.ml} ML</li>
                            :<li className="breadcrumb-item">Carregando</li>}
                        <li className="breadcrumb-item active" aria-current="page">Editar</li>
                    </ol>
                </nav>
                <div className="dashboard-page-content p-md-5">
                    <div className="row no-gutters">
                        <div className="col-lg-12">
                            <div className="card border-0 shadow">
                                <div className="card-body p-lg-5">
                                    <h2 className="card-title h4 mb-4">Editar bebida</h2>
                                    <div className="form-group row">
                                        <label htmlFor="nome" className="col-lg-2 col-form-label">Nome</label>
                                        <div className="col-lg-8">
                                            <input onChange={this.handleInputChange} type="text" className="form-control" id="nome" name="nomeprod" placeholder={this.state.produto.nomeprod}/>
                                            {this.state.inputerror.nomeprod !== null
                                                ? <span className="error">{this.state.inputerror.nomeprod}</span>
                                                : <span className="small text-muted">Esse será o nome de exibição do produto na loja.</span>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="volume" className="col-lg-2 col-form-label">Volume</label>
                                        <div className="col-lg-4">
                                            <div className="input-group">
                                                <input onChange={this.handleInputChange} type="number" className="form-control" id="volume" name="ml" placeholder={this.state.produto.ml}/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">ml</span>
                                                </div>
                                            </div>
                                            <span className="error">{this.state.inputerror.ml}</span>
                                        </div>

                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="teor" className="col-lg-2 col-form-label">Teor Alcoólico</label>
                                        <div className="col-lg-4">
                                            <div className="input-group">
                                                <input onChange={this.handleInputChange} type="number" className="form-control" id="teor" name="teor" placeholder={this.state.produto.teor}/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span className="error">{this.state.inputerror.teor}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="preco" className="col-lg-2 col-form-label">Preço</label>
                                        <div className="col-lg-4">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">R$</span>
                                                </div>
                                                <input onChange={this.handleInputChange} type="number" className="form-control" id="preco" name="preco" placeholder={this.state.produto.preco}/>
                                            </div>
                                            <span className="error">{this.state.inputerror.preco}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="preco" className="col-lg-2 col-form-label">Quantidade</label>
                                        <div className="col-lg-4">
                                            <div className="input-group">
                                                <input onChange={this.handleInputChange} type="number" className="form-control" id="quantidade" name="quantidade" placeholder={this.state.produto.quantidade}/>
                                            </div>
                                            <span className="error">{this.state.inputerror.quantidade}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="preco" className="col-lg-2 col-form-label">Desconto <span className="small text-muted">(Opcional)</span></label>
                                        <div className="col-lg-4">
                                            <div className="input-group">
                                                <input onChange={this.handleInputChange} type="number" className="form-control" id="desconto" name="desconto" placeholder={this.state.produto.desconto}/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span className="error">{this.state.inputerror.desconto}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="preco" className="col-lg-2 col-form-label">Categoria</label>
                                        <div className="col-lg-4">
                                            <select onChange={this.handleSelect} id="inputState" class="form-control">
                                                <option defaultValue={this.state.produto.categoria_id}>Selecione uma categoria</option>
                                                {this.categMap()}
                                            </select>
                                            <span className="error">{this.state.inputerror.categoria_id}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="descricao" className="col-lg-2 col-form-label">Descrição <span className="small text-muted">(Opcional)</span></label>
                                        <div className="col-lg-8">
                                            <textarea name="descricao" id="descricao" className="form-control" rows="10" placeholder={this.state.produto.descricao}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-sm-8 offset-lg-2">
                                            <div className="alert callout callout-info alert-dismissible fade show" role="alert">
                                                <h4>Dica</h4>
                                                <p className="small">Para obter uma boa exibição na loja, garanta que a foto atenda aos requisitos abaixo:</p>
                                                <ul className="small mb-0">
                                                    <li>Proporção de 1/3 entre a largura e altura</li>
                                                    <li className="text-muted" style={{ listStyleType: 'none' }}>Tamanho recomendado: 160x480</li>
                                                    <li>Fundo transparente</li>
                                                    <li>Imagem devidamente recordada, sem margens</li>
                                                </ul>
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <label htmlFor="foto" className="col-lg-2 col-form-label">Foto de exibição</label>
                                        <div className="col-lg-8">
                                            <label>
                                                <div className="create-product-image-container">
                                                    <input onChange={(e) => this.onChangeImg(e.target.files[0])} type="file" className="d-none" id="foto" />
                                                    {this.state.prodEdit.foto
                                                        ? <img className="product-image" alt="" src={this.state.prodEdit.foto} />
                                                        : <img className="product-image" alt="" src={this.state.produto.foto} />
                                                    }
                                                </div>
                                                <span className="error">{this.state.inputerror.foto}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="offset-lg-2">
                                        <Link to="/dashboard/produtos" className="btn btn-outline-secondary mr-2">
                                            Cancelar
                                            </Link>
                                        <button onClick={this.handleSubmit} className="btn btn-primary">
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        );
    }
}
export default ProdutoUpdate; //Aqui retorna o componente