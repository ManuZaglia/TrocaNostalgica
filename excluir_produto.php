<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id_produto = $_GET['id'];

    $sql = "DELETE FROM produtos WHERE id_produto = $id_produto";

    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Produto excluído com sucesso!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao excluir produto"]);
    }
}
?>
