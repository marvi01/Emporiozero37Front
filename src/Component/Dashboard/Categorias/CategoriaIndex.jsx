import React, { Component } from 'react'; //Importa o método componente e react
import './Categorias.css';
import teste from '../../../imagens/teste.jpeg';

import DataTable from 'react-data-table-component';

class CategoriaIndex extends Component {
    //BOTÕES DE AÇÕES DA LINHA
    actionsButtons() {
        return <div className="btn-group dropleft">
            <button type="button" className="btn dropdown-toggle no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu shadow-sm">
                <button type="button" className="dropdown-item" data-toggle="modal" data-target="#update_category_form">Editar</button>
                <button type="button" className="dropdown-item" data-toggle="modal" data-target="#delete_category_form">Deletar</button>
            </div>
        </div>
    }
    dataTable() {
        
        const data = [
            { id: 1, icone: teste,  nome: 'Vodkas', created_at: '07/09/2020', numProdutos: 102, acoes: this.actionsButtons() },
        ];
        const columns = [
            {
              name: 'Nome',
              selector: 'nome',
              sortable: true,
            },
            {
              name: 'N° de produtos',   
              selector: 'numProdutos',
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
                <img className="category-icon img-thumbnail" src={data.icone} />;
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
                                            <input type="text" className="form-control" id="add_nome" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="add_icone" className="col-sm-2 col-form-label">Icone</label>
                                        <div className="col-auto">
                                            <label>
                                                <div className="create-category-icon-container">
                                                    <input type="file" className="d-none" id="add_icone" />
                                                    <img className="category-icon" alt="" />
                                                </div>
                                            </label>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 small">Tamanho recomendável: 200x150</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Cadastrar</button>
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
                                            <input type="text"  id="update_nome" name="nome" value="Vodka" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="update_icone" className="col-sm-2 col-form-label">Icone</label>
                                        <div className="col-auto">
                                            <label>
                                                <div className="create-category-icon-container">
                                                    <input type="file" className="d-none" id="update_icone" />
                                                    <img className="category-icon" src={teste} alt="" />
                                                </div>
                                            </label>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 small">Tamanho recomendável: 225x150</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Cadastrar</button>
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
                                            <span className="text-muted small">Todos as bebidas pertencentes a essa categoria também serão deletados.</span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row justify-content-center ">
                                    <div className="col-sm-4 mb-3 mb-sm-0">
                                        <button type="button" className="btn btn-block btn-outline-secondary btn-lg" data-dismiss="modal">Cancelar</button>

                                    </div>
                                    <div className="col-sm-4">
                                        <button type="button" className="btn btn-block btn-danger btn-lg">Deletar</button>
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
export default CategoriaIndex; //Aqui retorna o componente