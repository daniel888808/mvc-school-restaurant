class member_profile_do_select_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('where_statement', '1');
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var content = '<table><tr><td>編號</td><td> 姓名</td><td> 電話</td> <td>生日<td></tr>';
                var ds = obj['data_set'];
                for (var index in ds) {
                    content += '<tr><td>' + ds[index]['student_id'] + '</td><td>' + ds[index]['student_name'] + '</td><td>' + ds[index]['tel'] + '</td><td>' + ds[index]['birthday'] + '</td></tr>';
                }
                content += '</table><br>';
                // var content = '編號 姓名 電話 生日<br>';
                //   var ds = obj['data_set'];
                //for (var index in ds) {
                //     content += ds[index]['student_id'] +ds[index]['0'] + ds[index]['student_name'] +ds[index]['1'] + ds[index]['tel'] +ds[index]['2'] +ds[index]['3'] + ds[index]['birthday'];
                //}
                //  for (var index in ds) {
                //     content += ds[index]['student_id'] + ds[index]['student_name'] + ds[index]['tel'] + ds[index]['birthday']+'<br>';
                //    }


                console.log("ajax success");
                document.getElementById(this.position_id).innerHTML = content;
            }
            else {
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
