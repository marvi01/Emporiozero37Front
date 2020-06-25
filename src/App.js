import React from 'react';
import './App.css';
import Produto from './Component/Produto/Produto';
import Contato from './Component/Contato/Contato';
import Destaque from './Component/Destaque/Destaque';
function App() {
  return (
    <div >

      <Contato></Contato>
      <Destaque></Destaque>
      <Produto></Produto>
    </div>
  );
}

export default App;
