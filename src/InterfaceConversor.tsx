// Componente principal da interface mobile do conversor de bases

import React from 'react';
import './estilos-principais.css'; 

export default function InterfaceConversor() {
  return (
    <div id="container-principal">
      {/* Cabeçalho com logo e menu */}
      <header id="cabecalho">
        <div id="logo-nome">
          {/* Logo da aplicação */}
          <img src="/bitra_logo.svg" alt="Logo Bitra" id="logo-app" style={{ width: 48, height: 48, marginBottom: 4 }} />
          <span id="nome-app">bitra</span>
        </div>
        <div id="menu-hamburguer" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main id="conteudo">
        <section id="cartao-conversor">
          <div className="linha-campos">
            <div className="campo-label">
              <label htmlFor="base-inicial">base inicial</label>
              <select id="base-inicial" name="base-inicial" defaultValue="10">
                <option value="2">2</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="16">16</option>
              </select>
            </div>
            <div className="campo-label">
              <label htmlFor="numero-inicial">número inicial</label>
              <input id="numero-inicial" name="numero-inicial" type="text" placeholder="ex: 255" autoComplete="off" />
            </div>
          </div>
          <div className="linha-campos">
            <div className="campo-label">
              <label htmlFor="base-alvo">base alvo</label>
              <select id="base-alvo" name="base-alvo" defaultValue="16">
                <option value="2">2</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="16">16</option>
              </select>
            </div>
            <div className="campo-label">
              <label htmlFor="resultado">resultado</label>
              <input id="resultado" name="resultado" type="text" disabled placeholder="" />
            </div>
          </div>
          <button id="botao-converter">CONVERTER</button>
        </section>
      </main>

      {/* Rodapé */}
      <footer id="rodape"></footer>
    </div>
  );
}
