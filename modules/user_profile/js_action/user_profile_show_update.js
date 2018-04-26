class user_profile_show_update extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var member_id = document.getElementById('user_form').member_id.value;
        this.member_id = member_id;
        console.log(this.member_id);
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('member_id', this.member_id);
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
                        <form name="user_update_form" id="user_update_form">
                        <p>帳號:</p><p><input type="text" name="account" id="account" value="` + ds['0']['member_account'] + `"></p>
		                <p>密碼:</p><p><input type="text" name="passwd" id="passwd" value="` + ds['0']['member_passwd'] + `"></p>
		                <p>餘額:</p><p><input type="text" name="money" id="passwd" value="` + ds['0']['member_money'] + `"></p>
		                <p><input type="button" value="更改"  onclick="(new user_profile_do_update('user_profile','do_update','show_menu_area',` + this.member_id + `)).run()"/></p>
                        </form>
                    `;
                    this.loadModuleScript('user_profile', 'do_update');
                }
                else if (obj['member_type'] === 2) {
                    content += '店家:您沒有權限執行此功能 ';
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
