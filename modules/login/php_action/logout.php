<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/login/php_action/login_model.php');

class logout implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        if(isset($_SESSION['login_user'])){
			$_SESSION['login_user']= null;
			
		}
		if(isset($_SESSION['member_type'])){
		    $_SESSION['member_type']=null;
		}
		if(isset($_SESSION['login_id'])){
		    $_SESSION['login_id']=null;
		}
		$return_value['status_code']=0;
		$return_value['data_set']=<<<EOT
		已登出
		<input type="button" value="回登入畫面"  onclick="(new login_page('login','login_page','content')).run()"/>
EOT;
        return json_encode($return_value);
    }

}

?>
