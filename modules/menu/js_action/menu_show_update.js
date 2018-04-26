class menu_show_update extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var menu_id = document.getElementById('menu_form').menu_id.value;
        this.menu_id = menu_id;
        console.log(this.member_id);
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
                    content += '管理者: 你沒這功能'
                }
                else if (obj['member_type'] === 2) {
                    content += `
                        <form name="user_update_form" id="menu_update_form">
                        <p>菜名:</p><p><input type="text" name="menu_name" id="menu_name" value="` + ds['0']['menu_name'] + `"></p>
		                <p>價格:</p><p><input type="text" name="menu_price" id="menu_price" value="` + ds['0']['menu_price'] + `"></p>
		                <p><input type="button" value="更改"  onclick="(new menu_do_update('menu','do_update','show_menu_area',` + this.menu_id + `)).run()"/></p>
                        </form>
                    `;
                    this.loadModuleScript('menu', 'do_update');
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
