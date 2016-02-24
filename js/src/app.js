$(document).ready(function() { // Cuando la página se ha cargado por completo
	
	// Ponemos el foco en el primer input
	$(".auto-focus").focus();

	$("form").on("submit", function () { // Cuando se intente enviar el formulario
		alert("Enviando formulario");

		// validación del título
		var title = $.trim( $("#title").val() );
		if ( title == "") {
			alert('El título no puede ser vacío');
			return false; // emula el comportamiento del preventDefault
		}

		// validación de URL
		var url = $.trim( $("#cover_url").val() );
		var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
		if ( url != "" && pattern.test(url) == false ) {
			alert('La URL de la carátula no es válida');
			return false;
		}
		// validación categorías
		var selectedCategories = $('input[name="category"]:checked');
		if ( selectedCategories.lenght == 0 ) {
			alert('Selecciona al menos una categoría');
			return false;
		}

		// con un return true podemos indicar una validación correcta del formulario
		return true; 
	});
});