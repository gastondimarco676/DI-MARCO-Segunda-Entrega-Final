//variables
const peliculas = []
let carrito = []

const contenedorPeliculas = document.getElementById('contenedor-peliculas')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

//cargar carrito
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }
  actualizarCarrito()
})

//constructor peliculas
class Pelicula {
  constructor(id, nombre, con, año, img, precio) {
    this.id = id;
    this.nombre = nombre;
    this.año = año;
    this.con = con;
    this.img = img;
    this.precio = precio
  }

}

//FUNCIONES
function cargarPeliculasAlArray() {
  peliculas.push(new Pelicula(1, "Penny Serenade", "Cary Grant", 1941, 'img/pennyserenade.jpg', 380))
  peliculas.push(new Pelicula(2, "Suspicion", "Joan Fontaine", 1940, 'img/suspicion.jpg', 900))
  peliculas.push(new Pelicula(3, "Cat People", "Simone Simon", 1942, 'img/catpeople.jpg', 750))
  peliculas.push(new Pelicula(4, "Jane Eyre", "Orson Welles", 1943, 'img/janeeyre.jpg', 550))
  peliculas.push(new Pelicula(5, "The Suspect", "Charles Laugthon", 1944, 'img/thesuspect.jpg', 580))
  peliculas.push(new Pelicula(6, "Never Fear", "Ida Lupino", 1950, 'img/neverfear.jpg', 490))
  peliculas.push(new Pelicula(7, "Leave To Heaven", "Gene Tierney", 1945, 'img/leaveher.jpg', 790))
  peliculas.push(new Pelicula(8, "Night and City", "Richard Widmarck", 1950, 'img/nightandthecity.jpg', 690))
  peliculas.push(new Pelicula(9, "Dear Murderer", "Greta Gynt", 1947, 'img/dearmurderer.jpg', 580))
  peliculas.push(new Pelicula(10, "Johhny Apollo", "Tyrone Power", 1940, 'img/johnyapollo.jpg', 870))
  peliculas.push(new Pelicula(11, "They Made Me a Criminal", "John Garfield", 1939, 'img/theymademeacriminal.jpg', 630))
  peliculas.push(new Pelicula(12, "Woman on the Run", "Ann Sheridan", 1950, 'img/womanontherun.jpg', 790))

}

//funciones
const imprimirPelisEnTHML = () => {

  peliculas.forEach((peli => {
    let peliCard = document.createElement('div');
    peliCard.className = ('card')
    peliCard.innerHTML = `
    <h3>${peli.nombre} (${peli.año})</h3>
<img id="img" src="${peli.img}"></img>
</br>
Con: ${peli.con}.</br>
Precio: $${peli.precio}
<br/><button id="agregar${peli.id}" class="boton-agregar">Agregar</button>`

    contenedorPeliculas.append(peliCard)

    //EL boton carrito
    const boton = document.getElementById(`agregar${peli.id}`)
    boton.addEventListener('click', () => {
      agregarAlArrayCarrito(peli.id)

    })
  }))

}

const agregarAlArrayCarrito = (peliId) => {
  const existe = carrito.some(peli => peli.id === peliId)
  if (existe) {
    const peli = carrito.map(peli => {
      if (peli.id === peliId) {
        alert('Ya has agregado esta película al carrito!\
        \n Nos alegra que te guste, pero no malgastes tu dinero')
      }
    })
  } else {
    const item = peliculas.find((peli) => peli.id === peliId)
    carrito.push(item)
    
    console.log(carrito)
    localStorage.setItem('peli', JSON.stringify(carrito))
  }
  actualizarCarrito()


}
const eliminarDelCarrito = (peliId) => {
  const item = carrito.find((peli) => peli.id === peliId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()
}

const actualizarCarrito = () => {

  contenedorCarrito.innerHTML = ""

  carrito.forEach((peli) => {
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
    <p>${peli.nombre}</br>
    <img id="img" src="${peli.img}"></img>
    <p>   Precio: $${peli.precio}</p>
    <button onclick = 'eliminarDelCarrito(${peli.id})'>Eliminar del Carrito</button>
    `
    contenedorCarrito.append(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))

  })
  contadorCarrito.innerHTML = carrito.length
  precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

//vaciar Carrito
vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})





//ejecucciones de funciones
cargarPeliculasAlArray()
imprimirPelisEnTHML()

