(function () {
	var contador = 0;

	var cargarPagina = function () {
		// Envío de TWEED
		var $mensaje = $("#message");

		$("#twitter-form").submit(agregarTweet);
		$mensaje.keyup(validarContenido);
		$mensaje.keyup(contadorCaracteres);
	};

	//contador regresivo de caracreres

	var contadorCaracteres = function () {

		var maxCaracteres = 140
		var $caracteres = $("#type");
		var $mensaje = $("#message");

		var caracteresEntrada = $mensaje.val().length;
		var totalCaracteres = maxCaracteres - caracteresEntrada;
		var $botonAgregar = $("#add-button");

		if (caracteresEntrada == 120 ){
			$caracteres.addClass("label-success");
		} if (caracteresEntrada == 130){
			$caracteres.removeClass("label-success").addClass("label-warning");
		} if (caracteresEntrada >=141){
			$botonAgregar.attr("disabled", true);
			$caracteres.removeClass("label-warning").addClass("label-danger");
		} if (caracteresEntrada < 140){
			$caracteres.removeClass("label-danger").addClass("label-warning");
		} if (caracteresEntrada <130){
			$caracteres.removeClass("label-warning").addClass("label-success");
		}
		$caracteres.text("Te quedan " + totalCaracteres + " de 140 caracteres.")		  		
	}

	var agregarTweet = function (e) {
		e.preventDefault();
		// Obtenemos datos
		var $contenedor = $("#posts");
		var $mensajeContenedor = $("#message");
		var $botonAgregar = $("#add-button");
		var mensaje = $mensajeContenedor.val();
		var $caracteres = $("#type");
		/*hora para el tweet*/
		var tiempo = new Date(); 
		var hora = tiempo.toLocaleString()

		/*
			// Obtenemos el contenido de un elemento 
			.value <> .val()
			.innerHTML <> .html()
			.innerText <> .text()
			.textContent <>
			// Establecer el contenido de un elemento
			.value = "" <> .val("")
			.innerHTML = "" <> .html("")
			.innerText = "" <> .text()
			.textContent = ""
		*/

		// Creamos elementos
		var $postContenedor = $("<article />", { "class": "jumbotron" });
		var $postCheck = $("<input type='checkbox' />");
		var $postTexto = $("<label />", {"class": "label"});

		var identificador = "marcador-" + contador;

		// Personalizamos elementos
		// $postContenedor.addClass("jumbotron");
		$postCheck.id = identificador;
		// $postCheck.type = "checkbox";
		$postTexto.attr("for", identificador);
		$postTexto.html(mensaje + "</br>" + hora);

		$postCheck.click(eliminarTweet);

		// Agregarlos al DOM
		$postContenedor.append($postCheck);
		$postContenedor.append($postTexto);

		// Agregarlo a un elemento existente para visualizarlo
		// contenedor.appendChild(postContenedor);
		$contenedor.prepend($postContenedor);

		// Borrar contenido de textarea
		$caracteres.text("");
		$mensajeContenedor.val("");
		$botonAgregar.attr("disabled", true);

		// bind, apply, call

		contador++;
	};

	var eliminarTweet = function () {
		$(this).parent().remove();
	};

	var validarContenido = function () {
		var $addButton = $("#add-button");
		// .trim() solo borra los espacios de sobra a los costados (izquierda y derecha)
		if($(this).val().trim().length > 0) {
			$addButton.removeAttr("disabled");
		} else {
			$addButton.attr("disabled", true);
		}
	};

	// Cuando carga la página
	$(document).ready(cargarPagina);
})();