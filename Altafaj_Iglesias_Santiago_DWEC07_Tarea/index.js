//añadimos el evento onload a la ventana para que cargue todo el contenido html antes de ejecutar el script
window.onload = (event) => {
  //creamos un elemento XMLHttpRequest para abrir la conexion y acceder a su contenido desde la api
  const xhr = new XMLHttpRequest();
  const xhrSub = new XMLHttpRequest();
  //accedemos a los elementos HTML donde escribir los datos recibidos
  let datos = document.getElementById("datos");
  let datosSub = document.getElementById("datos-sub");
  // creamos las varibles donde guardar los datos recibidos
  let datosArray = [];
  let datosArrayKeys = [];
  let datosArrayValues = [];
  let paginas = [];
  let numPaginas;
  let datosJson;

  listaDatos = document.createElement("li");
  //cada vez que cambie el estado de nuestro elemento xhr se ejecutara esta funcion
  xhr.addEventListener("readystatechange", () => {
    // si el valor de la peticion no es correcto retornara nada si es correcto se ejecutara el siguiente codigo
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      //por cada clave del documento JSON lo meteremos en un array
      datosJson = JSON.parse(xhr.responseText);
      Object.keys(datosJson).forEach((element) => {
        datosArray.push(element);
      });
      //recorremos las claves y las mostramos en pantalla en una etiqueta <li></li> y le añadimos un evento click
      // que hara otra consulta
      datosArray.forEach((element, index) => {
        listaDatos = document.createElement("li");
        listaDatos.innerHTML = datosArray[index];
        datos.appendChild(listaDatos);
      });
    }
    let misEnlaces = document.getElementsByTagName("li");

    for (let index = 0; index < misEnlaces.length; index++) {
      misEnlaces[index].addEventListener(
        "click",
        () => {
          numPaginas = 1;
          Object.values(datosJson).forEach((element) => {
            paginas.push(element);
            //le valor de la consulta que no cambia lo metemos en una variable del objeto window que nos hara falta
            //en otra parte del codigo. este parte de la consulta viene del evento click
            window.miPagina = paginas[index];

            xhrSub.open("GET", paginas[index] + numPaginas + "/");
            xhrSub.send();
            console.log(window.miPagina);
          });
        },
        false
      );
    }
    //con los botones accedemos a la variable que no cambia del objeto window y la parte de la consulta
    //que cambia, como es un numero, la actualizamos en una unidad al hacer click en el boton, es decir
    //cremaos nuevas consultas que varia una unidad a la misma API, lo mismo para el boton retroceso pero
    //a la inversa
    let botonAvanzar = document.getElementById("avanzar");
    botonAvanzar.addEventListener("click", () => {
      numPaginas++;

      xhrSub.open("GET", window.miPagina + numPaginas + "/");
      xhrSub.send();
    });
    let botonRetroceso = document.getElementById("retroceso");
    botonRetroceso.addEventListener("click", () => {
      numPaginas--;
      //esta es la URL ejemplo de la subconsulta  "https://swapi.dev/api/species/1/"
      xhrSub.open("GET", window.miPagina + numPaginas + "/");
      xhrSub.send();
    });
  });
  //esta es la URL a la que hacemos la primera consulta
  xhr.open("GET", "https://swapi.dev/api/");
  xhr.send();
  //en el incio del codigo creamos otro objeto xhrsub con los datos que que cambian en la API
  xhrSub.addEventListener("readystatechange", () => {
    if (xhrSub.readyState !== 4) return;

    if (xhrSub.status >= 200 && xhr.status < 300) {
      //como hacemos consultas y no consulta borramos el contenido del HTML y añdimos uno nuevo cada vez
      while (datosSub.firstChild) {
        datosSub.removeChild(datosSub.firstChild);
      }
      let datosJsonSub = JSON.parse(xhrSub.responseText);

      Object.keys(datosJsonSub).forEach((element) => {
        datosArrayKeys.push(element);
      });

      Object.values(datosJsonSub).forEach((element, i) => {
        datosArrayValues.push(element);
        //mostramos los datos (pares clave-valor)en elementos <li></li>
        let listaDatos = document.createElement("li");
        listaDatos.innerHTML = datosArrayKeys[i] + ":" + datosArrayValues[i];
        datosSub.appendChild(listaDatos);
      });
      datosArrayKeys = [];
      datosArrayValues = [];
    }
  });
};
