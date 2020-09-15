import React, { Component } from 'react'; //Importa o método componente e react
import './Categorias.css';
import teste from '../../../imagens/teste.jpeg';

import DataTable from 'react-data-table-component';

class CategoriaIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categ: [],
            isApiRequested: false,
            type: null,
            selectedItemId: null,
            selectedItem: {
                nomecategoria: null,
                img: null
            },
            editCateg: {
                img: null
            },
            addCateg: {},
            addInputError: {
                nomecategoria: null,
                img: null
            },
            editInputError: {
                nomecategoria: null,
                img: null
            },
        }
    }
    componentDidMount() {

        const requestOptions = {
            method: 'get',
        };
        fetch("http://anorosa.com.br/Emporio037/api/categoria/list/ProdNumb", requestOptions)
            .then(data => data.json().then(data => {
                this.setState({ categ: data.data, isApiRequested: true });
            }))
            .catch(erro => this.setState(erro))
    }

    //BOTÕES DE AÇÕES DA LINHA
    actionsButtons(id, object) {
        return <div className="btn-group dropleft">
            <button type="button" className="btn dropdown-toggle no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu shadow-sm">
                <button onClick={() => { this.setState({ selectedItem: object }) }} type="button" className="dropdown-item" data-toggle="modal" data-target="#update_category_form">Editar</button>
                <button onClick={() => { this.setState({ selectedItemId: id }) }} type="button" className="dropdown-item" data-toggle="modal" data-target="#delete_category_form">Deletar</button>
            </div>
        </div>
    }
    dataTable() {
        var data = [];
        if (this.state.isApiRequested) {
            var categoria = this.state.categ;
            for (var i = 0; i < categoria.length; i++) {
                categoria[i]['acoes'] = this.actionsButtons(categoria[i].id, categoria[i]);
            }
            data = categoria;
        }
        const columns = [
            {
                name: 'Nome',
                selector: 'nomecategoria',
                sortable: true,
            },
            {
                name: 'N° de produtos',
                selector: 'quantProd',
                sortable: true,
            },
            {
                name: 'Data de cadastro',
                selector: 'created_at',
                sortable: true,
            },
            {
                name: 'Ações',
                selector: 'acoes',
            },
        ];
        //BOTÕES DE AÇÃO DO CABEÇALHO
        const actions = <button type="button" className="btn btn-primary my-3 my-sm-0" data-toggle="modal" data-target="#add_category_form"><i className="fas fa-plus mr-2"></i> Novo</button>


        //ELEMENTO DE EXPANSÃO DA LINHA
        const ExpandableComponent = ({ data }) =>
            <div className="p-3 bg-light">
                <label className="small d-block mb-2">Icone</label>
                <img className="category-icon img-thumbnail" src={"http://anorosa.com.br/Emporio037/storage/" + data.img} />
            </div>;

        return <DataTable
            title="Categorias cadastradas"
            pagination={true}
            actions={actions}
            columns={columns}
            data={data}
            expandableRows
            expandableRowsComponent={<ExpandableComponent />} />
    }


    render() {//Aqui acontece a renderização da página

        return (
            <div>
                <div className="dashboard-page-title p-md-5">
                    <h1 className="dashboard-page-title-header">Categorias</h1>
                    <p className="dashboard-page-title-desc">Cadastre, atualiza ou remova as categorias de bebidas da loja.</p>
                </div>
                <div className="dashboard-page-content p-md-5">
                    <div className="row no-gutters">
                        <div className="col-lg-12">
                            <div className="card border-0 shadow">
                                <div className="card-body">
                                    {this.dataTable()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*   MODAL DE CADASTRO */}
                <div className="modal fade" id="add_category_form" tabIndex="-1" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h5 className="modal-title mb-4">Cadastrar categoria</h5>
                                <form action="">
                                    <div className="form-group row">
                                        <label htmlFor="add_nome" className="col-sm-2 col-form-label">Nome</label>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={this.cadastrarInputChange} name="nomecategoria" className="form-control" id="add_nome" />
                                            <span className="error">{this.state.addInputError.nomecategoria}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="add_icone" className="col-sm-2 col-form-label">Icone</label>
                                        <div className="col-auto">
                                            <label>
                                                <div className="create-category-icon-container">
                                                    <input onChange={(e) => this.onChangeImg(e.target.files[0])} type="file" className="d-none" id="add_icone" />
                                                    <img src={this.state.addCateg.img} className="category-icon" alt="" />
                                                </div>
                                            </label>
                                            <span className="error">{this.state.addInputError.img}</span>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 small">Tamanho recomendável: 200x150</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => this.setState({ addInputError: { nomecategoria: null, img: null } })} type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" onClick={this.cadastrarCateg} className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*   MODAL DE ATUALIZAÇÃO */}
                <div className="modal fade" id="update_category_form" tabIndex="-1" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h5 className="modal-title mb-4">Atualizar Vodka</h5>
                                <form action="">
                                    <div className="form-group row">
                                        <label htmlFor="update_nome" className="col-sm-2 col-form-label">Nome</label>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={this.editarInputChange} id="update_nome" name="nomecategoria" placeholder={this.state.selectedItem.nomecategoria} className="form-control" />
                                            <span className="error">{this.state.editInputError.nomecategoria}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="update_icone" className="col-sm-2 col-form-label">Icone</label>
                                        <div className="col-auto">
                                            <label>
                                                <div className="create-category-icon-container">
                                                    <input onChange={(e) => this.onEditImg(e.target.files[0])} type="file" className="d-none" id="update_icone" />
                                                    {this.state.editCateg.img
                                                        ? <img className="category-icon" src={this.state.editCateg.img} alt="" />
                                                        : <img className="category-icon" src={"http://anorosa.com.br/Emporio037/storage/" + this.state.selectedItem.img} alt="" />
                                                    }
                                                </div>
                                                <span className="error">{this.state.editInputError.img}</span>
                                            </label>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 small">Tamanho recomendável: 225x150</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => {
                                    this.setState({ selectedItem: null, editCateg: { img: null } })
                                }} type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                                <button onClick={this.editarCateg}type="button" className="btn btn-primary">Editar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*   MODAL DELETE */}
                <div className="modal fade" id="delete_category_form" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body  p-5">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="row mb-4 mb-sm-5">
                                        <div className="col-sm-auto">
                                            <div className="modal-icon mb-3 mb-sm-0">
                                                <i className="fas fa-exclamation"></i>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h5 className="modal-title mb-2">Atenção</h5>
                                            <p className="mb-2">Tem certeza que deseja <strong>deletar a categoria testes</strong>? Essa operação é irreversível.</p>
                                            <span className="text-muted small">Todas bebidas pertencentes a essa categoria também serão deletados.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row justify-content-center ">
                                    <div className="col-sm-4 mb-3 mb-sm-0">
                                        <button onClick={() => this.setState({ selectedItemId: null })} type="button" className="btn btn-block btn-outline-secondary btn-lg" data-dismiss="modal">Cancelar</button>
                                    </div>
                                    <div className="col-sm-4">
                                        <button onClick={() => {
                                            const token = localStorage.getItem("JWT_token");
                                            fetch("https://anorosa.com.br/Emporio037/api/categoria/delete/" + this.state.selectedItemId, {
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
                                        }} type="button" className="btn btn-block btn-danger btn-lg">Deletar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    async onChangeImg(file) {
        var base64 = null;
        var reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onload = await function () {
            base64 = reader.result;
            this.setState(prevState => ({
                addCateg: { ...prevState.addCateg, img: base64 }
            }))
        }.bind(this);
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    }
    cadastrarInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            addCateg: { ...prevState.addCateg, [name]: value }
        }));
    };
    cadastrarCateg = event => {
        const token = localStorage.getItem("JWT_token")
        console.log(token);
        fetch("http://anorosa.com.br/Emporio037/api/categoria/add", {
            method: "post",
            body: JSON.stringify(this.state.addCateg),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(data => data.json().then(data => {
            if (data.status !== true) {
                if (data.error === 1) {//Input error code
                    this.setState({ addInputError: data.errors })
                } else {
                    alert(data.error)
                }
            } else {
                this.setState({
                    addInputError: {
                        nomecategoria: null,
                        img: null
                    }
                })
                window.location.reload();
            }
        })).catch(erro => this.setState({ erro: erro }));
        event.preventDefault();
    }

    async onEditImg(file) {
        var base64 = null;
        var reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onload = await function () {
            base64 = reader.result;
            this.setState(prevState => ({
                editCateg: { ...prevState.editCateg, img: base64 }
            }))
        }.bind(this);
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    }
    editarInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            editCateg: { ...prevState.editCateg, [name]: value }
        }));
    };

    editarCateg = event => {
        const id = this.props.match.params;
        const token = localStorage.getItem("JWT_token");
        console.log("8=====D");
        var json;
        if (this.state.editCateg.img === null) {
            json = {
                "nomecategoria": this.state.editCateg.nomecategoria
            }
        } else {
            json = this.state.editCateg;
        }
        console.log(json);
        fetch("https://anorosa.com.br/Emporio037/api/categoria/update/" + this.state.selectedItem.id, {
            method: "put",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(data => data.json().then(data => {
                if (data.status !== true) {
                    if (data.error === 1) {//Input error code
                        this.setState({ editInputError: data.errors })
                    } else {
                        alert(data.error)
                    }
                } else {
                    this.setState({
                        editInputError: {
                            nomecategoria: null,
                            img: null
                        }
                        
                    });
                    window.location.reload();
                }
            })).catch(erro => this.setState({ erro: erro }));
        event.preventDefault();
    };
}
export default CategoriaIndex; //Aqui retorna o componente