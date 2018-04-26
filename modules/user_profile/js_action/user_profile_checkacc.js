class checkacc extends ActionHandler {
    constructor(module, action, position_id, member_type) {
        super(module, action);
        this.position_id = position_id;
        this.member_type = member_type;
        var form_element = document.getElementById("signup_form");
        this.account = form_element[0].value;
    }
    prepareArgs() {
        this.php = true;
        var where_statement = "member_account='" + this.account + "'";
        this.addArgs('where_statement', where_statement);
        this.addArgs('account', this.account);
        //this.addArgs('passwd', this.passwd);
    }
    ajax_success(xhttp) {
        var content = '';
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            content += 'alert: ';
            var ds = obj['data_set'];
            if (obj['status_code'] === 0) {
                content += ds;
                console.log("ajax success");
            }
            else if (obj['status_code'] === 1) {
                content += `<p><input type="button" value="註冊"  onclick="(new do_signup('user_profile','do_signup','content',` + this.member_type + `)).run()"/></p><p>可以用</p>`
                console.log("ajax success account ok");
                //console.log(obj['status_mesage']);
                //console.log(xttp.responseText);
            }
            document.getElementById(this.position_id).innerHTML = content;
        }
        catch (Exception) {
            var msg = Exception + "<br>";
            msg += "JSON String: " + xhttp.responseText;
            document.getElementById(this.position_id).innerHTML = msg;
            console.log("ajax_success_but_somehow_error");

        }
    }
    ajax_error(xhttp) {
        document.getElementById(this.position_id).innerHTML = xhttp.status;
        console.log("ajax error");
        console.log(xhttp.responseText);
        //console.log(xhttp.status);
    }

}
