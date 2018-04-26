<?php

require_once (__ROOT__ .'/include/php/event_message.php');

interface action_listener {

    public function actionPerformed($em);
}

?>
