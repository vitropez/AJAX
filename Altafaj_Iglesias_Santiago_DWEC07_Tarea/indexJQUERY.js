//creamos el evento ready en jquery para que cargue toda la pagina antes e ejecutar el codigo
$().ready(() => {
  //hacemos la consulta a la URL y guardamos los datos en un objeto data
  $.getJSON("https://swapi.dev/api/", function (data) {
    var items = [];
    var enlaces = [];
    var misDatos = [];
    var miConsulta;
    //creamos objetos <li></li> por cada clave y los añadimos al HTML con los valores los añadimos a un array
    //para utilizarlos en una subconsulta
    $.each(data, function (key, val) {
      items.push("<li>" + key + "</li>");
      enlaces.push(val);
    });
    $("<ul/>", {
      class: "my-new-list",
      html: items.join(""),
    }).appendTo("#contenedor-dat");
    let numPaginas = 1;
    //por cada etiqueta <li></li> le añadimos un evento click, que llamara a la URL de la API, como da error
    //en varias lo subsanamos con un bucle switch-case
    $("li").each(function (index) {
      $(this).click(function () {
        numPaginas = 1;
        misDatos = [];
        $(".lista").empty();
        switch (enlaces[index]) {
          case "https://swapi.dev/api/starships/":
            numPaginas = 2;
            break;
          case "https://swapi.dev/api/vehicles/":
            numPaginas = 4;
        }
        //el evento click llamara a la URL de la API para una subconsulta , ejemplo:https://swapi.dev/api/vehicles/1/
        //los datos JSON lo guardamos en un objeto data y los pares de datos clave-valor los añadimos a la pagina
        //mediante una etiqueta <li></li>
        $.getJSON(enlaces[index] + numPaginas + "/", function (data) {
          miConsulta = enlaces[index];
          $.each(data, function (key, val) {
            misDatos.push("<li>" + key + " : " + val + "</li>");
          });
          $("<ul/>", {
            class: "lista",
            html: misDatos.join(""),
          }).appendTo("#contenedor-sub");
        });
      });
    });
    //los botones avanzar y retroceso hacen nuevas consultas a la subconsulta variando una unidad
    //si dan error mostraran una alerta  en la pagina
    $("#avanzar").on("click", function avanzar() {
      misDatos = [];

      numPaginas++;

      $(".lista").empty();

      $.getJSON(miConsulta + numPaginas + "/", function (data) {
        $.each(data, function (key, val) {
          misDatos.push("<li>" + key + " : " + val + "</li>");
        });
        $("<ul/>", {
          class: "lista",
          html: misDatos.join(""),
        }).appendTo("#contenedor-sub");
      }).fail(function () {
        alert("SIGUE AVANZANDO O RETROCEDE");
      });
    });
    $("#retroceso").on("click", function () {
      misDatos = [];

      numPaginas--;

      $(".lista").empty();

      $.getJSON(miConsulta + numPaginas + "/", function (data) {
        $.each(data, function (key, val) {
          misDatos.push("<li>" + key + " : " + val + "</li>");
        });
        $("<ul/>", {
          class: "lista",
          html: misDatos.join(""),
        }).appendTo("#contenedor-sub");
      }).fail(function () {
        alert("RETROCEDE O AVANZA");
      });
    });
  });
});
