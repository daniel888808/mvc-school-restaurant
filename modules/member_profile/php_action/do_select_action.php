<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/event_message.php';
require_once 'include/php/PDO_mysql.php';

class do_select_action implements action_listener {

    public function actionPerformed($em) {
        $conn = PDO_mysql::getConnection();
        $sql = 'SELECT * FROM `student_profile2`';
        $post = $em->getPost();
        $where_statement=1;
        //$where_statement = $post['where_statement'];
          //if ($where_statement = "") {
            //  $where_statement='1';
         // }
             $sql .= " where $where_statement";
         
             //$stmt = $conn->prepare($sql);
             //$result = $stmt->execute();
             $stmt = $conn->prepare($sql);
             $stmt->execute();
              $result = $stmt->fetchAll();
         

        if ($result != NULL) {
            //$ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_value['status_code'] = 0;
            $return_value['status_message'] = 'Execute Success';
            $return_value['data_set'] = $result;
        } else {
            $return_value['status_code'] = -1;
            $return_value['status_message'] = 'Execute Error';
            $return_value['sql'] = $sql;
        } return json_encode($return_value);
    }

}

?>
