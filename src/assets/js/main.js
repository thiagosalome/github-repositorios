import "../scss/main.scss";
import Polyfill from "./modules/polyfill";
import Tabs from "./modules/tabs";

const polyfill = new Polyfill();
const tabs = new Tabs();
tabs.init();