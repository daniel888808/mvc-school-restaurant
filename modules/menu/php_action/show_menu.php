<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');
require_once (__ROOT__ .'/modules/menu/php_action/menu_model.php');

class show_menu implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
		if(isset($_SESSION['login_user'])){
			$account=$_SESSION['login_user'];
		}
        $get_member_type = new user_profile_model();
        $member_type = $get_member_type->get_member_type($account);
        switch ($member_type['member_type']['0']['member_type']) {
            case 1:
                $member_id=$post['member_id'];
                $get_all_menu = new menu_model();
                $all_menu = $get_all_menu->get_all_menu($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success management';
                $return_value['member_type']=1;
                $return_value['data_set']=$all_menu['data_set'];
                break;
            case 2:
                if(isset($_SESSION['login_id'])){
		        	$member_id=$_SESSION['login_id'];
		        }
                $get_all_menu = new menu_model();
                $all_menu = $get_all_menu->get_all_menu($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success seller seller_id '.$member_id;
                $return_value['member_type']=2;
                $return_value['data_set']=$all_menu['data_set'];
            
                break;
            case 3:
                $member_id=$post['member_id'];
                $get_all_menu = new menu_model();
                $all_menu = $get_all_menu->get_all_menu($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success costmer';
                $return_value['member_type']=3;
                $return_value['data_set']=$all_menu['data_set'];
                break;
            case 4:
                $member_id=$post['member_id'];
                $get_all_menu = new menu_model();
                $all_menu = $get_all_menu->get_all_menu($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success sombody';
                $return_value['member_type']=4;
                $return_value['data_set']=$all_menu['data_set'];
                break;
            default:
                $return_value['status_code']=1;
                $return_value['status_message']=$account.'9 9'.$member_type['member_type']['0']['member_type'];
        }
        
        return json_encode($return_value);
    }

}

?>