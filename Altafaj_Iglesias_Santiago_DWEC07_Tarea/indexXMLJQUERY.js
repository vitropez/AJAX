//añadimos el evento JQUERY ready() para que cargue toda la pagina
$().ready(() => {
  //la variable title cambiara una unidad en cada nueva consulta
  let title = 1;
  //hacemos la peticion ajax que llamara a la funcion miFuncion donde se ejecutara el codigo cuando recibamos los datos
  $.ajax({
    url: "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=1",
    type: "GET",
    success: miFuncion,
  });
  function miFuncion(data) {
    //cada vez que la respuesta sea afirmativa guardaremos las etiquetas XML que nos interesen en variables
    //que añadiremos a nuestra pagina mediante tablas con filas y columnas
    let datosInfo = data.getElementsByTagName("info");

    let datosEpisode = data.getElementsByTagName("episode");
    let review = data.getElementsByTagName("review");
    let nameEpisode = data.getElementsByTagName("title");
    let tablaUno = document.createElement("table");
    let tablaDos = document.createElement("table");
    let tablaTres = document.createElement("table");
    let tablaCuatro = document.createElement("table");
    let tablaCinco = document.createElement("table");
    let tablaSiete = document.createElement("table");
    let miContenedor = document.getElementById("contenedor");
    let release = data.getElementsByTagName("release");
    let news = data.getElementsByTagName("news");
    let tablaSeis = document.createElement("table");
    let cast = data.getElementsByTagName("cast");
    let company = data.getElementsByTagName("company");
    let task = data.getElementsByTagName("task");
    let person = data.getElementsByTagName("person");
    let staff = data.getElementsByTagName("staff");
    let role = data.getElementsByTagName("role");
    let tablaOcho = document.createElement("table");
    let credit = data.getElementsByTagName("credit");
    let filaUnoTablaUno = document.createElement("tr");
    let filaDosTablaUno = document.createElement("tr");
    let titulo = data.getElementsByTagName("anime")[0].getAttribute("name");
    //añdimos un titulo a nuestra pagina que varia segun la consulta(porque viene en un atributo de una etiqueta XML)
    let header = document.createElement("header");
    header.innerHTML = titulo;
    //borramos el contenido de la pagina cada vez que hagamos una nueva consulta
    while (miContenedor.firstChild) {
      miContenedor.removeChild(miContenedor.firstChild);
    }
    miContenedor.appendChild(header);
    //a partir de aqui el codigo se repite:obtemos el valor de las etiquetas XML y guardamos los valores en filas y columnas que añadimos a
    //a las tablas
    for (let index = 1; index < datosInfo.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML = datosInfo[index].getAttribute("type");

      let listaDatosDos = document.createElement("td");
      listaDatosDos.innerHTML = datosInfo[index].innerHTML;
      filaUnoTablaUno.appendChild(listaDatosUno);
      filaDosTablaUno.appendChild(listaDatosDos);
      tablaUno.appendChild(filaUnoTablaUno);
      tablaUno.appendChild(filaDosTablaUno);
    }
    //aqui añdimos la url de una imagen y la añadimos a un atributo src de una etiqueta <img> para mostrarla
    let imagen = document.createElement("img");
    let clasesDatosSrc = datosInfo[0].getAttribute("src");
    imagen.setAttribute("src", clasesDatosSrc);
    miContenedor.appendChild(tablaUno);
    miContenedor.appendChild(imagen);
    tablaUno.setAttribute("class", "tablaUno");

    let filaUnoTablaDos = document.createElement("tr");
    let filaDosTablaDos = document.createElement("tr");

    for (let index = 0; index < datosEpisode.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML =
        "episodio numero" + datosEpisode[index].getAttribute("num");
      let listaDatosDos = document.createElement("td");
      listaDatosDos.innerHTML = nameEpisode[index].innerHTML;
      filaUnoTablaDos.appendChild(listaDatosUno);
      filaDosTablaDos.appendChild(listaDatosDos);
      tablaDos.appendChild(filaUnoTablaDos);
      tablaDos.appendChild(filaDosTablaDos);
    }

    miContenedor.appendChild(tablaDos);
    tablaDos.setAttribute("class", "tablaDos");
    let filaUnoTablaTres = document.createElement("tr");

    for (let index = 0; index < review.length; index++) {
      let listaDatosUno = document.createElement("td");
      let miEnlace = document.createElement("a");
      miEnlace.setAttribute("href", review[index].getAttribute("href"));
      miEnlace.innerHTML = review[index].innerHTML;
      listaDatosUno.appendChild(miEnlace);
      filaUnoTablaTres.appendChild(listaDatosUno);

      tablaTres.appendChild(filaUnoTablaTres);
    }
    miContenedor.appendChild(tablaTres);
    tablaTres.setAttribute("class", "tablaTres");

    let filaUnoTablaCuatro = document.createElement("tr");
    let filaDosTablaCuatro = document.createElement("tr");

    for (let index = 0; index < release.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML =
        "release date: " + release[index].getAttribute("date");

      let listaDatosDos = document.createElement("td");

      let miEnlace = document.createElement("a");
      miEnlace.setAttribute("href", release[index].getAttribute("href"));
      miEnlace.innerHTML = release[index].innerHTML;
      listaDatosDos.appendChild(miEnlace);
      filaUnoTablaCuatro.appendChild(listaDatosUno);
      filaDosTablaCuatro.appendChild(listaDatosDos);

      tablaCuatro.appendChild(filaUnoTablaCuatro);
      tablaCuatro.appendChild(filaDosTablaCuatro);
    }
    miContenedor.appendChild(tablaCuatro);
    tablaCuatro.setAttribute("class", "tablaCuatro");

    let filaUnoTablaCinco = document.createElement("tr");
    let filaDosTablaCinco = document.createElement("tr");

    for (let index = 0; index < news.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML = "date: " + news[index].getAttribute("datetime");

      let listaDatosDos = document.createElement("td");

      let miEnlace = document.createElement("a");
      miEnlace.setAttribute("href", news[index].getAttribute("href"));
      miEnlace.innerHTML = news[index].innerHTML;
      listaDatosDos.appendChild(miEnlace);
      filaUnoTablaCinco.appendChild(listaDatosUno);
      filaDosTablaCinco.appendChild(listaDatosDos);

      tablaCinco.appendChild(filaUnoTablaCinco);
      tablaCinco.appendChild(filaDosTablaCinco);
    }
    miContenedor.appendChild(tablaCinco);
    tablaCinco.setAttribute("class", "tablaCinco");

    let filaUnoTablaSeis = document.createElement("tr");
    let filaDosTablaSeis = document.createElement("tr");
    let filaCeroTablaSeis = document.createElement("tr");
    let encabezado = document.createElement("th");
    encabezado.innerHTML = "STAFF";
    encabezado.setAttribute("colspan", staff.length);

    filaCeroTablaSeis.appendChild(encabezado);

    for (let index = 0; index < staff.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML = task[index].innerHTML;
      let listaDatosDos = document.createElement("td");
      listaDatosDos.innerHTML = person[index].innerHTML;

      filaUnoTablaSeis.appendChild(listaDatosUno);
      filaDosTablaSeis.appendChild(listaDatosDos);
      tablaSeis.appendChild(filaCeroTablaSeis);
      tablaSeis.appendChild(filaUnoTablaSeis);
      tablaSeis.appendChild(filaDosTablaSeis);
    }
    miContenedor.appendChild(tablaSeis);
    tablaSeis.setAttribute("class", "tablaSeis");

    let filaUnoTablaSiete = document.createElement("tr");
    let filaDosTablaSiete = document.createElement("tr");
    let filaCeroTablaSiete = document.createElement("tr");

    for (let index = 0; index < cast.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML = role[index].innerHTML;
      let encabezadoCast = document.createElement("td");
      encabezadoCast.innerHTML = "CAST";
      let listaDatosDos = document.createElement("td");
      listaDatosDos.innerHTML = cast[index].children[1].innerHTML;

      filaUnoTablaSiete.appendChild(listaDatosUno);
      filaCeroTablaSiete.appendChild(encabezadoCast);
      filaDosTablaSiete.appendChild(listaDatosDos);
      tablaSiete.appendChild(filaUnoTablaSiete);
      tablaSiete.appendChild(filaCeroTablaSiete);
      tablaSiete.appendChild(filaDosTablaSiete);
    }
    miContenedor.appendChild(tablaSiete);
    tablaSiete.setAttribute("class", "tablaSeis");

    let filaUnoTablaOcho = document.createElement("tr");
    let filaDosTablaOcho = document.createElement("tr");

    for (let index = 0; index < credit.length; index++) {
      let listaDatosUno = document.createElement("td");
      listaDatosUno.innerHTML = credit[index].children[0].innerHTML;

      let listaDatosDos = document.createElement("td");

      listaDatosDos.innerHTML = credit[index].children[1].innerHTML;
      filaUnoTablaOcho.appendChild(listaDatosUno);
      filaDosTablaOcho.appendChild(listaDatosDos);

      tablaOcho.appendChild(filaUnoTablaOcho);
      tablaOcho.appendChild(filaDosTablaOcho);
    }

    miContenedor.appendChild(tablaOcho);
    tablaOcho.setAttribute("class", "tablaOcho");
    //añdimos un footer a la pagina
    let footer = document.createElement("footer");
    miContenedor.appendChild(footer);
  }
  //los botones avanzar y retroceder hacen subconsultas a la API que varian una unidad en la variable title que añadimos a la URL
  let botonAvanzar = document.getElementById("avanzar");
  botonAvanzar.addEventListener("click", () => {
    title++;

    $.ajax({
      url:
        "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=" + title,
      type: "GET",
      success: miFuncion,
      error: function (xhr, status, error) {
        console.error("Error en la petición:", error);
      },
    });
  });
  let botonRetroceso = document.getElementById("retroceso");
  botonRetroceso.addEventListener("click", () => {
    title--;
    $.ajax({
      url:
        "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=" + title,
      type: "GET",
      success: miFuncion,
      error: function (xhr, status, error) {
        console.error("Error en la petición:", error);
      },
    });
  });
});
