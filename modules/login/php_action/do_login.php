<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/login/php_action/login_model.php');

class do_login implements action_listener {

    public function actionPerformed($em) {
        //$conn = PDO_mysql::getConnection();
        //$sql = 'SELECT * FROM `mvc_member`';
        $post = $em->getPost();
        $account=$post['account'];
        $passwd=$post['passwd'];
        $where_statement = $post['where_statement'];
        $dologin = new login_model();
        $return_value = $dologin->do_login($where_statement,$account);
          
        return json_encode($return_value);
    }

}

?>
