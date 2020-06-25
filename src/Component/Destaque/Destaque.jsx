import React, { Component } from 'react';
import './Destaque.css'
class Destaque extends Component {
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