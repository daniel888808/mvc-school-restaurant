<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');

class checkacc implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        $account=$post['account'];
        //$passwd=$post['passwd'];
        $where_statement = $post['where_statement'];
        $checkacc = new user_profile_model();
        $return_value = $checkacc->checkacc($where_statement);
        
        return json_encode($return_value);
    }

}

?>
