const inputTarea = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const contadorPendientes = document.querySelector("#contadorPendientes");
const mensajeError = document.querySelector("#mensajeError");
const mensajeVacio = document.querySelector("#mensajeVacio");

const tareas = [];

const actualizarContador = () => {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  contadorPendientes.textContent = `Tareas pendientes: ${pendientes}`;
};

const actualizarMensajeVacio = () => {
  if (tareas.length === 0) {
    mensajeVacio.removeAttribute("hidden");
  } else {
    mensajeVacio.setAttribute("hidden", "");
  }
};

const limpiarInput = () => {
  inputTarea.value = "";
  inputTarea.focus();
};

const mostrarError = (mensaje) => {
  mensajeError.textContent = mensaje;
};

const limpiarError = () => {
  mensajeError.textContent = "";
};

const crearBoton = (texto, clase) => {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.classList.add(clase);
  boton.setAttribute("type", "button");
  return boton;
};

const renderizarTareas = () => {
  const tareasActuales = listaTareas.querySelectorAll(".tarea");
  tareasActuales.forEach((tareaElemento) => tareaElemento.remove());

  tareas.forEach((tarea) => {
    const item = document.createElement("li");
    item.classList.add("tarea");

    const info = document.createElement("div");
    info.classList.add("tarea-info");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = tarea.completada;

    const texto = document.createElement("span");
    texto.classList.add("texto-tarea");
    texto.textContent = tarea.texto;

    if (tarea.completada) {
      texto.classList.add("completada");
    }

    const acciones = document.createElement("div");
    acciones.classList.add("acciones");

    const btnCompletar = crearBoton(
      tarea.completada ? "Desmarcar" : "Completar",
      "btn-completar"
    );

    const btnEliminar = crearBoton("Eliminar", "btn-eliminar");

    checkbox.addEventListener("change", () => {
      tarea.completada = checkbox.checked;
      renderizarTareas();
      actualizarContador();
    });

    btnCompletar.addEventListener("click", () => {
      tarea.completada = !tarea.completada;
      renderizarTareas();
      actualizarContador();
    });

    btnEliminar.addEventListener("click", () => {
      const indice = tareas.findIndex((itemBuscado) => itemBuscado.id === tarea.id);

      if (indice !== -1) {
        tareas.splice(indice, 1);
        renderizarTareas();
        actualizarContador();
        actualizarMensajeVacio();
      }
    });

    info.append(checkbox, texto);
    acciones.append(btnCompletar, btnEliminar);
    item.append(info, acciones);
    listaTareas.append(item);
  });

  actualizarMensajeVacio();
};

const agregarTarea = () => {
  const textoLimpio = inputTarea.value.trim();

  if (textoLimpio === "") {
    mostrarError("No puede agregar una tarea vacía o con solo espacios.");
    return;
  }

  limpiarError();

  const nuevaTarea = {
    id: Date.now(),
    texto: textoLimpio,
    completada: false
  };

  tareas.push(nuevaTarea);
  renderizarTareas();
  actualizarContador();
  limpiarInput();
};

btnAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    agregarTarea();
  }
});

actualizarContador();
actualizarMensajeVacio();