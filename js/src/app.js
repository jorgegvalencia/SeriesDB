$(document).ready(function() { // Cuando la página se ha cargado por completo

    // Funciones
    function reloadSeries() {
        console.log("Cargando series");
        $.ajax({
            url: '/api/series',
            type: 'get',
            success: function(data) {
                console.log('Series cargadas', data);
                var html = "";
                for (var i in data) {
                	var id = data[i].id;
                    var title = data[i].title;
                    var url = data[i].url || "";
                    html += "<li>";
                    html += title;
                    if (url.length > 0) {
                        html += "(" + url + ")";
                    }
                    html += "<button data-serieid='"+id+"'>Eliminar</button>"
                    html += "</li>";
                }
                $("#seriesList").html(html);
            },
            error: function() {
                console.log('Error al intentar cargar las series');
            }
        });
    }

    // -----------------------------------------------------------

    // Manejadores de eventos
    $("form").on("submit", function() { // Cuando se intente enviar el formulario
        alert("Enviando formulario");

        // validación del título
        var title = $.trim($("#title").val());
        if (title == "") {
            alert('El título no puede ser vacío');
            return false; // emula el comportamiento del preventDefault
        }

        // validación de URL
        var url = $.trim($("#cover_url").val());
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
        if (url != "" && pattern.test(url) == false) {
            alert('La URL de la carátula no es válida');
            return false;
        }
        // validación categorías
        var selectedCategories = $('input[name="category"]:checked');
        if (selectedCategories.length == 0) {
            alert('Selecciona al menos una categoría');
            return false;
        }

        $.ajax({
            method: 'post',
            url: "/api/series",
            data: JSON.stringify({
                title: title,
                url: url
            }),
            // data: {
            // 	title: title,
            // 	JSON.stringify(url: url)
            // },
            contentType: 'application/json',
            method: 'post',
            success: function() { //200
            	reloadSeries();
                alert('Guardado con éxito');
            },
            error: function() { // 400/500
                alert('Se ha producido un error');
            }
        });

        // con un return true podemos indicar una validación correcta del formulario y permitir enviar el formulario
        // sin embargo, al hacer la petición POST con AJAX, debemos evitar el comportamiento por defecto del submit para
        // no reenviar otra petición
        return false;
    });

    $('#reloadSeriesButton').on("click", reloadSeries);

    $('#seriesList').on('click', 'button', function () {
    	console.log('Elimino la serie',this	);
    	var self = this; // this referencia al elemento del DOM button
    	var id = $(self).data("serieid"); 
    	$.ajax({
    			url: '/api/series/'+ id,
    			type: 'delete',
    			success: function () {
    				$(self).parent().remove();
    			}
    		});
    })

    // -----------------------------------------------------------

    // Ponemos el foco en el primer input
    $(".auto-focus").focus();
    // Cargamos las series al recibir la página
    reloadSeries();

});
