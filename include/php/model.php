<?php
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
abstract class model{
    protected $conn = null;
public function __construct(){
    $this->conn = PDO_mysql::getConnection();
}
}
?>