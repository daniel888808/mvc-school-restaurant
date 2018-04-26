class money extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        var member_id = document.getElementById('user_form').member_id.value;
        this.member_id = member_id;
        console.log(this.member_id);
    }
    prepareArgs() {
        this.php = false;
    }
    showResult(xhttp) {
        var content = '';
        content += `
                        <form name="money_form" id="money_form">
                        <p>儲值金額:</p><p><input type="text" name="money" id="money"></p>
		                <p><input type="button" value="儲值"  onclick="(new do_money('user_profile','do_money','show_menu_area',` + this.member_id + `)).run()"/></p>
                        </form>
                    `;
        this.loadModuleScript('user_profile', 'do_money');
        document.getElementById(this.position_id).innerHTML = content;

    }



}
