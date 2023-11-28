<?php
include 'config.php';

$resultado = $conexao->query("SELECT * FROM produtos");

$produtos = [];

while ($row = $resultado->fetch_assoc()) {
    $row['preco_produto'] = floatval($row['preco_produto']); // converter para número
    $produtos[] = $row;
}

echo json_encode($produtos);
?>
