class show_all_orders extends ActionHandler {
    constructor(module, action, position_id, ) {
        super(module, action)
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var content = '';
            var ds = obj['data_set'];
            if (obj['status_code'] === 0) {
                if (obj['member_type'] === 1) {
                    content += '<table><tr><td>編號</td><td>客戶</td><td>菜名</td><td>狀態</td> <td>數量</td><td>日期</td></tr>'
                    for (var index in ds) {
                        content += '<td>' + ds[index]['orders_id'] + '</td><td>' + ds[index]['member_account'] + '</td><td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['orders_status'] + '</td><td>' + ds[index]['orders_qty'] + '</td><td>' + ds[index]['orders_date'] + '</td></tr>';
                    }
                    content += '</table><br>';
                }
                else if (obj['member_type'] === 2) {
                    content += `
                    <input type='button' value='修改' onclick="(new orders_show_update('orders','show_update','show_menu_area')).run()">
                    <input type='button' value='刪除' onclick="(new orders_do_delete('orders','do_delete','show_menu_area')).run()">
                    <input type='button' value='完成訂單' onclick="(new finish_orders('orders','finish_orders','show_menu_area')).run()">
                    <div id="user_action"></div>
                    `;
                    content += '<form name="orders_form" id="orders_form"><table><tr><td></td><td>編號</td><td>客戶</td><td>菜名</td><td>狀態</td> <td>數量</td><td>日期</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='orders_id' id='orders_id' value=" + ds[index]['orders_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['orders_id'] + '</td><td>' + ds[index]['member_account'] + '</td><td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['orders_status'] + '</td><td>' + ds[index]['orders_qty'] + '</td><td>' + ds[index]['orders_date'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('orders', 'show_update');
                    this.loadModuleScript('orders', 'do_delete');
                    this.loadModuleScript('orders', 'finish_orders');
                }
                else if (obj['member_type'] === 3) {
                    content += '<table><tr><td>編號</td><td>客戶</td><td>菜名</td><td>狀態</td> <td>數量</td><td>日期</td></tr>'
                    for (var index in ds) {
                        content += '<td>' + ds[index]['orders_id'] + '</td><td>' + ds[index]['member_account'] + '</td><td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['orders_status'] + '</td><td>' + ds[index]['orders_qty'] + '</td><td>' + ds[index]['orders_date'] + '</td></tr>';
                    }
                    content += '</table><br>';
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
