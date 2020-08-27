import React, { Component } from 'react';
import './Checkout.css';
import Carousel from 'react-bootstrap/Carousel';
import card_front from '../../imagens/card-front.png';
import card_back from '../../imagens/card-back.png';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: null,
            carouselItemCount: 7
        }
    }
    slideTo = (valInd) => {
        let index = valInd;
        let direction = null;
        this.setState({
            direction,
            index
        })
    }
     toggleCarousel = (direction) => {
        let index = this.state.index
        const [min, max] = [0, this.state.carouselItemCount - 1]

        if (direction === 'next') {
            if (index < max) {
                index++
            }
        }
        else if (direction === 'prev') {
            if (index > min) {
                index--
            }
        }
        this.setState({
            direction,
            index
        })
    }
    render() {
        return (
            <div className="container-lg  pt-5">
                <div className="row justify-content-end">
                    <div className="col-lg-10">
                        <h1 className="h2 mb-2">Checkout</h1>
                    </div>
                </div>
                {/* MODAL PARA CADASTRO DE NOVO ENDEREÇO */}
                <div className="modal" tabindex="-1" id="add_address">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Endereço de entrega</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label for="cep">CEP</label>
                                    <input type="text" id="cep" className="form-control mb-2" />
                                    <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/">Não sei meu CEP</a>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="estado">Estado</label>
                                        <input type="text" id="estado" className="form-control" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="cidade">Cidade</label>
                                        <input type="text" id="cidade" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="bairro">Bairro</label>
                                    <input type="text" id="bairro" className="form-control" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-8">
                                        <label for="rua">Rua</label>
                                        <input type="text" id="rua" className="form-control" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="numero">Número</label>
                                        <input type="text" id="numero" className="form-control" />
                                    </div>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="address-save" checked />
                                    <label className="custom-control-label" for="address-save">Salvar endereço para compras futuras</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Continuar</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row no-gutters" id="checkout">
                    <div className="col-lg-auto">
                        {/*STEPS */}
                        <div className="steps flex-lg-column">
                            <div className="step completed">
                                <span className="step-info">Informações<br/> pessoais</span>
                                <div className="indicator-container" title="Informações pessoais">
                                    <span className="step-indicator">
                                        <i className="fas fa-user icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step completed">
                                <span className="step-info">Endereço<br/>de entrega</span>
                                <div className="indicator-container" title="Endereço de entrega">
                                    <span className="step-indicator">
                                        <i className="fas fa-map-marker-alt icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step active">
                                <span className="step-info">Opções <br/>de frete</span>
                                <div className="indicator-container" title="Opções de frete">
                                    <span className="step-indicator">
                                        <i className="fas fa-shipping-fast icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step">
                                <span className="step-info">Método de<br/> pagamento</span>
                                <div className="indicator-container" title="Método de pagamento">
                                    <span className="step-indicator">
                                        <i className="fas fa-credit-card icon-default"></i>
                                        <i className="fas fa-check icon-active"></i>
                                    </span>
                                </div>
                                <span className="step-line"></span>
                            </div>
                            <div className="step">
                                <span className="step-info">Finalizar <br/>a  compra</span>
                                <span className="step-indicator" title="Finalizar a compra">
                                    <i className="fas fa-check-double icon-default"></i>
                                    <i className="fas fa-check icon-active"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg shadow-sm" id="col-content">
                        <div className="row px-sm-4 py-sm-5" id="row-content">
                            {/* FORMULÁRIO */}
                            <div className="col-md-8">
                                <Carousel
                                    length={7}
                                    controls={false}
                                    interval={null}
                                    indicators={false}
                                    activeIndex={this.state.index}
                                    direction={this.state.direction}
                                    >
                                    <Carousel.Item>
                                        <h2 className="step-title">Informações pessoais</h2>
                                        <div className="form-step">
                                            <div className="form-row">
                                                <div className="form-group col-sm">
                                                    <label for="nome">Nome completo</label>
                                                    <input type="text" className="form-control" id="nome" readonly value="Ryan W. Fonseca"/>
                                                </div>
                                                <div className="form-group col-sm">
                                                    <label for="cpf">CPF</label>
                                                    <input type="text" className="form-control" id="cpf" readonly value="047.854.369-75"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="email">Email</label>
                                                <input type="email" className="form-control" id="email" name="email"/>
                                            </div>
                                            <div className="form-row mb-4">
                                                <div className="form-group col-sm">
                                                    <label for="celular">Celular</label>
                                                    <input type="text" className="form-control" id="celular" name="celular"/>
                                                </div>
                                                <div className="form-group col-sm">
                                                    <label for="nascimento">Nascimento</label>
                                                    <input type="date" className="form-control" id="nascimento" name="nascimento"/>
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>    
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* ENDEREÇO DE ENTREGA */}
                                        <h2 className="step-title">Endereço de entrega</h2>
                                        <div className="form-step">
                                            <p>Clique em algum endereço abaixo para seleciona-lo</p>
                                            <div className="custom-controls-container">
                                                <div className="custom-controls-container">
                                                    <div className="custom-checkbox-control">
                                                        <input type="radio" className="custom-checkbox-input" id="address1" name="address"/>
                                                        <label for="address1" className="custom-checkbox-label">
                                                            <div className="row no-gutters custom-checkbox-label-content">
                                                                {/* ICONE */}
                                                                <div className="col-auto custom-checkbox-label-icon">
                                                                    <div className="custom-checkbox-icon">
                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                    </div>
                                                                </div>
                                                                {/* TEXTO */}
                                                                <div className="col custom-checkbox-label-text">
                                                                    <div className="adress-container">
                                                                        <address>Rua Rosimary Silva Pereira, 286<br/>Formiga MG 35574-061<br/>(37) 3322-4589
                                                                        </address>
                                                                        <a href="">Editar</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="custom-checkbox-control">
                                                        <input type="radio" className="custom-checkbox-input" id="address2" name="address"/>
                                                        <label for="address2" className="custom-checkbox-label">
                                                            <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                                <div className="col-auto custom-checkbox-label-icon">
                                                                    <div className="custom-checkbox-icon">
                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                    </div>
                                                                </div>
                                                                {/* TEXTO */}
                                                                <div className="col custom-checkbox-label-text">
                                                                    <div className="adress-container">
                                                                        <address>
                                                                            Rua Rosimary Silva Pereira, 286<br/>
                                                                            Formiga MG, 35574-061<br/>
                                                                            (37) 3322-4589
                                                                        </address>
                                                                        <a href="">Editar</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <a type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#add_address">
                                                        Novo endereço
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* FRETE DOS PRODUTOS */}
                                        <h2 className="step-title">Opções de frete</h2>
                                        <div className="form-step">
                                            <p>Clique em uma das opções abaixo para selecionar o frete</p>
                                            <div className="custom-controls-container">
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="shipping1" name="shipping"/>
                                                    <label for="shipping1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-shipping-fast"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="shipping-name">Expresso</h3>
                                                                <span className="shipping-price">R$ 34,00</span>
                                                                <p className="shipping-info">Chegará entre os dias 21 e 25 de agosto </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* MÉTODO DE PAGAMENTO */}
                                        <h2 className="step-title">Método de pagamento</h2>
                                        <div className="form-step">
                                            <p>Selecione um método de pagamento</p>
                                            <div className="custom-controls-container">

                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="pay1" name="payment_method" />
                                                    <label for="pay1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-credit-card"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6">Cartão de crédito</h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="pay2" name="payment_method" />
                                                    <label for="pay2" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-file-invoice"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6">Boleto bancário</h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="pay3" name="payment_method" />
                                                    <label for="pay3" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i className="fas fa-map-marker-alt"></i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6 mb-0">Pagar na entrega</h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* DADOS DO CARTÃO */}
                                        <h2 className="step-title">Método de pagamento</h2>
                                        <div className="form-step">
                                            <h3 className="form-step-title">Dados do cartão</h3>
                                            <div className="form-row align-items-sm-center">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label for="card-number">Número</label>
                                                        <input type="text" className="form-control" id="card-number" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="card-title">Nome do portador</label>
                                                        <input type="text" className="form-control" id="card-title" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 order-first order-sm-last">
                                                    <div className="flip-card">
                                                        <div className="flip-card-inner">
                                                                <img src={card_front} className="invisible img-fluid" alt="" />
                                                            <div className="flip-card-front">
                                                                <img src={card_front} alt="" />
                                                            </div>
                                                            <div className="flip-card-back">
                                                            <img src={card_back} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-8 col-sm-6">
                                                    <label for="card-number">Validade</label>
                                                    <input type="date" className="form-control" id="card-number" />
                                                </div>
                                                <div className="form-group col">
                                                    <label for="card-number">CVV</label>
                                                    <input type="number" className="form-control" id="card-number" />
                                                </div>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* NÚMERO DE PARCELAS */}
                                        <h2 className="step-title">Método de pagamento</h2>
                                        <div className="form-step">
                                            <h3 className="form-step-title mb-4">Número de parcelas</h3>
                                            <div className="custom-controls-container">
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="parcel1" name="parcels" />
                                                    <label for="parcel1" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i>1x</i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6 mb-0">R$ 120,00  <span className="text-success ml-3">Sem juros</span></h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="custom-checkbox-control">
                                                    <input type="radio" className="custom-checkbox-input" id="parcel2" name="parcels" />
                                                    <label for="parcel2" className="custom-checkbox-label">
                                                        <div className="row no-gutters custom-checkbox-label-content">
                                                            {/* ICONE */}
                                                            <div className="col-auto custom-checkbox-label-icon">
                                                                <div className="custom-checkbox-icon">
                                                                    <i>2x</i>
                                                                </div>
                                                            </div>
                                                            {/* TEXTO */}
                                                            <div className="col custom-checkbox-label-text">
                                                                <h3 className="h6 mb-0">R$ 60,00  <span className="text-success ml-3">Sem juros</span></h3>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="collapse" id="collapse">
                                                    <div className="custom-checkbox-control">
                                                        <input type="radio" className="custom-checkbox-input" id="parcel3" name="parcels" />
                                                        <label for="parcel3" className="custom-checkbox-label">
                                                            <div className="row no-gutters custom-checkbox-label-content">
                                                                {/* ICONE */}
                                                                <div className="col-auto custom-checkbox-label-icon">
                                                                    <div className="custom-checkbox-icon">
                                                                        <i>3x</i>
                                                                    </div>
                                                                </div>
                                                                {/* TEXTO */}
                                                                <div className="col custom-checkbox-label-text">
                                                                    <h3 className="h6 mb-0">R$ 40,00  <span className="text-danger ml-3">Com juros</span></h3>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <a className="btn btn-outline-primary" data-toggle="collapse" href="#collapse" role="button" aria-expanded="false" aria-controls="collapse">Mostrar mais opções</a>
                                            </div>
                                            <div className="step-actions">
                                                <span className="btn btn-link" onClick={() => this.toggleCarousel('prev')}>
                                                    Voltar
                                                </span>
                                                <span className="btn btn-primary" onClick={() => this.toggleCarousel('next')}>
                                                    Próximo
                                                </span>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        {/* CONFIRMAR COMPRA */}
                                        <h2 className="step-title">Finalizar a compra</h2>
                                        <div className="form-step">
                                            <p>Revise os dados e finalize a sua compra</p>

                                            {/* DADOS DE ENTREGA */}
                                            <h3 className="h5">Entrega</h3>
                                            <ul className="list-group list-group-flush show-info-container">
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <address className="mb-0">
                                                                        Rua Rosimary Silva Pereira, 286<br/>
                                                                        Formiga MG, 35574061<br/>
                                                                        (37) 3322-4589
                                                                    </address>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(1)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i className="fas fa-shipping-fast"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <h3 className="shipping-name">Expresso</h3>
                                                                    <span className="shipping-price m-sm-2 d-sm-inline">R$ 34,00</span>
                                                                    <p className="shipping-info">Chegará entre os dias 21 e 25 de agosto </p>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(2)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            {/* DADOS DE PAGAMENTO */}
                                            <h3 className="h5">Pagamento</h3>
                                            <ul className="list-group list-group-flush show-info-container">
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i className="fas fa-credit-card"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <span>5547 2895 6985 1447</span><br/>
                                                                    <span>12/99</span> <span className="ml-2">CVV: 662</span><br/>
                                                                    <span>Ryan W. Fonseca</span><br/>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(4)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row no-gutters show-info-content">
                                                        <div className="col-auto">
                                                            <div className="show-info-icon">
                                                                <i>1x</i>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row no-gutters show-info-text">
                                                                <div className="col">
                                                                    <h3 className="h6 mb-0">R$ 60,00 <span className="text-success ml-3">Sem juros</span></h3>
                                                                </div>
                                                                <div className="col-sm-auto">
                                                                    <span className="btn-link" onClick={() => this.slideTo(5)}>
                                                                        Editar
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            {/* FRETE E VALOR TOTAL */}
                                            <div className="cart-values mb-0 mb-sm-5">
                                                <div className="row">
                                                    <div className="col-sm mb-3 mb-sm-0">
                                                        <div className="form-row align-items-end">
                                                            <div className="col">
                                                                <h3 className="price-confirm">Frete</h3>
                                                            </div>
                                                            <div className="col-auto">
                                                                <span className="shipping-price-confirm">R$ 84,00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm mb-5 mb-sm-0">
                                                        <div className="form-row align-items-end">
                                                            <div className="col">
                                                                <h3 className="price-confirm">Total</h3>
                                                            </div>
                                                            <div className="col-auto">
                                                                <span className="shipping-price-confirm">R$ 1200,00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* AÇÕES */}
                                            <div className="step-actions">
                                                <a className="btn btn-success" href="#steps" role="button" data-slide="next">
                                                    Finalizar a compra
                                                </a>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            {/* CARRINHO DE COMPRA */}
                            <div className="col-md checkout-cart-details">
                                <nav className="navbar navbar-expand-md navbar-dark bg-dark rounded p-3">
                                    <a className="navbar-brand d-md-none" href="#">Carrinho de compras</a>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#checkout-cart-details-collapse">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse mt-3 mt-lg-0" id="checkout-cart-details-collapse">
                                        <div className="checkout-cart-details-info">
                                            <h2 className="h4">Detalhes</h2>
                                            <div className="cart-product-details-container">
                                                <div className="cart-product-details">
                                                    <span>10x Vodka Absolut 600 ML</span>
                                                    <span>R$ 600,00</span>
                                                </div>
                                                <div className="cart-product-details">
                                                    <span>10x Vodka Absolut 600 ML</span>
                                                    <span>R$ 600,00</span>
                                                </div>
                                                <div className="cart-product-details">
                                                    <span>10x Vodka Absolut 600 ML</span>
                                                    <span>R$ 600,00</span>
                                                </div>
                                            </div>
                                            <div className="cart-values">
                                                <hr className="bg-light" />
                                                <div className="cart-value-info">
                                                    <span>Frete</span>
                                                    <span>R$ 84,00</span>
                                                </div>
                                                <div className="cart-value-info">
                                                    <span>Total</span>
                                                    <span>R$ 1200,00</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-block btn-primary">Ver carrinho</button>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;