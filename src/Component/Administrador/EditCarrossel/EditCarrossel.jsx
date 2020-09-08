import React, { Component } from 'react';
import Admin from '../Admin';
import { Link } from 'react-router-dom';
class EditCarrossel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": 0,
                "fotodestaque": "",
            },
            "status": false
        }
    }
    componentDidMount() {
        fetch("https://anorosa.com.br/Emporio037/api/destaque/list")
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
                    <th scope="col" >Id</th>
                    <th scope="col">Foto em destaque</th>
                    <th scope="col">Funções</th>
                </tr>
            </thead>
        )
        return head;
    }
    tableDestaque = () => {
        const data = this.state.data;
        const End = this.state.status;
        console.log(this.state);
        if (End) {
            const AdminCateg = data.map((item, indice) =>
                (
                    <tr key={indice}>
                        <td>{indice}</td>
                        <td ><img className="img-tamanho mr-3" src={"https://anorosa.com.br/Emporio037/storage/" + item.fotodestaque} /></td>
                        <td><button onClick={() => {
                                const token = localStorage.getItem("JWT_token");
                                fetch("https://anorosa.com.br/Emporio037/api/destaque/delete/"+ item.id, {
                                    method: "delete",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + token
                                    }
                                })
                                    .then(data => data.json().then(data => {
                                        console.log(data);
                                        alert("Foto em destaque removida com sucesso!");
                                        window.location.reload();
                                    }))
                                    .catch(erro => this.setState(erro));
                            }} className="btn btn-danger">Deletar</button></td>
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
                Nenhuma foto em destaque encontrada
            </div>)
        }
    }
    trAddDestaque = () => (
        <tr>
            <td></td>
            <td ></td>
            <td >
                <Link to="/Admin/AdicionarCarousel" className="btn btn-primary">Criar Carrossel</Link>
            </td>
        </tr>
    )
    render() {
        return (
            <div>
                <Admin/>
                <table className="table">
                    {this.headTabela()}
                    {this.trAddDestaque()}
                    {this.tableDestaque()}
                </table>
            </div>
        );
    }
}

export default EditCarrossel;