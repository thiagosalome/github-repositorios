import api from "./api";
import Message from "./message";
window.limit = 16;
class Respositories{

  constructor(){
    this.repositoriesList = document.querySelector(".js-repositories-list");
    this.repositoriesFavorites = document.querySelector(".js-repositories-favorites");
    this.repositoriesSearch = document.querySelector(".js-repositories-search");
    this.btnSearch = document.querySelector(".js-btn-search");
    this.textSearch = document.querySelector(".js-text-search");
  }

  registerHandlers(){
    this.btnSearch.addEventListener("click", e => {
      e.preventDefault();
      const text = this.textSearch.value;
      this.search(text);
    });
  }

  async search(text){
    try {
      const response = await api.get(`search/repositories?q=${text}`);
      this.repositoriesSearch.innerHTML = "";

      for (let i = 0; i < window.limit; i++) {
        let repositoryHTML =  `<a href="${response.data.items[i].html_url}" title="${response.data.items[i].name}" target="_blank">
                                <article class="repository">
                                  <figure class="repository__owner-avatar">
                                    <img src="${response.data.items[i].owner.avatar_url}" alt="User" title="User">
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

    } catch (error) {
      Message.show("Repositório não encontrado.");
    }
  }

  async list(){
    const {login} = JSON.parse(localStorage.getItem("user"));
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

  favorites(){

  }

}

export default Respositories;