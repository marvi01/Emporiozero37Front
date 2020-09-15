import React, { Component } from 'react';
import '../Destaque/Destaque.css';
import destaque1 from "../../imagens/LOGO BRANCA.png";



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
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true,
      pauseOnHover: true,
    }
    if (this.state.erro === null && this.state.estado === true && this.state.nulo === false) {
      const Destaq = this.state.data.map((item, indice) => {
        return (
          <div >
            <img src={`https://anorosa.com.br/Emporio037/storage/${item.fotodestaque}`} alt="..."></img>
          </div>

        )
      });
      var i = Destaq.length;
     while(i < 3){
       Destaq[i]=null;
       i++;
      }
      
      console.log(Destaq[3])
      return (
        <Slide {...properties}>
          {Destaq[0]}
          {Destaq[1] ? Destaq[1] : Destaq[0]}
          {Destaq[2] ? Destaq[2] : Destaq[0]}  
        </Slide>
      );
    }else{
      return (
        <Slide {...properties}>
          <div className="each-slide">
            <div >
              <img src={destaque1} alt="..."></img>
            </div>
          </div>
          <div className="each-slide">
            <div >
              <img src={destaque1} alt="..."></img>
            </div>
          </div>
        </Slide>
      );
    }
  }
  render() {
    return (
      <div className="disan" >
        {this.exibirDestaque()}

      </div>
    );
  }

}

export default Destaque;