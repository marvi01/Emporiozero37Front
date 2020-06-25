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
}

export default Destaque;