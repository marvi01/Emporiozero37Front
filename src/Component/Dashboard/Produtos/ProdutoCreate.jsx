
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Produtos.css";

class ProdutoCreate extends Component {
        
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
                        <li className="breadcrumb-item active" aria-current="page">Cadastrar</li>
                    </ol>
                </nav>
                <div className="dashboard-page-content p-md-5">
                    <div className="row no-gutters">
                        <div className="col-lg-12">
                            <div className="card border-0 shadow">
                                <div className="card-body p-lg-5">
                                    <h2 className="card-title h4 mb-4">Cadastrar bebida</h2>
                                    <form action="" method="GET">
                                        <div className="form-group row">
                                            <label htmlFor="nome" className="col-lg-2 col-form-label">Nome</label>
                                            <div className="col-lg-8">
                                                <input type="text" className="form-control" id="nome" />
                                                <span className="small text-muted">Esse será o nome de exibição do produto na loja.</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="volume" className="col-lg-2 col-form-label">Volume</label>
                                            <div className="col-lg-4">
                                                <input type="number" className="form-control" id="volume" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="teor" className="col-lg-2 col-form-label">Teor Alcoólico</label>
                                            <div className="col-lg-4">
                                                <div className="input-group">
                                                    <input type="number" className="form-control" id="teor" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="preco" className="col-lg-2 col-form-label">Preço</label>
                                            <div className="col-lg-4">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">R$</span>
                                                    </div>
                                                    <input type="number" className="form-control" id="preco" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="descricao" className="col-lg-2 col-form-label">Descrição <span className="small text-muted">(Opcional)</span></label>
                                            <div className="col-lg-8">
                                                <textarea name="descricao" id="descricao" className="form-control" rows="10"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-sm-8 offset-lg-2">
                                                <div className="alert callout callout-info alert-dismissible fade show" role="alert">
                                                    <h4>Dica</h4>
                                                    <p className="small">Para obter uma boa exibição na loja, garanta que a foto atenda aos requisitos abaixo:</p>
                                                    <ul className="small mb-0">
                                                        <li>Proporção de 1/3 entre a largura e altura</li>
                                                        <li className="text-muted" style={{listStyleType: 'none'}}>Tamanho recomendado: 160x480</li>
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
                                                        <input type="file" className="d-none" id="foto" />
                                                        <img className="product-image" alt="" />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="offset-lg-2">
                                            <Link to="/dashboard/produtos" className="btn btn-outline-secondary mr-2">
                                                Cancelar
                                            </Link>
                                            <button className="btn btn-primary" type="submit">
                                                Cadastrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        );
    }
}
export default ProdutoCreate; //Aqui retorna o componente