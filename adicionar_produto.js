document.addEventListener('DOMContentLoaded', function () {
    const formProduto = document.getElementById('formProduto');
    formProduto.addEventListener('submit', function (event) {
        event.preventDefault();
        salvarProduto();
    });

    const urlParams = new URLSearchParams(window.location.search);
    const idProdutoEditar = urlParams.get('editar');

    if (idProdutoEditar) {
        carregarDadosParaEdicao(idProdutoEditar);
    }
});

function carregarDadosParaEdicao(idProduto) {
    fetch(`listar_produtos.php?id=${idProduto}`)
        .then(response => response.json())
        .then(data => {
            const produto = data[0];
            document.getElementById('nome_produto').value = produto.nome_produto;
            document.getElementById('preco_produto').value = produto.preco_produto;
            document.getElementById('descricao_produto').value = produto.descricao_produto;
            document.getElementById('id_produto').value = produto.id_produto;
        })
        .catch(error => console.error('Erro:', error));
}

function salvarProduto() {
    const nomeProduto = document.getElementById('nome_produto').value;
    const precoProduto = parseFloat(document.getElementById('preco_produto').value);
    const descricaoProduto = document.getElementById('descricao_produto').value;
    const idProduto = document.getElementById('id_produto').value;

    const dados = {
        nome_produto: nomeProduto,
        preco_produto: precoProduto,
        descricao_produto: descricaoProduto,
        id_produto: idProduto
    };

    fetch('adicionar_produto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
        if (data.status === 'sucesso') {
            document.getElementById('formProduto').reset();
            window.location.href = 'vendas.html';

        }
    })
    .catch(error => console.error('Erro:', error));
}
