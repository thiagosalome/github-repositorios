class Message{
  static show(text){
    const message = document.querySelector(".js-message");
    message.innerHTML = text;
    message.classList.add("active");
    setTimeout(function (){
      message.classList.remove("active");
      message.innerHTML = "";
    }, 2000);
  }
}

export default Message;