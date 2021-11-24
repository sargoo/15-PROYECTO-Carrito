const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
        
    })
} 


function agregarCurso(e) {
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const cursoSeleccionado = e.target.parentElement.parentElement;
            leerDatosCurso(cursoSeleccionado);
        }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !==cursoId);
    }
    carritoHTML();
}

function leerDatosCurso(curso){
 
     const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const comprobarCantidad = articulosCarrito.some(curso => curso.id ===infoCurso.id);
    if(comprobarCantidad) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id ===infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //agrega el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}


// Muestra el carrito en el HTML
function carritoHTML(){
        limpiarHTML();
    
    articulosCarrito.forEach(curso => { 
        const {imagen, titulo, precio, cantidad, id} = curso
        
        // recorre el carrito y genera el HTML
        const row = document.createElement('tr'); //table row
        row.innerHTML =  `
            <td>
                <img src = "${imagen}" width = 100>
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href = "#" class = "borrar-curso" data-id = "${id}"> X </td>
            `;

            //agrega el curso al carrito
            contenedorCarrito.appendChild(row); 
    
    });
}
 //limpia los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }
}

