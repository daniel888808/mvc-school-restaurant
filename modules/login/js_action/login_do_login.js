class do_login extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var form_element = document.getElementById('login_form');
        this.account = form_element[0].value;
        this.passwd = form_element[1].value;
    }
    prepareArgs() {
        this.php = true;
        var where_statement = "member_account='" + this.account + "' and member_passwd='" + this.passwd + "'";
        this.addArgs('where_statement', where_statement);
        this.addArgs('account', this.account);
        this.addArgs('passwd', this.passwd);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var content='';
            var ds = obj['data_set'];
            if (obj['status_code'] === 0) {
                content += 'message: ';
                content+=`login success <br><div style="display: inline" onclick="(new home_page('home', 'home_page', 'content')).run()">瀏覽目錄</div>`;
                console.log("ajax success");
                this.loadModuleScript('home', 'home_page');
                //console.log(xttp.responseText);
                document.getElementById(this.position_id).innerHTML = content;
            }else if(obj['status_code']===-1){
                content+='登入失敗'
                content+=`<input type="button" value="回登入畫面"  onclick="(new login_page('login','login_page','content')).run()"/>`
            }
            else {
                var sql = obj['sql'];
                console.log(sql);
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
