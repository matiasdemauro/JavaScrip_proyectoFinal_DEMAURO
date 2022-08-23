
const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

const footer = document.getElementById('footer');

footer.innerHTML = `
<footer class="text-center  col-xs-3 col-xs-offset-9">
<div class="superior-foot">
    <ul class="cubos">Sucursales
        <li>Av. Belgrano 2581, CABA.</li>
        <li>Richieri 890, Rosario, Santa Fe.</li>
        <li>Rodriguez 1576, Villa María, Córdoba.</li>
        <li>Pellergini 1988, San Rafael, Mendoza</li>
    </ul>
    <ul class="cubos"> Condiciones del sitio
        <li>Conidiciones de uso</li>
        <li>Politicas de privacidad</li>
        <li>Aplicación de las políticas</li>
        <li>Uso de cookies</li>
        
    </ul>
    <ul class="cubos">Servicios
        <li>Diseñamos tu casa a tu gusto</li>
        <li>Garantías en todos los productos</li>
        <li>Intalación a domicilio</li>
        <li>Envíos a todo el país</li>
    </ul>
</div>
<div class="pie">
    <h3>Copyright © 1990-2021 Gianne Demauro, todos los derechos reservados.</h3>
    <div class="redes">
        <a href="https://www.instagram.com/giannehomedeco/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://web.whatsapp.com/" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
    </div>
</div>
</footer>
`

//traigo los datos desde un json utilizando una funcion asincronica.
const stockProductos = []; //arreglo donde van los datos del json.
const users = [];
const getstockProductos = async () =>
{
    try
    {
        const response = await fetch('./assets/js/stockProductos.json')
        const data = await response.json();
        console.log('data from json:', data);
        //console.log('response' , response);
        stockProductos.push(...data);
        console.log(stockProductos);
        //pinto mis datos
        stockProductos.forEach((element) => {
            const div = document.createElement('div');
            div.classList.add('producto')
            div.innerHTML = `
            <img src= ${element.img} alt=''>
            <h3>${element.nombre}</h3>
            <p class='precioProducto'>$${element.precio}</p>
            <p>Categoría : ${element.categoria}</p>
            <button id='agregar${element.id}' class='boton-agregar'>Agregar <i class='fas fa-shopping-cart'></i></button>
            `
            contenedorProductos.appendChild(div);
        
            const boton = document.getElementById(`agregar${element.id}`)
        
            boton.addEventListener('click' , () => {
                agregarAlCarrito(element.id)
            })
        });
        
    }
    catch(error) {
        console.log(error);
    }
}
getstockProductos();

const loadUser = () =>{
    let user = JSON.parse(localStorage.getItem("user"));
    console.log('user desde index' , user);
    let userName = document.getElementById("username");
    let label = document.createElement("label");
    label.innerText = `
    Usuario : ${user.name.firstname} ${user.name.lastname} 
    Ciudad : ${user.address.city} 
    `
    userName.appendChild(label);
    
}
loadUser();


botonVaciar.addEventListener('click' , () =>{
    carrito.length = 0
    actualizarCarrito()
})
let carrito = [];

document.addEventListener('DOMContentLoaded', ()=> {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})




const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)

    if(existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId){
               prod.cantidad++
              
               
               
            }
           
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId);
        carrito.push(item);
        console.log(carrito); 
    
    }
    actualizarCarrito();
    Toastify({
        style: {
            background: "#000",
            color: "white",
        },
        text: "Agregado al carrito correctamente",
        
        duration: 1000
        
        }).showToast();
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item);
    carrito.splice(indice,1);
    actualizarCarrito(); 
}
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ''
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML =  `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id='cantidad'>${prod.cantidad} </span></p>
        <button onclick = 'eliminarDelCarrito(${prod.id})' class='boton-eliminar fas fa-trash-alt'></button>
        `
    contenedorCarrito.appendChild(div)
    localStorage.setItem('carrito' , JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length ;
    
   precioTotal.innerText = carrito.reduce((acc , prod) => acc + (prod.precio*prod.cantidad), 0) //esta bien
}











