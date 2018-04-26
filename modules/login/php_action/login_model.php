<?php 
require_once (__ROOT__ .'/include/php/model.php');
class login_model extends model{
    public function __construct() {
            parent::__construct();
        }
        public function do_login($where_statement,$account){
            $sql = "SELECT * FROM `mvc_member` where $where_statement";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            if ($result != NULL) {
                $_SESSION['login_user']=$account;
                $_SESSION['login_id']=$result['0']['member_id'];
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = <<<EOT
                login success <br><div style="display: inline" onclick="(new home_page('home', 'home_page', 'content')).run()">瀏覽目錄</div>
EOT;
            } else {
                $return_value['status_code'] = -1;
                $return_value['status_message'] = "login error  $where_statement 2 $sql";
                $return_value['sql'] = $sql;
                $return_value['data_set'] ='login field';
            } 
            return $return_value;
        }
}
