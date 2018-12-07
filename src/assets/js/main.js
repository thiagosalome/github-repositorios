import "../scss/main.scss";
import Polyfill from "./modules/polyfill";
import Tabs from "./modules/tabs";
import Logout from "./modules/logout";
import Login from "./modules/login";

const polyfill = new Polyfill();
const tabs = new Tabs();
const logout = new Logout();
const login = new Login();

tabs.init();
logout.toggleBox();
login.registerHandlers();