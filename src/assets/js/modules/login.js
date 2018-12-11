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
        window.user.info = response.data;
        localStorage.setItem("user", JSON.stringify(window.user));
        location = "internal.html";
      } catch (error) {
        console.log(error);
        Message.show("Usuário não existe.");
      }
    }
    else{
      Message.show("Campo usuário vazio");
    }
  }

  setDataUser(){
    if(window.user.info !== null && typeof window.user.info === "object"){
      if(location.href.indexOf("internal") > -1){
        const {name, avatar_url} = window.user.info;
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
    repositories.updateFavorites();
  }
}

export default Login;