<?php 
require_once (__ROOT__ .'/include/php/model.php');
class menu_model extends model{
    public function __construct() {
        parent::__construct();
        }
       public function get_menu($menu_id){
           $sql = "SELECT * FROM `mvc_menu` WHERE menu_id = $menu_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
       }
        
       public function do_add_menu($menu_name,$menu_price,$member_id){
            $sql = "INSERT INTO `mvc_menu` (`menu_id`, `menu_name`, `menu_price`, `seller_id`) VALUES (NULL, '$menu_name', '$menu_price', '$member_id');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        
        public function get_all_menu($member_id){
            $sql = "SELECT * FROM `mvc_menu` WHERE seller_id = $member_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
        }
        public function get_update_menu($menu_id){
            $sql = "SELECT * FROM `mvc_menu` WHERE menu_id= '$menu_id';";
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
        
        public function do_update_menu($menu_name,$menu_price,$member_id,$menu_id){
            $sql = "UPDATE `mvc_menu` SET `menu_name` = '$menu_name', `menu_price` = '$menu_price', `seller_id` = '$member_id' WHERE `mvc_menu`.`menu_id` = $menu_id;";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function do_delete_menu($menu_id){
            $sql = "DELETE FROM `mvc_menu` WHERE `mvc_menu`.`menu_id` =$menu_id ";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function get_menu_price($menu_id){
            $sql = "SELECT menu_price FROM `mvc_menu` WHERE menu_id = $menu_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
        }
        
        

    
}
