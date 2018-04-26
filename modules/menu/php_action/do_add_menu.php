<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');
require_once (__ROOT__ .'/modules/menu/php_action/menu_model.php');

class do_add_menu implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        $menu_price=$post['menu_price'];
        $menu_name=$post['menu_name'];
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
               
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success management';
                $return_value['member_type']=1;
                $return_value['data_set']='新增完成';
                break;
            case 2:
                $do_add_menu = new menu_model();
                $add_menu = $do_add_menu->do_add_menu($menu_name,$menu_price,$member_id);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success seller';
                $return_value['member_type']=2;
                $return_value['data_set']='新增完成';
            
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

        }
        
        return json_encode($return_value);
    }

}

?>