class login_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action)
        this.position_id = position_id
    }
    prepareArgs() {
        this.php = false

    }
    showResult(xhttp) {
        var str = `
        <form name="login_form" id="login_form">
        <p>帳號:</p><p><input type="text" name="account" id="account" placeholder="請輸入帳號"></p>
		<p>密碼:</p><p><input type="password" name="passwd" id="passwd" placeholder="請輸入密碼"></p>
		<p><input type="button" value="登入"  onclick="(new do_login('login','do_login','content')).run()"/></p>
		新用戶?
	  	<input type="button" value="註冊" onclick="(new signup('user_profile','signup','content','3')).run()"/>
        <br>
        新店家?
	  	<input type="button" value="註冊" onclick="(new signup('user_profile','signup','content','2')).run()"/>
        <br>
        </form>
        <div id="login_message"></div>
        <div id="show_area"></div>
        `;
        document.getElementById(this.position_id).innerHTML = str;
        this.loadModuleScript(this.module, 'do_login');
        this.loadModuleScript('home', 'home_page');
        this.loadModuleScript('user_profile', 'signup');

    }
}
