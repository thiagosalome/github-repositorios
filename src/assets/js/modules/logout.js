class Logout{
  constructor(){
    this.headerUser = document.querySelector(".js-header-user");
    this.headerBox = document.querySelector(".js-header-box");
  }

  toggleBox(){
    if(this.headerUser !== null){
      this.headerUser.addEventListener("click", e => {
        this.headerBox.classList.toggle("active");
      });
    }
  }
}

export default Logout;