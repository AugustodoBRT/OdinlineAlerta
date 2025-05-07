// Verifica se o usuário está logado
const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuario || !usuario.chave) {
  alert("Você precisa estar logado.");
  window.location.href = 'index.html';
}

// Elementos DOM
const listaCompras = document.getElementById('lista-compras');
const tabelaCompras = document.getElementById('tabela-compras');
const semCompras = document.getElementById('sem-compras');

// Carrega as compras do localStorage
function carregarCompras() {
  const compras = JSON.parse(localStorage.getItem('compras')) || [];
  
  // Limpa a lista
  listaCompras.innerHTML = '';
  
  // Verifica se existem compras
  if (compras.length === 0) {
    tabelaCompras.style.display = 'none';
    semCompras.style.display = 'block';
    return;
  }
  
  // Mostra a tabela e esconde a mensagem
  tabelaCompras.style.display = 'table';
  semCompras.style.display = 'none';
  
  // Adiciona cada compra à tabela
  compras.forEach(compra => {
    const linha = document.createElement('tr');
    
    // Data atual se não tiver data
    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR') + ' ' + 
                       data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
    
    // Formata o valor
    const valorFormatado = "R$" + parseFloat(compra.valor).toFixed(2).replace('.', ',');
    
    // Conteúdo da linha
    linha.innerHTML = `
      <td>${compra.idProduto || '-'}</td>
      <td>${compra.descricao}</td>
      <td>${valorFormatado}</td>
      <td>${dataFormatada}</td>
    `;
    
    listaCompras.appendChild(linha);
  });
}

// Função para fazer logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
}

// Carrega compras quando a página for aberta
document.addEventListener('DOMContentLoaded', carregarCompras);