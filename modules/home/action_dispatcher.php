<?php

require_once (__ROOT__ .'/include/php/Module.php');
class action_dispatcher implements Module {

    public function doAction(event_message $em) {
        $get = $em->getGet();
        if (isset($get['action']))
            $action = $get['action'];
        else
            $action = 'home_page';
        require_once 'modules/home/php_action/'.$action . '.php';
        $action_listener = new $action();
        $body = $action_listener->actionPerformed($em);
        return $body;
    }

}

?>
