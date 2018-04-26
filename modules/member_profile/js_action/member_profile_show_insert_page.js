class member_profile_show_insert_page extends ActionHandler {
  constructor(module, action, position_id) {
    super(module, action)
    this.position_id = position_id
  }
  prepareArgs () {
    this.php = false
  }

  showResult (xhttp) {
    var str = `
        <form action='index.php?action=do_insert_action' method='post'>
        姓名
        <input type="text" name="name"></br>
        電話
        <input type="text" name="tel"></br>
        生日
        <input type="text" name="birthday"></br>
        <input type="submit"></br>
      <div id="show_area"></div>`
    document.getElementById(this.position_id).innerHTML = str
  }
}
