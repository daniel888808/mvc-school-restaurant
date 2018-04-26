class home_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action)
        this.position_id = position_id
    }
    prepareArgs() {
        this.php = true;
        //this.php_action='do_login'
    }
    //showResult(xhttp) {
    //var str = `
    //<input type='button' value='登出' onclick="(new logout('login','logout','content')).run()">
    //<input type='button' value='查看菜單' onclick="(new member_profile_show_insert_page('member_profile','show_insert_page','show_area')).run()">
    //`;
    // document.getElementById(this.position_id).innerHTML = str;
    //this.loadModuleScript('login', 'logout');
    // this.loadModuleScript('login', 'login_page');
    //}

    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var content = '';
            if (obj['status_code'] === 0) {
                if (obj['member_type'] === 1) {
                    content += '管理者:您的功能 ';
                    content += `
                        <input type='button' value='登出' onclick="(new logout('login','logout','content')).run()">
                        <input type='button' value='查看菜單' onclick="(new show_seller('menu','show_seller','show_menu_area')).run()">
                        <input type='button' value='查看所有會員' onclick="(new show_all_costmer('user_profile','show_all_costmer','show_menu_area','3')).run()">
                        <input type='button' value='查看所有賣家' onclick="(new show_all_costmer('user_profile','show_all_costmer','show_menu_area','2')).run()">
                        <input type='button' value='查看所有訂單' onclick="(new show_all_orders('orders','show_all_orders','show_menu_area')).run()">
                        <input type='button' value='訂單狀況' onclick="(new orders_status('orders','orders_status','show_menu_area')).run()">
                        <br>
                        <div id="show_menu_area"></div>
                        `;
                    this.loadModuleScript('login', 'logout');
                    this.loadModuleScript('menu', 'show_seller');
                    this.loadModuleScript('user_profile', 'show_all_costmer');
                    this.loadModuleScript('orders', 'show_all_orders');
                    this.loadModuleScript('orders', 'orders_status');
                    this.loadModuleScript('user_profile', 'money');
                }
                else if (obj['member_type'] === 2) {
                    content += '店家:您的功能 ';
                    content += `
                        <input type='button' value='登出' onclick="(new logout('login','logout','content')).run()">
                        <input type='button' value='查看菜單' onclick="(new show_menu('menu','show_menu','show_menu_area')).run()">
                        <input type='button' value='查看訂單' onclick="(new show_all_orders('orders','show_all_orders','show_menu_area')).run()">
                        <br>
                        <div id="show_menu_area"></div>
                        `;
                    this.loadModuleScript('login', 'logout');
                    this.loadModuleScript('menu', 'show_menu');
                    this.loadModuleScript('orders', 'show_all_orders');
                }
                else if (obj['member_type'] === 3) {
                    content += '會員:您的功能 ';
                    content += `
                        <input type='button' value='登出' onclick="(new logout('login','logout','content')).run()">
                        <input type='button' value='查看菜單' onclick="(new show_seller('menu','show_seller','show_menu_area')).run()">
                        <input type='button' value='訂單狀況' onclick="(new orders_status('orders','orders_status','show_menu_area')).run()">
                        <br>
                        <div id="show_menu_area"></div>
                        `;
                    this.loadModuleScript('login', 'logout');
                    this.loadModuleScript('menu', 'show_seller');
                    this.loadModuleScript('orders', 'orders_status');
                }
                else if (obj['member_type'] === 4) {
                    content += '遊客:您的功能 ';
                    content += `
                        <input type='button' value='查看菜單' onclick="(new show_seller('menu','show_seller','show_menu_area')).run()">
                        <br>
                        <div id="show_menu_area"></div>
                        `;
                    this.loadModuleScript('menu', 'show_seller');
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
