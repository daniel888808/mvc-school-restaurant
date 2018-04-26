class add_menu extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action)
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false
        //this.php_action='do_login'
    }
    showResult(xhttp) {
        var str = `
        <form name="add_menu_form" id="add_menu_form">
        <p>菜名:</p><p><input type="text" name="menu_name" id="menu_name" placeholder="請輸入菜名"></p>
		<p>價格:</p><p><input type="text" name="menu_price" id="menu_price" placeholder="請輸入價格"></p>
        </form>
        <input type='button' value='新增' onclick="(new do_add_menu('menu','do_add_menu','show_menu_area')).run()">
        `
        document.getElementById(this.position_id).innerHTML = str
        this.loadModuleScript('menu', 'do_add_menu');
    }

    //function loginacc(account){
    // document.getElementById(this.position_id).innerHTML =account;
    //}
    //function loginpasswd(passwd){
    // document.getElementById(this.position_id).innerHTML = passwd;
    //}
}
