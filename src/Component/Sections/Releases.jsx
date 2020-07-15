import React, { Component } from 'react'; //Importa o método componente e react
import './Sections.css';
import Produto from '../Produtos/Produtos';
import Carousel from 'react-bootstrap/Carousel';


class Section extends Component {
    render() {//Aqui acontece a renderização da página
        return (
            <section class="section">
                    <div className="section-header mb-3">
                        <h2 className="h4 section-title d-inline">Lançamentos</h2>
                        <a href="" class="ml-2">Ver tudo</a>
                    </div>
                    <div className="section-body">
                        <Carousel fade="true">
                            <Carousel.Item>
                                <div className="form-row ">
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="form-row">
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="form-row">
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                    <div className="col-sm-6 col-xl-3">
                                        <Produto />
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
            </section>
            
        );
    }
}
export default Section; //Aqui retorna o componente