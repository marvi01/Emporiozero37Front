import React, { Component } from 'react';
import '../Destaque/Destaque.css';
import destaque  from "../../imagens/destaque.jpg";
import destaque2  from "../../imagens/destaque2.jpg";
import destaque3  from "../../imagens/destaque3.jpg";


import { Slide } from 'react-slideshow-image';
class Destaque extends Component {



    render() {

          const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            pauseOnHover: true,
          }
        return (
            <div className="disan" >
               <div className="slide-container ">
        <Slide {...properties}>
          <div className="each-slide">
            <div >
              <img src={destaque} className="d-block w-100 " alt="..."></img>
            </div>
          </div>
          <div className="each-slide">
            <div >
            <img src={destaque3} className="d-block w-100 " alt="..."></img>
            </div>
          </div>
          <div className="each-slide">
            <div >
            <img src={destaque2} className="d-block w-100 " alt="..."></img>
            </div>
          </div>
        </Slide>
      </div> 
            </div>
        );
    }

}

export default Destaque;

/**
 * <div className="Desta">
            <div id="carouselExampleFade  " className="carousel slide carousel-fade " data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="" data-slide-to="0" className="active"></li>
                    <li data-target="" data-slide-to="1"></li>
                    <li data-target="" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner ">
                    <div className="carousel-item active" data-interval="4000" data-pause="false" >
                        <img src={escava1} className="d-block w-100 " alt="..." />
                    </div>
                    <div className="carousel-item" data-interval="4000">
                        <img src={escava2} className="d-block w-100  " alt="..." />
                    </div>
                    <div className="carousel-item" data-interval="4000">
                        <img src={escava1} className="d-block w-100  " alt="..." />
                    </div>
                </div>
                <a className="carousel-control-prev" href="/" role="button" data-slide-to="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="/" role="button" data-slide-to="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            </div>
 */