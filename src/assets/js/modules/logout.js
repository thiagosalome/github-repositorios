import api from "./api";
class Logout{
  constructor(){
    this.headerUser = document.querySelector(".js-header-user");
    this.headerBox = document.querySelector(".js-header-box");
    this.headerLogout = document.querySelector(".js-header-logout");
  }

  logoutUser(){
    if(this.headerLogout !== null){
      this.headerLogout.addEventListener("click", e =>{
        e.preventDefault();
        localStorage.clear();
        location = "index.html";
      });
    }
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