import React, { Component } from 'react';
import Destaque from '../Destaque/Destaque';
import Produto from '../Produto/Produto';

class MenuPrincipal extends Component {
    render() {
        return (
            <div>
                <Destaque/>
                <Produto/>                
            </div>
        );
    }
}

export default MenuPrincipal;