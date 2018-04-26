<?php 
require_once (__ROOT__ .'/include/php/model.php');
class user_profile_model extends model{
    public function __construct() {
        parent::__construct();
        }
        public function checkacc($where_statement){
            $sql = "SELECT * FROM `mvc_member` where $where_statement";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            if ($result != null) {
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = "此帳號已被使用";
                
            }
            else {
                $return_value['status_code'] = 1;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = '可以用';
                }
            return $return_value;
        }
        
        public function do_signup($account,$passwd,$member_type){
            $sql = "INSERT INTO `mvc_member` (`member_id`, `member_account`, `member_passwd`, `member_money`, `member_type`) VALUES (NULL, '$account', '$passwd', '0', '$member_type');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $_SESSION['login_user']=$account;
            $return_value['status_code'] = 0;
            $return_value['status_message'] = 'Execute Success';
            $return_value['data_set'] = <<<EOT
            註冊完成，已登入
            <input type="button" value="回首頁"  onclick="(new home_page('home','home_page','content')).run()"/>
EOT;
            return $return_value;
        }
        
        public function get_member_type($account){
            $sql = "SELECT member_type FROM `mvc_member` where member_account ='$account'";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['member_type'] = $result;
                
            }
            else {
                $return_value['member_type']['0']['member_type']=4;
                }
            $_SESSION['member_type']=$result['0']['member_type'];
            return $return_value;
        }
        
        public function get_money($member_id){
            $sql = "SELECT member_money FROM `mvc_member` WHERE member_id=$member_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
        }
        public function get_all_costmer($statement,$member_type){
            $sql = "SELECT $statement FROM `mvc_member` WHERE member_type=$member_type";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
                
            }
            return $return_value;
        }
       
        public function get_update_costmer($member_id){
            $sql = "SELECT member_account,member_passwd,member_money FROM `mvc_member` WHERE member_id= '$member_id';";
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
        public function do_update_costmer($account,$passwd,$money,$member_id){
            $sql = "UPDATE `mvc_member` SET `member_account` = '$account', `member_passwd` = '$passwd', `member_money` = '$money' WHERE `mvc_member`.`member_id` = $member_id;";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function do_delete_costmer($member_id){
            $sql = "DELETE FROM `mvc_member` WHERE `mvc_member`.`member_id` =$member_id ";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function do_update_price($member_id,$member_money){
            $sql = "UPDATE `mvc_member` SET `member_money` = '$member_money' WHERE `mvc_member`.`member_id` = $member_id;";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
      
    
}
