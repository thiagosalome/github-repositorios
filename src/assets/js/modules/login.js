import api from "./api";
import Repositories from "./repositories";
import Message from "./message";
class Login{
  constructor(){
    this.loginUserName = document.querySelector(".js-login-username");
    this.loginForm = document.querySelector(".js-login-form");
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
        Message.show("Usuário não existe.");
      }
    }
    else{
      Message.show("Campo usuário vazio");
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
    repositories.registerHandlers();
    repositories.list();
    repositories.favorites();
  }
}

export default Login;