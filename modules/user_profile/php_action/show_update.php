<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');

class show_update implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        $member_id=$post['member_id'];
		if(isset($_SESSION['login_user'])){
			$account=$_SESSION['login_user'];
		}
		//else{$account='admin';}
        $get_member_type = new user_profile_model();
        $member_type = $get_member_type->get_member_type($account);
        switch ($member_type['member_type']['0']['member_type']) {
            case 1:
                $get_update_costmer = new user_profile_model();
                $update_costmer = $get_update_costmer->get_update_costmer($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success management';
                $return_value['member_type']=1;
                $return_value['data_set']=$update_costmer['data_set'];
                break;
            case 2:
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success seller';
                $return_value['member_type']=2;
            
                break;
            case 3:
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success costmer';
                $return_value['member_type']=3;
               
                break;
            case 4:
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success sombody';
                $return_value['member_type']=4;
               
                break;
            default:
                $return_value['status_code']=1;
                $return_value['status_message']=$account.'9 9'.$member_type['member_type']['0']['member_type'];
        }
        
        return json_encode($return_value);
    }

}

?>