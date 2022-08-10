let nombre = "Joseph";
let apellido = "Maraiah";
const catalogo = [];
let cantCarrito = 0;
const localStorage = window.localStorage
let carritoValor = document.querySelector(".carritoValor");
let contenedorProductos = document.querySelector(".contenedorproductos");

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/**
 * Método para agregar un producto al catalogo (No tiene en cuenta ID's repetidas!)
 * @param {*} idProducto ID único para el producto
 * @param {*} productoNombre Modelo/Nombre del producto
 * @param {*} precioProducto Precio sin formato (Se aplica automáticamente al dibujar el elemento)
 * @param {*} stockProducto Cantidad disponible en el almacen
 */
 const agregarAlCatalogo = (idProducto ,productoNombre, precioProducto, stockProducto) => { 
    catalogo.push({id: idProducto, producto: productoNombre, precio: precioProducto, stock: stockProducto});
    console.log(`Agregando al carrito ${productoNombre}`);
};


load();
cargarCatalogo();

/**
 * Establece los valores iniciales al cargar la página, crea un array en el local storage en
 * caso de que no exista, establece el contador del carrito en base a lo almacenado en el local storage
 * y añade el evento para dibujar el contenido del carrito al hacer click en el boton correspondiente
 */
function load() {
    if(localStorage.getItem("carrito") === null) {
        let notes = [];
        localStorage.setItem("carrito", JSON.stringify(notes));
    }

    carritoValor.innerHTML = "" + JSON.parse(localStorage.getItem("carrito")).length;

    document.querySelector(".botonCarrito").addEventListener('click', () => dibujarCarrito());

    
    if(nombre !== "" && apellido !== "") {
        document.querySelector(".name-display").innerHTML = `Bienvenido, ${nombre} ${apellido}`;
    }
}

/**
 * Devuelve una cadena de texto que determina si el producto se encuentra en el catalogo, si es así,
 * determina si hay o no stock
 * @param {*} numeroId Identificador del producto a determinar stock
 * @returns Cadena de texto
 */
function validarStock(numeroId){
    // Busca el index en el catalogo que corresponda al ID solicitado
    const productoAeliminar = catalogo.findIndex((producto) => producto.id === numeroId);
    if (productoAeliminar !== -1){
        return (catalogo[productoAeliminar].stock > 0) ? 'Hay stock' : 'No tenemos stock';
    } else {
        return 'El producto no se encuentra en el deposito';
    }
}

function cantidadDeProductos(){
    console.log(`El catalogo tiene ${catalogo.length} productos.`);
}

/**
 * Suma todos los productos del catalogo (Sin contar el stock) y escribe en la consola el resultado.
 * @returns Console.log()
 */
function precioTotalCatalogo() {
    var precioTotal = 0;
    catalogo.forEach((producto) => precioTotal += producto.precio);
    return console.log("El valor total del catalogo es de: " + precioTotal);
}

/**
 * El catalogo es un array local, se crea al cargar la página, actualmente no utiliza LocalStorage
 * a diferencia del carrito.
 * @param {*} numeroId Identificador a eliminar
 */
function borrarDelCatalogo(numeroId){
    // Busca el index en el catalogo que corresponda con numeroId 
    const productoAeliminar = catalogo.findIndex ((producto) => producto.id === numeroId)
    if (productoAeliminar !== -1){
        console.log(`Borrando del catalogo ${catalogo[productoAeliminar].producto}`);
        catalogo.splice(productoAeliminar,1);
    }
}

/**
 * Filtra los productos que se encuentren en un rango de precio ingresado
 * @param {*} minimo 
 * @param {*} maximo 
 * @returns Array con los productos dentro del rango
 */
function rangoPrecio(minimo, maximo) {
    const filter = catalogo.filter((producto) => producto.precio >= minimo && producto.precio <= maximo);
    return console.log(filter);
}

function cargarCatalogo() {
    agregarAlCatalogo(1458, 'Guitarra Gibson Lespaul Special Edition II', 25000, 10);
    agregarAlCatalogo(1440, 'Guitarra Gibson SG G-310', 18000,30);
    agregarAlCatalogo(190, 'Guitarra Gibson Lespaul Studio Lt', 17000, 14);
    agregarAlCatalogo(1460, 'Guitarra Gibson Lespaul Standard', 23000, 9);

    // Métodos de prueba :V
    cantidadDeProductos ();
    precioTotalCatalogo();

    //borrarDelCatalogo(1458); <-- Desactivado :V

    rangoPrecio(20000, 50000);

    dibujarCatalogo();
}

function dibujarCatalogo() {
    contenedorProductos.innerHTML = "";


    catalogo.forEach(struct => {
        contenedorProductos.innerHTML += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                
                    <img class="card-img-top" src='assets/${struct.id}.jpg' onerror="this.onerror=null; this.src='https://dummyimage.com/450x300/dee2e6/6c757d.jpg'" alt="..." />
    
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${struct.producto}</h5>
                            <!-- Product price-->
                            <h6>${formatter.format(struct.precio)}</h6>
                            Stock: ${struct.stock}
                        
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><button type="button" class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${struct.id})">Comprar</button></div>
        
                    </div>
            </div>
        
        
        `;
    });
}

function agregarAlCarrito(id) {
    let objetos = JSON.parse(localStorage.getItem("carrito"));
    objetos.push(id);
    carritoValor.innerHTML = '' + objetos.length; 
    localStorage.setItem("carrito",JSON.stringify(objetos));
}

function dibujarCarrito() {
    console.log(catalogo.length);
    const ids = JSON.parse(localStorage.getItem("carrito"));
    let modalContent = document.querySelector(".modal-carrito");
    modalContent.innerHTML = "";
    let total = 0;
    let index = 0;
    ids.forEach((id) => {
        const producto = catalogo[catalogo.findIndex((element) => element.id === id)];
        modalContent.innerHTML += `<tr>
        <th>  <img class="card-img-top" src='assets/${producto.id}.jpg' onerror="this.onerror=null; this.src='https://dummyimage.com/450x300/dee2e6/6c757d.jpg'" alt="..." />
        </th>
        <td>${producto.producto}</td>
        <td>${producto.id}</td>
        <td>${formatter.format(producto.precio)}</td>
        <td>    <button type="button" class="btn btn-danger" onclick="borrarDelCarrito(${index})">X</button></td>
      </tr>`;
    total += producto.precio;
    index++;
    });
    document.querySelector(".precio-total").innerHTML = "" + formatter.format(total);
}

function borrarDelCarrito(index) {
    let objetos = JSON.parse(localStorage.getItem("carrito"));
    objetos.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(objetos));
    dibujarCarrito();
}
