<?php

require_once 'include/php/event_message.php';
require_once 'include/php/PDO_mysql.php';
$body = (new Main())->run();
echo $body;

class Main {

    private $module;

    public function __construct() {
        $string = file_get_contents("config.json");
        $config = json_decode($string, true);
        PDO_mysql::$db_host = $config["db"]["db_host"];
        PDO_mysql::$db_name = $config["db"]["db_name"];
        PDO_mysql::$db_user = $config["db"]["db_user"];
        PDO_mysql::$db_password = $config["db"]["db_password"];
        //$this->module = $config["default_module"];
    }

    public function run() {
        session_start();
        define('__ROOT__', dirname(__FILE__));
        $event_message = new event_message($_GET, $_POST);
        $get = $event_message->getGet();
        if (isset($_GET['module'])) {
            $module = $_GET['module'];
        } else {
            $module = 'login';
        }
        require_once "modules" . "/" . $module . "/" . 'action_dispatcher.php';
        $module_object = new action_dispatcher();
        $body = $module_object->doAction($event_message);
        return $body;
    }

}

?>
