<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados = json_decode(file_get_contents('php://input'), true);

    $nome_produto = $dados['nome_produto'];
    $preco_produto = $dados['preco_produto'];
    $descricao_produto = $dados['descricao_produto'];

    // Se tiver um ID, é uma edição
    if (!empty($dados['id_produto'])) {
        $id_produto = $dados['id_produto'];
        $sql = "UPDATE produtos 
                SET nome_produto = '$nome_produto', preco_produto = $preco_produto, descricao_produto = '$descricao_produto'
                WHERE id_produto = $id_produto";
    } else {
        // Senão, é uma adição
        $sql = "INSERT INTO produtos (nome_produto, preco_produto, descricao_produto)
                VALUES ('$nome_produto', $preco_produto, '$descricao_produto')";
    }

    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Produto salvo com sucesso!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar produto"]);
    }
}
?>
