// Componente principal da interface mobile do conversor de bases

import React, { useState } from 'react';
import './estilos-principais.css';
import './conversor.css';

interface ResultadoConversao {
  valor: string;
  bits: string[];
  erro: string;
}

export default function InterfaceConversor() {
  const [numeroInicial, setNumeroInicial] = useState('');
  const [baseInicial, setBaseInicial] = useState('10');
  const [baseAlvo, setBaseAlvo] = useState('2');
  const [resultado, setResultado] = useState<ResultadoConversao>({
    valor: '',
    bits: [],
    erro: ''
  });

  // Função para validar se o número é válido na base fornecida
  const ehValido = (valor: string, base: number): boolean => {
    if (valor === '') return false;
    const baseDigitos: { [key: number]: string } = {
      2: '01',
      4: '0123',
      8: '01234567',
      10: '0123456789',
      16: '0123456789ABCDEFabcdef'
    };
    
    const digitos = baseDigitos[base];
    if (!digitos) return false;
    
    return Array.from(valor).every(digito => digitos.includes(digito.toUpperCase()));
  };

  // Função para converter para decimal
  const paraDecimal = (valor: string, baseInicial: number): number => {
    return parseInt(valor.toUpperCase(), baseInicial);
  };

  // Função para converter de decimal para a base alvo
  const deDecimal = (valor: number, baseAlvo: number): string => {
    if (baseAlvo === 2) return valor.toString(2);
    if (baseAlvo === 4) {
      // Converter para base 4 manualmente
      if (valor === 0) return '0';
      let resultado = '';
      let n = valor;
      while (n > 0) {
        resultado = (n % 4) + resultado;
        n = Math.floor(n / 4);
      }
      return resultado;
    }
    if (baseAlvo === 8) return valor.toString(8);
    if (baseAlvo === 10) return valor.toString(10);
    if (baseAlvo === 16) return valor.toString(16).toUpperCase();
    return '';
  };

  // Função para converter o resultado para binário com padding
  const obterBinarioPadded = (valor: number): string => {
    const binario = valor.toString(2);
    // Fazer padding para múltiplo de 4 (grupo de bit)
    const tamanho = Math.ceil(binario.length / 4) * 4;
    return binario.padStart(tamanho, '0');
  };

  // Função para converter para array de bits com cores
  const obterBitsColoridos = (valor: string, base: number): string[] => {
    const decimal = paraDecimal(valor, base);
    const binario = obterBinarioPadded(decimal);
    return binario.split('');
  };

  const handleConverter = () => {
    const baseInicialNum = parseInt(baseInicial);
    const baseAlvoNum = parseInt(baseAlvo);

    // Validar entrada
    if (numeroInicial.trim() === '') {
      setResultado({ valor: '', bits: [], erro: 'Por favor, digite um número' });
      return;
    }

    if (!ehValido(numeroInicial.trim(), baseInicialNum)) {
      setResultado({
        valor: '',
        bits: [],
        erro: `Número inválido para base ${baseInicialNum}`
      });
      return;
    }

    try {
      const decimal = paraDecimal(numeroInicial.trim(), baseInicialNum);
      const resultadoConvertido = deDecimal(decimal, baseAlvoNum);
      const bits = obterBitsColoridos(numeroInicial.trim(), baseInicialNum);

      setResultado({
        valor: resultadoConvertido,
        bits: bits,
        erro: ''
      });
    } catch (err) {
      setResultado({
        valor: '',
        bits: [],
        erro: 'Erro ao converter o número'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConverter();
    }
  };

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
              <select 
                id="base-inicial" 
                name="base-inicial" 
                value={baseInicial}
                onChange={(e) => setBaseInicial(e.target.value)}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="16">16</option>
              </select>
            </div>
            <div className="campo-label">
              <label htmlFor="numero-inicial">número inicial</label>
              <input 
                id="numero-inicial" 
                name="numero-inicial" 
                type="text" 
                placeholder="ex: 255" 
                autoComplete="off"
                value={numeroInicial}
                onChange={(e) => setNumeroInicial(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <div className="linha-campos">
            <div className="campo-label">
              <label htmlFor="base-alvo">base alvo</label>
              <select 
                id="base-alvo" 
                name="base-alvo"
                value={baseAlvo}
                onChange={(e) => setBaseAlvo(e.target.value)}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="16">16</option>
              </select>
            </div>
            <div className="campo-label">
              <label htmlFor="resultado">resultado</label>
              <input 
                id="resultado" 
                name="resultado" 
                type="text" 
                disabled 
                placeholder="" 
                value={resultado.valor}
              />
            </div>
          </div>
          <button id="botao-converter" onClick={handleConverter}>CONVERTER</button>

          {/* Exibir erro se houver */}
          {resultado.erro && (
            <div className="container-erro">
              <p className="texto-erro">{resultado.erro}</p>
            </div>
          )}

          {/* Exibir visualização de bits se houver resultado */}
          {resultado.bits.length > 0 && (
            <div className="container-visualizacao">
              <div className="secao-binario">
                <h3>Representação em binário</h3>
                <div className="grid-bits">
                  {resultado.bits.map((bit, index) => (
                    <div key={index} className={`bit bit-${bit}`}>
                      {bit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabela com resumo */}
              <div className="tabela-resumo">
                <div className="linha-tabela">
                  <div className="coluna-tabela">Base {baseInicial}</div>
                  <div className="coluna-tabela valor">{numeroInicial}</div>
                </div>
                <div className="linha-tabela">
                  <div className="coluna-tabela">Base {baseAlvo}</div>
                  <div className="coluna-tabela valor">{resultado.valor}</div>
                </div>
                <div className="linha-tabela">
                  <div className="coluna-tabela">Binário</div>
                  <div className="coluna-tabela valor">{resultado.bits.join('')}</div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Rodapé */}
      <footer id="rodape"></footer>
    </div>
  );
}
