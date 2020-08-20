import React, { Component } from 'react';
import '../Destaque/Destaque.css';
import destaque1  from "../../imagens/destaque1.webp";
import destaque2  from "../../imagens/destaque2.webp";
import destaque3  from "../../imagens/destaque3.webp";


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
              <Slide {...properties}>
                <div className="each-slide">
                  <div >
                    <img src={destaque1} className="img-fluid" alt="..."></img>
                  </div>
                </div>
                <div className="each-slide">
                  <div >
                  <img src={destaque2} className="img-fluid" alt="..."></img>
                  </div>
                </div>
                <div className="each-slide">
                  <div >
                  <img src={destaque3} className="img-fluid" alt="..."></img>
                  </div>
                </div>
                
              </Slide>
              
            </div>
        );
    }

}

export default Destaque;