<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');
require_once (__ROOT__ .'/modules/orders/php_action/orders_model.php');
require_once (__ROOT__ .'/modules/menu/php_action/menu_model.php');

class orders_list implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        $menu_id=$post['menu_id'];
		if(isset($_SESSION['login_user'])){
			$account=$_SESSION['login_user'];
		}
		if(isset($_SESSION['login_id'])){
			$member_id=$_SESSION['login_id'];
		}
		//else{$account='admin';}
        $get_member_type = new user_profile_model();
        $member_type = $get_member_type->get_member_type($account);
        switch ($member_type['member_type']['0']['member_type']) {
            case 1:
                $get_menu = new menu_model();
                $menu = $get_menu->get_menu($menu_id);
                $get_money = new user_profile_model();
                $money= $get_money->get_money($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success management'.$money['data_set']['0']['member_money'];
                $return_value['member_type']=1;
                $return_value['data_set']=$menu['data_set'];
                $return_value['money']=$money['data_set']['0']['member_money'];
                break;
            case 2:
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success seller';
                $return_value['member_type']=2;
            
                break;
            case 3:
                $get_menu = new menu_model();
                $menu = $get_menu->get_menu($menu_id);
                $get_money = new user_profile_model();
                $money= $get_money->get_money($member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success costmer';
                $return_value['member_type']=3;
                $return_value['data_set']=$menu['data_set'];
                $return_value['money']=$money['data_set']['0']['member_money'];
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