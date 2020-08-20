import React, { Component } from 'react';
import Admin from '../Admin';
import { Link } from 'react-router-dom';

class AdminDestaque extends Component {
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
            status: false
        }
    }


    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/produto/list")
            .then(data => data.json().then(data => {
                this.setState({ produto: data.data })
                this.setState({ status: data.status })
                console.log(data);
            }))
            .catch(erro => this.setState(erro));
    }
    headTabela() {
        const head = (
            <thead className="thead bg-header text-dark-brown">
                <tr>
                    <th scope="col" >Destaque</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Valor</th>
                    <th scope="col">quantidade</th>
                    <th scope="col">Desconto</th>
                </tr>
            </thead>
        )
        return head;
    }
    tableProduto = () => {
        const Prod = this.state.produto;
        const End = this.state.status;
        console.log(this.state);
        if (End) {
            const ProdutoCarrinho = Prod.map((item, indice) => {
                let desta;
                console.log(item.destaque);
                if(item.destaque==1){
                    desta=(
                        <input onChange={()=>{
                            if(item.destaque===1){
                                fetch("http://anorosa.com.br/Emporio037/api/produto/removerdestaque/"+item.id)
                            }else if(item.destaque===0){
                                fetch("http://anorosa.com.br/Emporio037/api/produto/removerdestaque/"+item.id)
                            }
                        }}  type="checkbox" defaultChecked/>
                    )
                }else{
                    desta=(
                        <input onChange={()=>{
                            if(item.destaque===1){
                                fetch("http://anorosa.com.br/Emporio037/api/produto/removerdestaque/"+item.id)
                                .then(data => data.json().then(data => {
                                    console.log(data);
                                    //window.location.reload()
                                }))
                                .catch(erro => this.setState(erro));
                            }else if(item.destaque===0){
                                fetch("http://anorosa.com.br/Emporio037/api/produto/destaque/"+item.id)
                                .then(data => data.json().then(data => {
                                    console.log(data);
                                    //window.location.reload()
                                }))
                                .catch(erro => this.setState(erro));
                            }
                        }} type="checkbox" />
                    )
                }
                return (
                    <tr key={indice}>
                        <td>{desta}</td>
                        <td >{item.nomeprod}</td>
                        <td >R${item.preco.toFixed(2).replace(".", ",")}</td>
                        <td >{item.quantidade}</td>
                        <td >{item.desconto + "%"}</td>
                    </tr>
                )
            }
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
    render() {
        return (
            <div>
                <Admin />
                <table className="table">
                    {this.headTabela()}
                    {this.tableProduto()}
                </table>
            </div>
        );
    }
}

export default AdminDestaque;