class Logout{
  constructor(){
    this.headerArrow = document.querySelector(".js-header-arrow");
    this.headerBox = document.querySelector(".js-header-box");
  }

  toggleBox(){
    this.headerArrow.addEventListener("click", e => {
      this.headerBox.classList.toggle("active");
    });
  }
}

export default Logout;