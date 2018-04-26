<?php

require_once (__ROOT__ .'/include/php/event_message.php');

interface Module {

    public function doAction(event_message $em);
}
