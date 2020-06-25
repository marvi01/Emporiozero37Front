import React, { Component } from 'react';
import './Destaque.css'
import escava1 from "../../imagens/escava1.jpg";
import escava2 from "../../imagens/escava2.jpg";
import { Link } from "react-router-dom";
class Destaque extends Component {

    render() {
        return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="" data-slide-to="0" className="active"></li>
                    <li data-target="" data-slide-to="1"></li>
                    <li data-target="" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner ">
                    <div className="carousel-item active" data-interval="4000" data-pause="false" >
                        <img src={escava1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-interval="4000">
                        <img src={escava2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-interval="4000">
                        <img src={escava1} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <a className="carousel-control-prev" href="" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }

  render() {
    return (
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
        <div class="carousel-inner ">
          <div class="carousel-item active">
            <img src="https://www.lippel.com.br/media_cache/noticias//45790bc20871da53d965b3d25f8d12835a_o-pfl-400x700-m-c-tambem-auxilia-em-reciclagem.jpg" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://www.lippel.com.br/media_cache/noticias//468934a0e43a008f4618cb865cc3c51a1d_pfl-400x700-4tt-suprindo-a-necessidade-de-cavacos-para-fornos-ceramicos.jpg" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://www.lippel.com.br/media_cache/noticias//45790bc20871da53d965b3d25f8d12835a_o-pfl-400x700-m-c-tambem-auxilia-em-reciclagem.jpg" class="d-block w-100" alt="..." />
          </div>
        </div>
        <a class="carousel-control-prev" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
  }

}

export default Destaque;