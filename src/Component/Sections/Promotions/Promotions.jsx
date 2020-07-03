import React, { Component } from 'react'; //Importa o método componente e react
import '.././Sections.css';
import Produto from '../../Produtos/Produtos';
import { Slide } from 'react-slideshow-image';


class Section extends Component {
    render() {//Aqui acontece a renderização da página
        const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            pauseOnHover: true,
            indicators: false,
          }
        return (
            <section class="section">
                    <div className="section-header mb-3">
                        <h2 className="h4 section-title d-inline">Promoções</h2>
                        <a href="" class="ml-2">Ver tudo</a>
                    </div>
                    <div className="section-body  shadow">
                        <Slide {...properties}>
                            <div className="each-slide">
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
                            </div>
                            <div className="each-slide">
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
                            </div>
                        </Slide>
                    </div>
            </section>
            
        );
    }
}
export default Section; //Aqui retorna o componente