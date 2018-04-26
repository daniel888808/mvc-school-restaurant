class show_all_costmer extends ActionHandler {
    constructor(module, action, position_id, member_type) {
        super(module, action)
        this.position_id = position_id;
        this.member_type = member_type;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('member_type', this.member_type);
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
                    <input type='button' value='修改' onclick="(new user_profile_show_update('user_profile','show_update','user_action')).run()">
                    <input type='button' value='刪除' onclick="(new user_profile_do_delete('user_profile','do_delete','show_menu_area')).run()">
                    <input type='button' value='儲值' onclick="(new money('user_profile','money','user_action')).run()">
                    <div id="user_action"></div>
                    `;
                    content += '<form name="user_form" id="user_form"><table><tr><td></td><td>id</td><td>帳號</td><td>密碼</td> <td>餘額<td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='member_id' id='member_id' value=" + ds[index]['member_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['member_id'] + '</td><td>' + ds[index]['member_account'] + '</td><td>' + ds[index]['member_passwd'] + '</td><td>' + ds[index]['member_money'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('user_profile', 'show_update');
                    this.loadModuleScript('user_profile', 'do_delete');
                    this.loadModuleScript('user_profile', 'money');
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
