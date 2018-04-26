<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');
require_once (__ROOT__ .'/modules/login/php_action/login_model.php');

class do_signup implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        $account=$post['account'];
        $passwd=$post['passwd'];
        $member_type=$post['member_type'];
        $do_signup = new user_profile_model();
        $return_value=$do_signup->do_signup($account,$passwd,$member_type);
        $do_login = new login_model();
        $return_value=$do_login->do_login("member_account='" . $account . "' and member_passwd='" . $passwd . "'",$account);
        return json_encode($return_value);
    }

}

?>
