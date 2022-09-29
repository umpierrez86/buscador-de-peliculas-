const url = "https://japceibal.github.io/japflix_api/movies-data.json";
listado = [];

function desplegar(movie) {
  let desplegar = "";
  desplegar = `
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">${movie.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div>
                Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </div>
            <div class="dropdown mt-3">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

function estrellas(puntos) {
  let estre = "";
  for (let i = 0; i < 5; i++) {
    if (i <= parseInt(puntos) - 1) {
      estre += `<span class="fa fa-star checked" ></span>`;
    } else {
      estre += `<span class="fa fa-star"></span>`;
    }
  }
  return estre;
}

function mostrarListas(lista) {
  let contenido = "";
  for (let i = 0; i < lista.length; i++) {
    let peli = lista[i];
    contenido += `
        <li onclick="desplegar(${peli})" class="list-group-item" class="color"><div><strong>${peli.title}</strong>
        <span style="text-align: right;">${estrellas(Math.round(peli.vote_average / 2))}</span></div>
        <small class="text-muted">${peli.tagline}</small></li>
        `;
  }
  document.getElementById("lista").innerHTML = contenido;
}

function filtrado() {
  let texto = document.getElementById("inputBuscar").value;
  let listaNueva = listado.filter((pelicula) => {
    return (
      pelicula.title.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
      pelicula.overview.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
      pelicula.tagline.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
      pelicula.genres.filter((x) => {
        x.name.indexOf(texto.toLowerCase()) > -1;
      }).length >= 1
    );
  });
  mostrarListas(listaNueva);
}

let getJSONData = function (url) {
  let result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      listado = resultObj.data;
    }
  });

  document.getElementById("btnBuscar").addEventListener("click", () => {
    filtrado();
  });
});
