class orders_show_update extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var orders_id = document.getElementById('orders_form').orders_id.value;
        this.orders_id = orders_id;
        console.log(this.orders_id);
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('order_id', this.orders_id);
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
                    content += `
                        <form name="orders_update_form" id="orders_update_form">
                        <p>菜名:</p><p>` + ds['0']['menu_name'] + `</p>
		                <p>數量:</p><p><input type="text" name="orders_qty" id="orders_qty" value="` + ds['0']['orders_qty'] + `"></p>
		                <p><input type="button" value="更改"  onclick="(new orders_do_update('orders','do_update','show_menu_area',` + this.orders_id + `)).run()"/></p>
                        </form>
                    `;
                    this.loadModuleScript('orders', 'do_update');

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
