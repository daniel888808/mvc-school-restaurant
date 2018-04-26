<?php

require_once (__ROOT__ .'/include/php/action_listener.php');
require_once (__ROOT__ .'/include/php/event_message.php');
require_once (__ROOT__ .'/include/php/PDO_mysql.php');
require_once (__ROOT__ .'/modules/user_profile/php_action/user_profile_model.php');
require_once (__ROOT__ .'/modules/orders/php_action/orders_model.php');
require_once (__ROOT__ .'/modules/menu/php_action/menu_model.php');

class do_orders implements action_listener {

    public function actionPerformed($em) {
        $post = $em->getPost();
        $menu_id=$post['menu_id'];
        $orders_qty=$post['orders_qty'];
        $date=date("Y-m-d");
		if(isset($_SESSION['login_user'])){
			$account=$_SESSION['login_user'];
		}
		if(isset($_SESSION['login_id'])){
			$member_id=$_SESSION['login_id'];
		}
        
        $get_member_type = new user_profile_model();
        $member_type = $get_member_type->get_member_type($account);
        switch ($member_type['member_type']['0']['member_type']) {
            case 1:
                $get_money = new user_profile_model();
                $member_money= $get_money->get_money($member_id);
                $money=$member_money['data_set']['0']['member_money'];
                
                $get_menu_price = new menu_model();
                $menu_price = $get_menu_price->get_menu_price($menu_id);
                $price=$menu_price['data_set']['0']['menu_price'];
                $newmoney=$money-$price;
                if ($newmoney >= 0) {
                    $add_orders = new orders_model();
                    $do_update_costmer = $add_orders->add_orders($member_id,$menu_id,'undone',$orders_qty,$date);
                    $return_value['status_code'] = 0;
                    $return_value['status_message'] = 'Execute Success managementacc '.$member_id.',id '.$menu_id.',qty '.$orders_qty.'date '.$date;
                    $return_value['member_type']=1;
                    $return_value['data_set']='訂餐完成 您的餘額'.$newmoney;
                    $return_value['money']=$newmoney;
                    $do_update_price = new user_profile_model();
                    $_price = $do_update_price->do_update_price($member_id,$newmoney);
                    
                }else{
                    $return_value['status_code'] = 0;
                    $return_value['status_message'] = 'Execute Success managementacc '.$member_id.',id '.$menu_id.',qty '.$orders_qty.'date '.$date;
                    $return_value['member_type']=1;
                    $return_value['data_set']='餘額不足';
                }
                
                break;
            case 2:
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success seller';
                $return_value['member_type']=2;
            
                break;
            case 3:
                
                $get_money = new user_profile_model();
                $member_money= $get_money->get_money($member_id);
                $money=$member_money['data_set']['0']['member_money'];
                
                $get_menu_price = new menu_model();
                $menu_price = $get_menu_price->get_menu_price($menu_id);
                $price=$menu_price['data_set']['0']['menu_price'];
                $newmoney=$money-$price;
                if ($newmoney >= 0) {
                   $add_orders = new orders_model();
                    $do_update_costmer = $add_orders->add_orders($member_id,$menu_id,'undone',$orders_qty,$date);
                    $return_value['status_code'] = 0;
                    $return_value['status_message'] = 'Execute Success costmer';
                    $return_value['member_type']=3;
                    $return_value['data_set']='訂餐完成 您的餘額'.$newmoney;
                    $do_update_price = new user_profile_model();
                    $_price = $do_update_price->do_update_price($member_id,$newmoney);
                    
                }else{
                    $return_value['status_code'] = 0;
                        $return_value['status_message'] = 'Execute Success costmer';
                        $return_value['member_type']=3;
                    $return_value['data_set']='餘額不足';
                }
                
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