class orders_list extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var menu_id = document.getElementById('menu_form').menu_id.value;
        this.menu_id = menu_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('menu_id', this.menu_id);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var content = '';
            var ds = obj['data_set'];
            if (obj['status_code'] === 0) {
                if (obj['member_type'] === 1) {
                    content += `
                        
                        <p>餐點:</p><p>` + ds['0']['menu_name'] + `</p>
                        <p>價格:</p><p>` + ds['0']['menu_price'] + `</p>
                        <form name="orders_form" id="orders_form">
		                <p>數量:</p><p><input type="text" name="orders_qty" id="orders_qty" value="1"></p>
		                <p><input type="button" value="點餐" placeholder="請輸入數量" onclick="(new do_orders('orders','do_orders','show_menu_area',` + this.menu_id + `)).run()"/></p>
		                <p>您的餘額` + obj['money'] + `</p>
                        </form>
                    `;
                    this.loadModuleScript('orders', 'do_orders');
                }
                else if (obj['member_type'] === 2) {
                    content += '店家:您沒有權限執行此功能 ';
                }
                else if (obj['member_type'] === 3) {
                    content += `
                        
                        <p>餐點:</p><p>` + ds['0']['menu_name'] + `</p>
                        <p>價格:</p><p>` + ds['0']['menu_price'] + `</p>
                        <form name="orders_form" id="orders_form">
		                <p>數量:</p><p><input type="text" name="orders_qty" id="orders_qty" value="1"></p>
		                <p><input type="button" value="點餐" placeholder="請輸入數量" onclick="(new do_orders('orders','do_orders','show_menu_area',` + this.menu_id + `)).run()"/></p>
                        <p>您的餘額` + obj['money'] + `</p>
                        </form>
                    `;
                    this.loadModuleScript('orders', 'do_orders');
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
