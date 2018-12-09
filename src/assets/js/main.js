import "../scss/main.scss";
import polyfill from "./modules/polyfill";
import Tabs from "./modules/tabs";
import Login from "./modules/login";
import Logout from "./modules/logout";

const tabs = new Tabs();
const logout = new Logout();
const login = new Login();

if(JSON.parse(localStorage.getItem("user") !== null)){
  window.user = JSON.parse(localStorage.getItem("user"));
}
else{
  window.user = {
    info : "",
    favorites : []
  }
}

polyfill.config();
tabs.init();
login.registerHandlers();
login.setDataUser();
logout.toggleBox();
logout.logoutUser();