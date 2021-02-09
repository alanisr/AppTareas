document.getElementById('formTarea').addEventListener('submit', GuardarTarea);

function GuardarTarea(e){

	if (document.getElementById('titulo').value && document.getElementById('descripcion').value != null){//se valida que los campos no esten vacios

	let titulo = document.getElementById('titulo').value;

	let descripcion = document.getElementById('descripcion').value;

	const Tarea = {//en este objeto se guardaran las tareas 
		titulo,
		descripcion
	};


	if (localStorage.getItem('Tareas') === null) { //si 'Tareas' esta vacio entra al if 
		
		let tasks = [];//se crea un arreglo vacio en donde se almacenaran las tareas nuevas

		tasks.push(Tarea); //se actualiza la variable con las nuevas tareas 

		localStorage.setItem('Tareas', JSON.stringify(tasks)); //se guardan las tareas nuevas en 'Tareas' en forma de string

	} else {

		let tasks = JSON.parse(localStorage.getItem('Tareas'));	//se crea la variable task con las tareas que ya se encuentran

		tasks.push(Tarea);//se actualiza la variable con las nuevas tareas

		localStorage.setItem('Tareas', JSON.stringify(tasks));//se envia la nueva infomacion a localstorage en forma de string

	}

	} else{
		alert("Debes escribir una tarea");//Se envia alerta en caso de que los campos esten vacios al moemnto de opresionar el boton guardar
	}


	MostrarTareas();//se agrega la funcion para que, al agregar tareas, se refresque el panel con tareas ya agregadas
	document.getElementById('formTarea').reset(); //limpia el formulario despues de agregar una tarea nueva

	e.preventDefault();
}


function MostrarTareas(){

	let tasks = JSON.parse(localStorage.getItem('Tareas'));//se crea la variable task para almacenar las tareas ya agregadas

	let vistatareas = document.getElementById('Tareas');//se crea una variable para agrgar las tareas al div con id='Tareas' en el html

	vistatareas.innerHTML = ''; //Se limpia el contenido que pudiese tener 

	for (let i = 0; i < tasks.length; i++) {//se crea un for para recorrer el arreglo donde se encuentran las tareas para poder mostrarlas 
		
		let titulo = tasks[i].titulo; //se crea la variable para obtener solo el titulo de la tarea que se encuentra en el arreglo

		let descripcion = tasks[i].descripcion; //para obtener la descripcion

		//se agregan datos html al div con += para que se junten los datos nuevos con los existentes
		vistatareas.innerHTML += `<div class="container">
		<div class="card  bg-light mb-3" style="max-width: 18rem;">
			<div class="card-header">${titulo}</div>

			<div class="card-body">
				

				<p class="card-text">${descripcion}</p>

				<a class="btn btn-outline-danger" onclick="BorrarTareas('${titulo}')">Borrar</a>

			</div>
			</div>
			</div>
			
		</div>`
		//Se le asigna la accion oneclick para llamar a la fucnion borrar tareas enviendo el titulo de la tarea
	}

}


function BorrarTareas(titulo){

	let tasks = JSON.parse(localStorage.getItem('Tareas'));

	for (var i = 0; i < tasks.length; i++) {

		if (tasks[i].titulo == titulo){

			tasks.splice(i, 1);//elimina una tarea del arreglo, proporcionandole el indice a donde se ecuentra el dato a eliminar
		}
	}

	localStorage.setItem('Tareas', JSON.stringify(tasks));//Guarda las tareas en el localStorage
	MostrarTareas();
}



MostrarTareas();