import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Admin from '../Admin';
import './Admin.css'

class ListProd extends Component {
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
                "quantidade": 0
                , "categoria_id": 0,
                "created_at": "",
                "updated_at": ""
            },
            status: false,
            next: false,
            prev:false
        }
    }


    componentDidMount() {
        fetch("http://anorosa.com.br/Emporio037/api/produto/list/alphabetic")
            .then(data => data.json().then(data => {
                this.setState({ produto: data.data });
                this.setState({ status: data.total});
                this.setState({next:data.next_page_url});
                this.setState({prev:data.prev_page_url});
                console.log(data.total);
            }))
            .catch(erro => this.setState(erro));
    }
    headTabela() {
        const head = (
            <thead className="thead bg-header text-dark-brown">
                <tr>
                    <th scope="col" >Foto</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Valor</th>
                    <th scope="col">quantidade</th>
                    <th scope="col">Desconto</th>
                    <th scope="col">Funções</th>
                </tr>
            </thead>
        )
        return head;
    }
    tableProduto = () => {
        const Prod = this.state.produto;
        const End = this.state.status;
        console.log(this.state);
        if (End>0) {
            const ProdutoCarrinho = Prod.map((item, indice) =>
                (

                    <tr key={indice}>
                        <td><img src={"https://anorosa.com.br/Emporio037/storage/"+item.foto} className="img-tamanho mr-3" alt=""/></td>
                        <td >{item.nomeprod}</td>
                        <td >R${item.preco.toFixed(2).replace(".", ",")}</td>
                        <td >{item.quantidade}</td>
                        <td >{item.desconto + "%"}</td>
                        <td >
                            <Link to={"/Admin/AtualizarProduto/"+item.id} className="btn btn-warning">Editar</Link>
                            <button onClick={() => {
                                const token = localStorage.getItem("JWT_token");
                                fetch("https://anorosa.com.br/Emporio037/api/produto/delete/"+ item.id, {
                                    method: "delete",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + token
                                    }
                                })
                                    .then(data => data.json().then(data => {
                                        console.log(data);
                                        alert("Deletado com sucesso");
                                        window.location.reload();
                                    }))
                                    .catch(erro => this.setState(erro));
                            }} className="btn btn-danger">Deletar</button>
                        </td>
                    </tr>
                )
            )
            return ProdutoCarrinho
        } else if (!this.state.status) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
        } else {
            return (<div>
                Nenhum Endreço encontrado
            </div>)
        }
    }
    trAddProd = () => (
        <tr>
            <td></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td >
                <Link to="/Admin/AdicionaProduto" className="btn btn-primary">Criar Produto</Link>
            </td>
        </tr>
    )
    paginas =(url)=>{
        fetch(url)
        .then(data => data.json().then(data => {
            this.setState({ produto: data.data });
            this.setState({ status: data.total});
            this.setState({next:data.next_page_url});
            this.setState({prev:data.prev_page_url});
            console.log(data.total);
        }))
        .catch(erro => this.setState(erro));
    }
    NextPrev=()=>{
        return(
            <tr>
            <td><button onClick={()=>{
                if(this.state.prev!==null){
                this.setState({status:false}); 
                this.paginas(this.state.prev)
                }
            }} className="btn btn-primary">Anterior</button></td>
            <td ><button onClick={()=>{
                if(this.state.next!==null){
                this.setState({status:false}); 
                this.paginas(this.state.next)
                }
            }} className="btn btn-primary">Proxima</button></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td >

            </td>
        </tr> 
        )
    }
    render() {
        return (
            <div>
                <Admin />
                <table className="table">
                    {this.headTabela()}
                    {this.trAddProd()}
                    {this.tableProduto()}
                    {this.NextPrev()}
                </table>
            </div>
        );
    }
}

export default ListProd;