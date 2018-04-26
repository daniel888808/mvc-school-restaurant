class signup extends ActionHandler {
    constructor(module, action, position_id, member_type) {
        super(module, action)
        this.position_id = position_id;
        this.member_type = member_type;
    }
    prepareArgs() {
        this.php = false
        //this.php_action='do_login'
    }
    showResult(xhttp) {
        var str = `
        <form name="signup_form" id="signup_form">
        <p>帳號:</p><p><input type="text" name="account" id="account" placeholder="請輸入帳號" onkeyup="(new checkacc('user_profile', 'checkacc', 'signup_message',` + this.member_type + `)).run()"></p>
		<p>密碼:</p><p><input type="password" name="passwd" id="passwd" placeholder="請輸入密碼"></p>
        </form>
        <div id="signup_message"></div>
        <input type="button" value="回登入畫面"  onclick="(new login_page('login','login_page','content')).run()"/>
        `
        document.getElementById(this.position_id).innerHTML = str
        this.loadModuleScript(this.module, 'do_signup')
        this.loadModuleScript(this.module, 'checkacc')
        this.loadModuleScript('home', 'home_page')
        this.loadModuleScript('login', 'login_page')
    }

    //function loginacc(account){
    // document.getElementById(this.position_id).innerHTML =account;
    //}
    //function loginpasswd(passwd){
    // document.getElementById(this.position_id).innerHTML = passwd;
    //}
}
