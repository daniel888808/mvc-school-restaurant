<?php 
require_once (__ROOT__ .'/include/php/model.php');
class orders_model extends model{
    public function __construct() {
        parent::__construct();
        }
       
         public function add_orders($member_id,$menu_id,$orders_status,$orders_qty,$date){
            $sql = "INSERT INTO `mvc_orders` (`orders_id`, `member_id`, `menu_id`, `orders_status`, `orders_qty`, `orders_date`) VALUES (NULL, '$member_id', '$menu_id', '$orders_status', '$orders_qty', '$date');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $return_value['status_code'] = 0;
            $return_value['status_message'] = 'Execute Success';
            return $return_value;
        }
         public function get_orders($statement,$wherestatemnt){
            $sql = "SELECT $statement FROM `mvc_orders` WHERE $wherestatemnt";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
         }
         public function get_orders_status($member_id,$date){
            $sql = "SELECT orders_status,menu_name FROM `mvc_orders` JOIN mvc_menu ON mvc_menu.menu_id = mvc_orders.menu_id where mvc_orders.member_id = $member_id and orders_date = '$date'";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
         }
         public function get_all_orders($wherestatemnt){
            $sql = "SELECT orders_id, member_account,menu_name,orders_status,orders_qty,orders_date FROM `mvc_orders` JOIN mvc_menu ON mvc_menu.menu_id = mvc_orders.menu_id join mvc_member on mvc_member.member_id=mvc_orders.member_id where $wherestatemnt";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
         }
         
         public function get_update_orders($orders_id){
            $sql = "SELECT * FROM mvc_orders join mvc_member on mvc_orders.member_id=mvc_member.member_id WHERE orders_id= $orders_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }else {
                $return_value['data_set']='error';
            }
            return $return_value;
        }
        public function do_update_orders_status($orders_status,$orders_id){
            $sql = "UPDATE `mvc_orders` SET `orders_status` = '$orders_status' WHERE `mvc_orders`.`orders_id` = $orders_id;";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function do_delete_orders($orders_id){
            $sql = "DELETE FROM `mvc_orders` WHERE `mvc_orders`.`orders_id` =$orders_id ";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
}
