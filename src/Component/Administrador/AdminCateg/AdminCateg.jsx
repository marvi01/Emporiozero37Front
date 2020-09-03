import React, { Component } from 'react';
import Admin from '../Admin';
import { Link } from 'react-router-dom';
import '../AdminProd/Admin.css'

class AdminCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": 0,
                "nomecategoria": ""
            },
            "status": false
        }
    }

    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/categoria/list")
            .then(data => data.json().then(data => {
                this.setState({ data: data.data });
                this.setState({ status: data.status });
                console.log(this.state.data);
            }))
            .catch(erro => this.setState(erro));

    }
    headTabela() {
        const head = (
            <thead className="thead bg-header text-dark-brown">
                <tr>
                    <th scope="col" >Foto</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Funções</th>
                </tr>
            </thead>
        )
        return head;
    }
    tableProduto = () => {
        const data = this.state.data;
        const End = this.state.status;
        console.log(this.state);
        if (End) {
            const AdminCateg = data.map((item, indice) =>
                (
                    <tr key={indice}>
                        <td><img className="img-tamanho mr-3" src={"https://anorosa.com.br/Emporio037/storage/" + item.img} /></td>
                        <td >{item.nomecategoria}</td>
                        <td >
                            <Link to={"/Admin/AtualizarCategoria/" + item.id} className="btn btn-warning">Editar</Link>
                            <button onClick={() => {
                                let confirm = window.confirm("Ao deletar esta categoria você deletará todos os produtos contidos nela.");
                                if (confirm) {
                                    const token = localStorage.getItem("JWT_token");
                                    fetch("https://anorosa.com.br/Emporio037/api/categoria/delete/" + item.id, {
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
                                }
                            }} className="btn btn-danger">Deletar</button>
                        </td>
                    </tr>
                )
            )
            return AdminCateg
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
            <td >
                <Link to="/Admin/AdicionarCategoria" className="btn btn-primary">Criar Categoria</Link>
            </td>
        </tr>
    )
    render() {
        return (
            <div>
                <Admin />
                <table className="table">
                    {this.headTabela()}
                    {this.trAddProd()}
                    {this.tableProduto()}
                </table>
            </div>
        );
    }
}

export default AdminCateg;