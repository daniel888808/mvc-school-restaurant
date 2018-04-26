class show_menu extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action)
        this.position_id = position_id;
        try {
            var member_id = document.getElementById('seller_form').seller_id.value;
            this.member_id = member_id;
        }
        catch (err) {
            console.log('seller_him_self');
        }

        console.log(this.member_id);
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('member_id', this.member_id);
        //this.php_action='do_login'
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
                    <input type='button' value='修改' onclick="(new show_update('menu','show_update','menu_action')).run()">
                    <input type='button' value='刪除' onclick="(new menu_do_delete('menu','do_delete','show_menu_area')).run()">
                    <input type='button' value='點餐' onclick="(new orders_list('orders','orders_list','show_menu_area')).run()">
                    <div id="menu_action"></div>
                    `;
                    content += '<form name="menu_form" id="menu_form"><table><tr><td></td><td>菜名</td><td>價格</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='menu_id' id='menu_id' value=" + ds[index]['menu_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['menu_price'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('menu', 'show_update');
                    this.loadModuleScript('menu', 'do_delete');
                    this.loadModuleScript('orders', 'orders_list');
                }
                else if (obj['member_type'] === 2) {
                    content += `
                    <input type='button' value='修改' onclick="(new menu_show_update('menu','show_update','menu_action')).run()">
                    <input type='button' value='刪除' onclick="(new menu_do_delete('menu','do_delete','show_menu_area')).run()">
                    <input type='button' value='新增' onclick="(new add_menu('menu','add_menu','show_menu_area')).run()">
                    <div id="menu_action"></div>
                    `;
                    content += '<form name="menu_form" id="menu_form"><table><tr><td></td><td>菜名</td><td>價格</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='menu_id' id='menu_id' value=" + ds[index]['menu_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['menu_price'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('menu', 'show_update');
                    this.loadModuleScript('menu', 'do_delete');
                    this.loadModuleScript('menu', 'add_menu');
                }
                else if (obj['member_type'] === 3) {
                    content += `
                    <input type='button' value='點餐' onclick="(new orders_list('orders','orders_list','show_menu_area')).run()">
                    <div id="menu_action"></div>
                    `;
                    content += '<form name="menu_form" id="menu_form"><table><tr><td></td><td>菜名</td><td>價格</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='menu_id' id='menu_id' value=" + ds[index]['menu_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['menu_price'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('orders', 'orders_list');
                }
                else if (obj['member_type'] === 4) {
                    content += '<form name="menu_form" id="menu_form"><table><tr><td>菜名</td><td>價格</td></tr>'
                    for (var index in ds) {
                        content += '<td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['menu_price'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('orders', 'orders_list');
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
