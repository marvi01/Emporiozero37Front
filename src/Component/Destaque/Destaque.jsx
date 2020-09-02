import React, { Component } from 'react';
import '../Destaque/Destaque.css';
import destaque1 from "../../imagens/destaque1.webp";
import destaque2 from "../../imagens/destaque2.webp";
import destaque3 from "../../imagens/destaque3.webp";


import { Slide } from 'react-slideshow-image';
class Destaque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        "id": 0,
        "fotodestaque": "",
      }],

      erro: null,
      nulo: true,
      estado: false,
      status: false
    };
  };
  async componentDidMount() {
    var response;

    try {
      response = await fetch(`https://anorosa.com.br/Emporio037/api/destaque/list`);
    } catch (error) {
      console.log(error);
      this.setState({ error })
    }
    const json = await response.json();

    if (json.error === null || json.error === undefined || json.status === true) {
      this.setState({ data: json.data, nulo: false });
      console.log(json);
    }
    this.setState({ estado: true });
  }
  exibirDestaque() {
    if (this.state.erro === null && this.state.estado === true && this.state.nulo === false) {
      const Destaq = this.state.data.map((item, indice) => {
        return (
          <div >
            <img src={`https://anorosa.com.br/Emporio037/storage/${item.fotodestaque}`} className="img-fluid" alt="..."></img>
          </div>

        )
      });
      console.log(Destaq)
      return Destaq;
    }
  }
  render() {
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true,
      pauseOnHover: true,
    }
    const destaques = this.exibirDestaque();
    return (
      <div className="disan" >
        <Slide {...properties}>
          <div className="each-slide">
            <div >
              <img src={destaque1} className="img-fluid" alt="..."></img>
            </div>
          </div>
          {destaques}

        </Slide>

      </div>
    );
  }

}

export default Destaque;