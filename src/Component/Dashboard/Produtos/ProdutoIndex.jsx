import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import vodka from '../../../imagens/vodka2.png';
import DataTable from 'react-data-table-component';
import './Produtos.css'


class ProdutoIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prod: [{}],
            isApiRequested: false,
            selectedItemId: null,
            selectedItem: [],
        }
    }
    componentDidMount() {

        const requestOptions = {
            method: 'get',
        };
        fetch("http://anorosa.com.br/Emporio037/api/produto/list/alphabetic", requestOptions)
            .then(data => data.json().then(data => {
                console.log(data);
                if(data.status){
                    this.setState({ prod: data.data, isApiRequested: true });
                }             
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
                <Link to={`/dashboard/produtos/${id}/edit`} className="dropdown-item" href="#">Editar</Link>
                <button onClick={()=>this.setState({selectedItemId: id})}type="button" className="dropdown-item" data-toggle="modal" data-target="#delete_product_form">Deletar</button>
                <a className="dropdown-item" href="#">Gerenciar desconto</a>
            </div>
        </div>
    }
    productPrice(value, descount) {
        if(descount != 0) {
            return  <div>
                        <span className="old-price mr-2">{value}</span>
                        <span>R$ { value -  (value * (descount / 100)) }</span>
                    </div>
        } else {
            return <span>R$ {value}</span>
        }
   
    }
    dataTable() {
        //ARRAY DE BEBIDAS PARA LISTAGEM
       /* const data = [
            { id: 1, imagem: vodka, descricao: "Testando", nome: 'Vodkas', volume: '700 ml', preco: this.productPrice(120, 20), desconto: '20%', teor: '37%', acoes: this.actionsButtons(1)},
        ];*/
        var data = [];
        if (this.state.isApiRequested) {
            var produto = this.state.prod;
            for (var i = 0; i < produto.length; i++) {
                produto[i]['acoes'] = this.actionsButtons(produto[i].id, produto[i]);
            }
            data = produto;
        }

        //BOTÕES DE CADASTRP
        const actions = <Link to="/dashboard/produtos/create" className="btn btn-primary table-action"><i className="fas fa-plus mr-2"></i> Novo</Link>;

        //COLUNAS DA TABELA
        const columns = [
            {
                name: 'Nome',
                selector: 'nomeprod',
                sortable: true,
                },
                {
                name: 'Volume',
                selector: 'ml',
                sortable: true,
                },
                {
                name: 'Preço',
                selector: 'preco',
                sortable: true,
                },
                {
                name: 'Desconto',
                selector: 'desconto',
                sortable: true,
                },
                {
                name: 'Ações',
                selector: 'acoes',
                sortable: false,
                },
           
        ];

        //ELEMENTO DE EXPANSÃO DA LINHA
        const ExpandableComponent = ({ data }) => 
            <div className="row no-gutters p-3 bg-light">
                <div className="col-sm-auto mr-3">
                    <label className="small">Imagem</label>
                    <div className="product-image-container img-thumbnail">
                        <img className="product-image" src={"http://anorosa.com.br/Emporio037/storage/"+data.foto} />
                    </div>
                </div>
                <div className="col">
                    <label className="small mt-3 mt-sm-4">Teor Alcoólico</label>
                    <p>{data.teor}</p>
                    <label className="small">Descrição</label>
                    <p>{data.descricao}</p>
                </div>
            </div>;

        //DATATABLE
        return <DataTable 
        title="Bebidas cadastradas" 
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
                    <h1 className="dashboard-page-title-header">Bebidas</h1>
                    <p className="dashboard-page-title-desc">Cadastre, atualiza ou remova as bebidas em oferta na loja.</p>
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
                 {/*   MODAL DELETE */}
                 <div className="modal fade" id="delete_product_form" tabIndex="-1">
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
                                            <p className="mb-0">Tem certeza que deseja <strong>deletar a bebida Vodka 600 ML</strong>? Essa operação é irreversível.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row justify-content-center ">
                                    <div className="col-sm-4 mb-3 mb-sm-0">
                                        <button onClick={()=>this.setState({selectedItemId: null, selectedItem: []})} type="button" className="btn btn-block btn-outline-secondary btn-lg" data-dismiss="modal">Cancelar</button>

                                    </div>
                                    <div className="col-sm-4">
                                        <button onClick={() => {
                                            const token = localStorage.getItem("JWT_token");
                                            fetch("https://anorosa.com.br/Emporio037/api/produto/delete/" + this.state.selectedItemId, {
                                                method: "delete",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "Authorization": "Bearer " + token
                                                }
                                            })
                                                .then(data => data.json().then(data => {
                                                    console.log(data);
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
}
export default ProdutoIndex; //Aqui retorna o componente