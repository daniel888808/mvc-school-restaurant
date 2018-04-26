<?php

class PDO_mysql {
    static $db_host ="db.mis.kuas.edu.tw";
    static $db_name ="s1104137223";
    static $db_user="s1104137223";
    static $db_password="9659";
    static function getConnection(){
        $dsn=  sprintf("mysql:host=%s;dbname=%s;charst=utf8",self::$db_host,self::$db_name);
        try {
            $conn=new PDO($dsn,self::$db_user,self::$db_password);
            return $conn;
        } catch (Exception $exc) {
            console.log($exc->getMessage());
        }
    }
}

?>
