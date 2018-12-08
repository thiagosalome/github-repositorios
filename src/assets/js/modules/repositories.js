import api from "./api";

class Respositories{

  constructor(){
    this.repositoriesList = document.querySelector(".js-repositories-list");
    this.repositoriesFavorites = document.querySelector(".js-repositories-favorites");
    this.repositoriesSearch = document.querySelector(".js-repositories-Search");
  }

  async search(){

  }

  async list(){
    const {login} = JSON.parse(localStorage.getItem("user"));
    const response = await api.get(`/users/${login}/repos`);
    this.repositoriesList.innerHTML = "";
    
    response.data.map(repository => {
      debugger;
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