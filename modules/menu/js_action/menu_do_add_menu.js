class do_add_menu extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var form_element = document.getElementById('add_menu_form');
        this.menu_name = form_element[0].value;
        this.menu_price = form_element[1].value;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('menu_name', this.menu_name);
        this.addArgs('menu_price', this.menu_price);
    }
    ajax_success(xhttp) {
      try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var content = '';
            var ds = obj['data_set'];
            if (obj['status_code'] === 0) {
                if (obj['member_type'] === 1) {
                    content += '管理者:您沒有權限執行此功能 ';
                }
                else if (obj['member_type'] === 2) {
                    content += ds;
                }
                else if (obj['member_type'] === 3) {
                    content += '會員:您沒有權限執行此功能 ';
                }
                else if (obj['member_type'] === 4) {
                    content += '遊客:您沒有權限執行此功能 ';
                }

                console.log("ajax success");
                console.log(xhttp.responseText);
                document.getElementById(this.position_id).innerHTML = content;
            }
            else {
                console.log(xhttp.responseText);
                console.log(obj['data_set']);

                document.getElementById(this.position_id).innerHTML = obj['status_message'];
                console.log("json_success_but_nodata");
            }
        }
        catch (Exception) {
            var msg = Exception + "<br>";
            msg += "JSON String: " + xhttp.responseText;
            document.getElementById(this.position_id).innerHTML = msg;
            console.log("ajax_success_but_somehow_error");

        }
    }
    ajax_error(msg) {
        document.getElementById(this.position_id).innerHTML = msg.status;
        console.log("ajax error");
        //console.log(xhttp.status);
    }

}
