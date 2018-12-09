import api from "./api";
import Message from "./message";
class Respositories{

  constructor(){
    this.repositoriesList = document.querySelector(".js-repositories-list");
    this.repositoriesFavorites = document.querySelector(".js-repositories-favorites");
    this.repositoriesSearch = document.querySelector(".js-repositories-search");
    this.searchForm = document.querySelector(".js-search-form");
    this.searchText = document.querySelector(".js-search-text");
    this.favoritesEmpty = document.querySelector(".js-favorites-empty");
  }

  registerHandlers(){
    this.searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const text = this.searchText.value;
      this.search(text);
    });
  }

  async search(text){
    try {
      const response = await api.get(`search/repositories?q=${text}`);
      this.repositoriesSearch.innerHTML = "";
      if(response.data.items.length > 0){
        for (let i = 0; i < response.data.items.length; i++) {
          let repositoryHTML =  `<a class="js-repository" href="${response.data.items[i].html_url}" title="${response.data.items[i].name}" data-id="${response.data.items[i].id}" target="_blank">
                                  <article class="repository">
                                    <span class="repository__favorite js-favorite" title="Favoritar"></span>
                                    <figure class="repository__owner-avatar">
                                      <img src="${response.data.items[i].owner.avatar_url}" alt="Administrador" title="Administrador">
                                    </figure>
                                    <h2 class="repository__owner-name">${response.data.items[i].owner.login}</h2>
                                    <h3 class="repository__name">${response.data.items[i].name}</h3>
                                    <p class="repository__description">${response.data.items[i].description === null ? "(Repositório sem descrição)" : response.data.items[i].description}</p>
                                    <ul class="repository__info">
                                      <li><img src="./assets/images/view.png" alt="Watch" title="Watch">
                                        <p>${response.data.items[i].watchers_count}</p>
                                      </li>
                                      <li><img src="./assets/images/star.png" alt="Star" title="Star">
                                        <p>${response.data.items[i].stargazers_count}</p>
                                      </li>
                                      <li><img src="./assets/images/fork.png" alt="Fork" title="Fork">
                                        <p>${response.data.items[i].forks_count}</p>
                                      </li>
                                    </ul>
                                  </article>
                                </a>`;
          this.repositoriesSearch.insertAdjacentHTML("beforeend", repositoryHTML);
        }
        this.repositorySearch = this.repositoriesSearch.querySelectorAll(".js-repository");
  
        this.repositorySearch.forEach(item => {
          item.addEventListener("click", e => {
            e.preventDefault();
            if(e.target.classList.contains("js-favorite")){
              const favorite = e.currentTarget.querySelector(".js-favorite");
              const id = e.currentTarget.getAttribute("data-id");
              if(favorite.classList.contains("active")){
                favorite.classList.remove("active");
                this.removeFavorite(id);
              }
              else{
                favorite.classList.add("active");
                this.addFavorite(id);
              }
            }
            else{
              window.open(e.currentTarget.getAttribute("href"), '_blank')
            }
          });
        });
      }
      else{
        Message.show("Repositório não encontrado.");
      }
    } catch (error) {
      Message.show("Erro ocorrido. Consulte o console");
      console.log(error);
    }
  }

  async list(){
    const {login} = JSON.parse(localStorage.getItem("user")).info;
    const response = await api.get(`/users/${login}/repos`);
    this.repositoriesList.innerHTML = "";
    
    response.data.map(repository => {
      let repositoryHTML =  `<a href="${repository.html_url}" title="${repository.name}" target="_blank">
                              <article class="repository">
                                <h3 class="repository__name">${repository.name}</h3>
                                <p class="repository__description">${repository.description === null ? "(Repositório sem descrição)" : repository.description}</p>
                                <ul class="repository__info">
                                  <li><img src="./assets/images/view.png" alt="Watch" title="Watch">
                                    <p>${repository.watchers_count}</p>
                                  </li>
                                  <li><img src="./assets/images/star.png" alt="Star" title="Star">
                                    <p>${repository.stargazers_count}</p>
                                  </li>
                                  <li><img src="./assets/images/fork.png" alt="Fork" title="Fork">
                                    <p>${repository.forks_count}</p>
                                  </li>
                                </ul>
                              </article>
                            </a>`;

      this.repositoriesList.insertAdjacentHTML("beforeend", repositoryHTML);
    });

  }

  async addFavorite(id){
    const response = await api.get(`repositories/${id}`);
    window.user.favorites.push(response.data);
    localStorage.setItem("user", JSON.stringify(window.user));
    this.updateFavorites();
  }
  
  async removeFavorite(id){
    for (let i = 0; i < window.user.favorites.length; i++) {
      if(parseInt(id) === window.user.favorites[i].id){
        window.user.favorites.splice(i, 1);
      }
    }
    localStorage.setItem("user", JSON.stringify(window.user));
    this.updateFavorites();
  }

  updateFavorites(){
    this.repositoriesFavorites.innerHTML = "";
    if(window.user.favorites.length > 0 && typeof window.user.favorites === "object"){
      this.favoritesEmpty.classList.remove("active");
      window.user.favorites.map(item => {
          let repositoryHTML =  `<a class="js-repository" href="${item.html_url}" title="${item.name}" data-id="${item.id}" target="_blank">
                                  <article class="repository">
                                    <span class="repository__favorite js-favorite active" title="Remover dos favoritos"></span>
                                    <figure class="repository__owner-avatar">
                                      <img src="${item.owner.avatar_url}" alt="Administrador" title="Administrador">
                                    </figure>
                                    <h2 class="repository__owner-name">${item.owner.login}</h2>
                                    <h3 class="repository__name">${item.name}</h3>
                                    <p class="repository__description">${item.description === null ? "(Repositório sem descrição)" : item.description}</p>
                                    <ul class="repository__info">
                                      <li><img src="./assets/images/view.png" alt="Watch" title="Watch">
                                        <p>${item.watchers_count}</p>
                                      </li>
                                      <li><img src="./assets/images/star.png" alt="Star" title="Star">
                                        <p>${item.stargazers_count}</p>
                                      </li>
                                      <li><img src="./assets/images/fork.png" alt="Fork" title="Fork">
                                        <p>${item.forks_count}</p>
                                      </li>
                                    </ul>
                                  </article>
                                </a>`;
          this.repositoriesFavorites.insertAdjacentHTML("beforeend", repositoryHTML);
      });

      this.repositoryFavorite = this.repositoriesFavorites.querySelectorAll(".js-repository");

      this.repositoryFavorite.forEach(item => {
        item.addEventListener("click", e => {
          e.preventDefault();
          if(e.target.classList.contains("js-favorite")){
            const favorite = e.currentTarget.querySelector(".js-favorite");
            const id = e.currentTarget.getAttribute("data-id");
            if(favorite.classList.contains("active")){
              favorite.classList.remove("active");
              this.removeFavorite(id);
            }
            else{
              favorite.classList.add("active");
              this.addFavorite(id);
            }
          }
          else{
            window.open(e.currentTarget.getAttribute("href"), '_blank')
          }
        });
      });
    }
    else{
      this.favoritesEmpty.classList.add("active");
    }
  }
}

export default Respositories;