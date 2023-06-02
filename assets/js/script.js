onload = () => {
  cards();
  plataformas();

  document.querySelector("#btn-0").onclick = () => cards();
  document.querySelector("#btn-1").onclick = () => plataformas();
};

async function searchId(id){
  
  const url = `https://api.rawg.io/api/games/${id}?key=d1ee93d1345647bda344638c5e8fdd2c`;
  let data = await fetch(url).then((res) => res.json());
  let container = document.getElementById("details");
  
  let title = data.name;
  
  let str = "";
  str+=`<div class="x"
      <div class="card" style="width: 18rem;">
      <img src="${data.background_image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${data.description}</p>
      </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Genero: ${data.genres[0].name}</li>
      <li class="list-group-item">Genero: ${data.genres[1].name}</li>
      <li class="list-group-item">Avaliação: ${data.rating}</li>
      </ul>
      </div>
    </div>
  </div>`
  console.log(data);
  container.innerHTML=str;
}

var url0 =
  "https://api.rawg.io/api/games?page=2&page_size=8&key=d1ee93d1345647bda344638c5e8fdd2c";
async function cards() {
  let str = "";
  let data = await fetch(url0).then((res) => res.json());
  let result = data.results;
  for (let index = 0; index < result.length; index++) {
    const card = result[index];
    str += `<div class="col-12 col-sm-3 col-md-4 col-lg-3">
    <div class="card border border-0">
        <h5 class="card-title fw-bold text-truncate">${card.name}</h5>
        <div class="ratio" style="--bs-aspect-ratio: 50%;">
        <img src="${card.background_image}" class="img-fluid" alt="imagem card">
        </div>
        <h5 class="fs-6">Classificação: <span class="float-end">${card.rating}</span></h5>
        <h5 class="fs-6">Data de lançamento: <span class="float-end">${card.released}</span></h5>
        <div class="card-body">
        <a href="detalhes.html?id=${card.id}"><button type="button" class="btn btn-secondary">Mais detalhes ...</button></a>
        </div>
    </div>
    </div>`;
  }
  url0 = data.next;
  document.getElementById("cards").insertAdjacentHTML("beforeend", str);
}

var url1 = `https://api.rawg.io/api/platforms?page=1&page_size=3&key=d1ee93d1345647bda344638c5e8fdd2c`;
async function plataformas() {
  let data = await fetch(url1).then((res) => res.json());
  let str = "";
  for (let index = 0; index < data.results.length; index++) {
    const plataforma = data.results[index];
    str += ` <div class="col-12 col-sm-4 col-md-4">
    <div class="card border border-0">
        <h5 class="card-title fw-bold">${plataforma.name}</h5>
        <div class="formimg" style="background-image: url('${plataforma.image_background}')">
            
        </div>
        <div class="card-body">
            <p class="card-text">
                <b>Principais jogos</b>
            <ul class="lista">`;
            for (let i = 0; i < 3; i++) {
              str += `<li>${plataforma.games[i].name}</li>`;
            }
    str += `</ul>
            </p>
            <p class="card-text text-end">Mais detalhes ...</p>
        </div>
    </div>
   </div>`;
  }
  url1 = data.next;
  document.getElementById("plata").insertAdjacentHTML("beforeend", str);
}


