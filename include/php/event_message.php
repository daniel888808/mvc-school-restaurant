<?php

class event_message {

    private $get = null;
    private $post = null;
    private $param = null;

    function __construct($get, $post) {
        $this->get = $get;
        $this->post = $post;
    }

    public function getGet() {
        return $this->get;
    }

    public function getPost() {
        return $this->post;
    }
    //public function addParam($key, $value){
            //$this->param[$key] = $value;
        //}

}


