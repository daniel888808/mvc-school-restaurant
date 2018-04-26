class orders_status extends ActionHandler {
    constructor(module, action, position_id) {
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
                    content += ``;
                    content += '<table><td>菜名</td><td>狀態<td></tr>'
                    for (var index in ds) {
                        content += '<td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['orders_status'] + '</td></tr>';
                    }
                    content += '</table><br>';
                }
                else if (obj['member_type'] === 2) {
                    content += '店家:您沒有權限執行此功能 ';
                }
                else if (obj['member_type'] === 3) {
                    content += ``;
                    content += '<table><td>菜名</td><td>狀態<td></tr>'
                    for (var index in ds) {
                        content += '<td>' + ds[index]['menu_name'] + '</td><td>' + ds[index]['orders_status'] + '</td></tr>';
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
