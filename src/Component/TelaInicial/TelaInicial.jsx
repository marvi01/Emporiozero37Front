import React, { Component } from 'react';
import Destaque from '../Destaque/Destaque';
import Promotions from '../Sections/Promotions';
import Releases from '../Sections/Releases';
import BestSellers from '../Sections/BestSellers';


import Categorias from '../Categorias/Categorias';

{/*}
import ExibeCategoria from '../ExibeCategoria/ExibeCategoria';
*/}

class TelaInicial extends Component {
    render() {
        return (
            <div>
                <Destaque/>
                {/*
                    <ExibeCategoria />
                */}
                <main className="py-5">
                    <div className="container-md">
                        <Categorias />
                        <BestSellers/>
                        {/*<Promotions />
                        <Releases />*/}
                    </div>
                </main>
            </div>
        );
    }
}

export default TelaInicial;