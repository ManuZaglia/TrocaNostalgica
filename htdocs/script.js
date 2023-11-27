document.addEventListener('DOMContentLoaded', function () {
    carregarListaProdutos();
});

function carregarListaProdutos() {
    fetch('listar_produtos.php')
        .then(response => response.json())
        .then(data => {
            const listaProdutos = document.getElementById('lista-produtos');
            listaProdutos.innerHTML = '';

            data.forEach(produto => {
                const li = document.createElement('li');
                li.classList.add('list-group-item'); // Adiciona a classe Bootstrap

                const precoFormatado = typeof produto.preco_produto === 'number' && !isNaN(produto.preco_produto) ? produto.preco_produto.toFixed(2) : 'N/A';
                
                li.innerHTML = `<strong>${produto.nome_produto}</strong> - R$ ${precoFormatado}
                                <p>${produto.descricao_produto}</p>
                                <button class="btn btn-primary" onclick="editarProduto(${produto.id_produto})">Editar</button>
                                <button class="btn btn-danger" onclick="excluirProduto(${produto.id_produto})">Excluir</button>`;
                listaProdutos.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

window.editarProduto = function (id) {
    window.location.href = `adicionar_produto.html?editar=${id}`;
    console.log('Editar produto com ID', id);
}

window.excluirProduto = function (id) {
    const confirmacao = confirm('Tem certeza que deseja excluir este produto?');
    
    if (confirmacao) {
        fetch(`excluir_produto.php?id=${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem);
            carregarListaProdutos(); // Atualiza a lista após a exclusão
        })
        .catch(error => console.error('Erro:', error));
    }
}
