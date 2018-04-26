class do_signup extends ActionHandler {
    constructor(module, action, position_id, member_type) {
        super(module, action);
        this.position_id = position_id;
        this.member_type = member_type;
        var form_element = document.getElementById('signup_form');
        this.account = form_element[0].value;
        this.passwd = form_element[1].value;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('account', this.account);
        this.addArgs('passwd', this.passwd);
        this.addArgs('member_type',this.member_type);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var content = 'message: 註冊完成';
                var ds = obj['data_set'];
                content += ds;
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
