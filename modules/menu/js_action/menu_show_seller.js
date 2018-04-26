class show_seller extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action)
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
        console.log(this.member_id);
        //this.php_action='do_login'
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var content = '請選擇店家';
            var ds = obj['data_set'];
            if (obj['status_code'] === 0) {
                if (obj['member_type'] === 1) {
                    content += `
                    <input type='button' value='查看菜單' onclick="(new show_menu('menu','show_menu','show_menu_area')).run()">
                    <div id="menu_action"></div>
                    `;
                    content += '<form name="seller_form" id="seller_form"><table><tr><td></td><td>店家</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='seller_id' id='seller_id' value=" + ds[index]['member_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['member_account'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('menu', 'show_menu');
                }
                else if (obj['member_type'] === 2) {
                    content += '店家:您沒有權限執行此功能(show_seller) ';
                }
                else if (obj['member_type'] === 3) {
                    content += `
                    <input type='button' value='查看菜單' onclick="(new show_menu('menu','show_menu','show_menu_area')).run()">
                    <div id="menu_action"></div>
                    `;
                    content += '<form name="seller_form" id="seller_form"><table><tr><td></td><td>店家</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='seller_id' id='seller_id' value=" + ds[index]['member_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['member_account'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('menu', 'show_menu');
                }
                else if (obj['member_type'] === 4) {
                    content += `
                    <input type='button' value='查看菜單' onclick="(new show_menu('menu','show_menu','show_menu_area')).run()">
                    <div id="menu_action"></div>
                    `;
                    content += '<form name="seller_form" id="seller_form"><table><tr><td></td><td>店家</td></tr>'
                    for (var index in ds) {
                        content += "<tr><td><input type=radio name='seller_id' id='seller_id' value=" + ds[index]['member_id'] + ">" + "</td> ";
                        content += '<td>' + ds[index]['member_account'] + '</td></tr>';
                    }
                    content += '</table><br></form>';
                    this.loadModuleScript('menu', 'show_menu');
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
