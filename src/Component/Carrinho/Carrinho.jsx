import React, { useState, useEffect } from 'react';
import { data } from 'jquery';



export default function Carrinho(props) {

  const [Prod, setProd] = useState(true);
    const [count, setcount] = useState(true);

    const prencherArray = () => {
        var array = []

        for (let i = 0; i < 10; i++) {
            let tranformador = sessionStorage.getItem(i);
            if (tranformador != null) {
                
                let tranformado = JSON.parse(tranformador);
                array.push(tranformado);
                console.log(tranformado.data.nomeprod);
            }
        }
        setProd(array);
    }
    useEffect(() => {
      prencherArray()
  }, [count]);
  const exibiCarrinho = () => {

    if (Prod && Prod.length) {
        const ProdutoCarrinho = Prod.map((item, indice) =>
            (
              <div key={indice}>
                <p>{item.data.nomeprod}</p>
                ssss
              </div>
            )
        )

        return ProdutoCarrinho;
    } else {
        return (
            <tr>
                <th>
                    Nenhum produto encontrado no carrinho :(
                </th>

            </tr>)
    }

}
  
      return(
      <div>
        {exibiCarrinho}
      </div>
      )
    

}