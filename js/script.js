const url = "https://japceibal.github.io/japflix_api/movies-data.json";
listado = [];
listaNueva = [];

function desplegar(indice) {
  document.getElementById("titulo").innerHTML = listaNueva[indice].title;
  
  document.getElementById("cuerpo").innerHTML = listaNueva[indice].overview;
  
  let contenido = "";
  let generos  = listaNueva[indice].genres
  for(let i = 0; i < generos.length; i++){
    if(i == generos.length - 1)
      contenido += `${generos[i].name}`
    else
      contenido += `${generos[i].name}-`
  }
  document.getElementById("gen").innerHTML = contenido;
  
  document.getElementById("year").innerHTML = `Year:  ${listaNueva[indice].release_date.substring(0,4)}`;
  
  document.getElementById("time").innerHTML = `Runtime:  ${listaNueva[indice].runtime}  mins`;
  
  document.getElementById("presupuesto").innerHTML = `Budget:  $${listaNueva[indice].budget}`;
  
  document.getElementById("ganancia").innerHTML = `Revenue:  $${listaNueva[indice].revenue}`;
  
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
        <li onclick="desplegar(${i})" class="list-group-item" class="color" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><div><strong>${peli.title}</strong>
        <span>${estrellas(Math.round(peli.vote_average / 2))}</span></div>
        <small class="text-muted">${peli.tagline}</small></li>
        `;
  }
  document.getElementById("lista").innerHTML = contenido;
}

function filtrarGenero(listaGeneros, textoABuscar){
  for(genero of listaGeneros){
    if(genero.name.toLowerCase().indexOf(textoABuscar.toLowerCase()) > -1)
      return true;
  }
  return false;
}

function filtradoPeli(peli, text){
  return peli.toLowerCase().indexOf(text.toLowerCase()) > -1;
}

function filtrado() {
  let texto = document.getElementById("inputBuscar").value;
  listaNueva = listado.filter((pelicula) => {
    return (
      filtradoPeli(pelicula.title,texto) ||
      filtradoPeli(pelicula.overview,texto)||
      filtradoPeli(pelicula.tagline,texto) ||
      filtrarGenero(pelicula.genres,texto)
      /*pelicula.genres.filter((x) => {
        x.name.indexOf(texto.toLowerCase()) > -1;
      }).length >= 1*/
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
