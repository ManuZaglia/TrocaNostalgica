<?php
$host = "localhost";
$user = "u903350443_trocanostalgic";
$senha = "/XD7VsiRl8K";
$banco = "u903350443_trocanostalgic";

$conexao = new mysqli($host, $user, $senha, $banco);

if ($conexao->connect_error) {
    die("Erro na conexão: " . $conexao->connect_error);
}
?>
