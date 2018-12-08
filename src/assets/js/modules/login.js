import api from "./api";
import Repositories from "./repositories";
class Login{
  constructor(){
    this.loginUserName = document.querySelector(".js-login-username");
    this.loginForm = document.querySelector(".js-login-form");
    this.loginMessage = document.querySelector(".js-login-message");
    this.userName = document.querySelector(".js-user-name");
    this.userAvatar = document.querySelector(".js-user-avatar");
  }

  registerHandlers(){
    if(this.loginForm !== null){
      this.loginForm.addEventListener("submit", e => {
        this.validateUser(e);
      });
    }
  }

  async validateUser(e){
    e.preventDefault();
    if(this.loginUserName.value.trim() !== ""){
      try {
        const response = await api.get(`/users/${this.loginUserName.value}`);
        localStorage.setItem("user", JSON.stringify(response.data));
        location = "internal.html";
      } catch (error) {
        this.showMessage("Usuário não existe.");
      }
    }
    else{
      this.showMessage("Campo usuário vazio");
    }
  }

  setDataUser(){
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user !== null && typeof this.user === "object"){
      if(location.pathname === "/internal.html" ){
        const {name, avatar_url} = JSON.parse(localStorage.getItem("user"));
        this.userName.innerHTML = name;
        this.userAvatar.querySelector("img").setAttribute("src", avatar_url);
        this.configRepositories();
      }
      else{
        location = "internal.html";
      }
    }
    else if(location.pathname === "/internal.html" ){
      location = "index.html";
    }
  }

  configRepositories(){
    const repositories = new Repositories();
    repositories.search();
    repositories.list();
    repositories.favorites();
  }

  showMessage(message){
    let loginMessage = this.loginMessage;
    loginMessage.innerHTML = message;
    loginMessage.classList.add("active");
    setTimeout(function (){
      loginMessage.classList.remove("active");
      loginMessage.innerHTML = "";
    }, 2000);
  }

}

export default Login;