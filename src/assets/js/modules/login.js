import api from "./api";

class Login{
  constructor(){
    this.loginUser = document.querySelector(".js-login-user");
    this.loginForm = document.querySelector(".js-login-form");
    this.loginMessage = document.querySelector(".js-login-message");
  }

  registerHandlers(){
    /* 
      Quando clicar no submit
        Se o campo usuário não estiver vazio
          Acessa a API do github
            Se o usuário existir
              Salva ele no localStorage
              Leva para interna
            Se não existir
              Exibir mensagem
        Se estiver vazio
          Exibir mensagem
    */
    if(this.loginForm !== null){
      this.loginForm.addEventListener("submit", e => {
        this.validateUser(e);
      });
    }
  }

  async validateUser(e){
    e.preventDefault();
    if(this.loginUser.value.trim() !== ""){
      try {
        const response = await api.get(`/users/${this.loginUser.value}`);
        const {login, name, avatar_url, repos_url} = response.data;
        const user = {login, name, avatar_url, repos_url};
        localStorage.setItem("user", user);
        location = "internal.html";

      } catch (error) {
        this.showMessage("Usuário não existe.");
      }
    }
    else{
      this.showMessage("Campo usuário vazio");
    }
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