import React, { Component } from 'react';
import '../Destaque/Destaque.css';
import escava1 from "../../imagens/escava1.jpg";
import escava2 from "../../imagens/escava2.jpg";
import { Slide } from 'react-slideshow-image';
class Destaque extends Component {



    render() {

        const slideImages = [
            escava1,
            escava2,
            escava1
          ];
           
          const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            pauseOnHover: true,
            onChange: (oldIndex, newIndex) => {
              console.log(`slide transition from ${oldIndex} to ${newIndex}`);
            }
          }
        return (
            <div>
               <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div >
              <img src={escava1} className="d-block w-100 " alt="..."></img>
            </div>
          </div>
          <div className="each-slide">
            <div >
            <img src={escava1} className="d-block w-100 " alt="..."></img>
            </div>
          </div>
          <div className="each-slide">
            <div >
            <img src={escava1} className="d-block w-100 " alt="..."></img>
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