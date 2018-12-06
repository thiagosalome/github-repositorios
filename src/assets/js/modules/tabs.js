class Tabs{
  constructor(){
    this.tabItem = document.querySelectorAll(".js-tabs-item");
    this.contentItem = document.querySelectorAll(".js-content-item");
  }

  init(){
    this.tabItem.forEach(tab => {
      tab.addEventListener("click", e => {
        e.preventDefault();
        this.removeActives();
        e.currentTarget.classList.add("active");
        document.querySelector(".js-content-item[data-content='" + e.currentTarget.getAttribute("data-tab") + "']").classList.add("active");
      });
    });
  }

  removeActives(){
    this.tabItem.forEach(tab => {
      tab.classList.remove("active");
    });
    this.contentItem.forEach(content => {
      content.classList.remove("active");
    });
  }
}

export default Tabs;