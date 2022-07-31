let nombre = prompt('Ingrese su nombre de usuario');
let apellido = prompt('Ingrese su apellido');
const carritoDeCompras = [];
let cantCarrito = 0;


const agregarAlCarrito = (idProducto ,productoNombre, precioProducto, stockProducto) => { 
    carritoDeCompras.push({id: idProducto, producto: productoNombre, precio: precioProducto, stock: stockProducto});
    console.log(`Agregando al carrito ${productoNombre}`);
};

function validarStock(numeroId){
    const productoAeliminar = carritoDeCompras.findIndex ((producto) => producto.id === numeroId);
    if (productoAeliminar !== -1){
        return (carritoDeCompras[productoAeliminar].stock > 0) ? 'Hay stock' : 'No tenemos stock';
    } else {
        return 'El producto no se encuentra en el deposito';
    }
}


function cantidadDeProductos(){
    console.log('Tu carrito tiene: ' + carritoDeCompras.length)
}

function precioCarrito() {
    var precioTotal = 0;
    carritoDeCompras.forEach((producto) => precioTotal += producto.precio);
    return console.log("Tu carrito vale: " + precioTotal);
}

function borrarDelCarrito (numeroId){
    const productoAeliminar = carritoDeCompras.findIndex ((producto) => producto.id === numeroId)
    if (productoAeliminar !== -1){
        console.log(`Borrando del carrito ${carritoDeCompras[productoAeliminar].producto}`);
        carritoDeCompras.splice(productoAeliminar,1);
    }

}

function rangoPrecio(minimo, maximo) {
    const filter = carritoDeCompras.filter((producto) => producto.precio >= minimo && producto.precio <= maximo);
    return console.log(filter);
}



agregarAlCarrito(1458, 'Guitarra Gibson Lespaul Special Edition II', 25000, 10);
agregarAlCarrito(1440, 'Guitarra Gibson SG G-310', 18000,30);
agregarAlCarrito(190, 'Guitarra Gibson Lespaul Studio Lt', 17000, 14);
agregarAlCarrito(1460, 'Guitarra Gibson Lespaul Standard', 23000, 9);

cantidadDeProductos ();
precioCarrito();

//borrarDelCarrito(1458);

rangoPrecio(20000, 50000);

if(nombre !== "" && apellido !== "") {
    document.querySelector(".name-display").innerHTML = `Bienvenido, ${nombre} ${apellido}`;
}
let contenedorProductos = document.querySelector(".contenedorproductos");

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  

  contenedorProductos.innerHTML = "";

let carritoValor = document.querySelector(".carritoValor");

carritoDeCompras.forEach(struct => {
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
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="sumarCarrito()">Comprar</a></div>
                </div>
        </div>
    
    
    `;
});

function sumarCarrito() {
    cantCarrito++;
    carritoValor.innerHTML = '' + cantCarrito;
}