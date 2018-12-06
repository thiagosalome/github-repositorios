import "../scss/main.scss";
import Polyfill from "./modules/polyfill";
import Tabs from "./modules/tabs";
import Logout from "./modules/logout";

const polyfill = new Polyfill();
const tabs = new Tabs();
const logout = new Logout();

tabs.init();
logout.toggleBox();