import React, { Component } from 'react';
import Destaque from '../Destaque/Destaque';
import Categoria from '../Categoria/Categoria';

class MenuPrincipal extends Component {
    render() {
        return (
            <div>
                <Destaque/>
                <Categoria/>                
            </div>
        );
    }
}

export default MenuPrincipal;