
var nombrecliente;
nombrecliente = prompt ("Ingrese su nombre:");
alert ('Hola ' +nombrecliente+ ' Ud. se ha registrado exitosamente');


/*CLASES*/ 

class Reserva{
  constructor(Nombre, Apellido, Telefono, Mail, Dia, Hora, CantidadPersonas){
      this.nombre = Nombre;
      this.apellido = Apellido;
      this.telefono = Telefono;
      this.mail = Mail;
      this.dia = Dia;
      this.hora = Hora;
      this.cantidadPersonas = CantidadPersonas;
  }
}

class Carrito{
  constructor(pIdUser){
      this.idUser = pIdUser;
      this.products = [];
  }
}

/*FUNCIONES*/
function validarFormReserva(){
  let ok = true;

  if(document.getElementById("fname").value == "" || document.getElementById("lname").value == "" || document.getElementById("tel").value == "" || document.getElementById("email").value == "" || document.getElementById("date").value == "" || document.getElementById("time").value == "" || document.getElementById("cantidad").value == ""){

      alert("Por favor complete todos los campos solicitados");
      ok = false;
  }else{
      let nuevaReserva = new Reserva(document.getElementById("fname").value, document.getElementById("lname").value, document.getElementById("tel").value, document.getElementById("email").value, document.getElementById("date").value, document.getElementById("time").value, document.getElementById("cantidad").value);

      //LocalStorage 
      arrayReservas.push(nuevaReserva);
      localStorage.setItem(1, JSON.stringify(arrayReservas));

      mostrarReservaDom();
      }
      return ok;
}

function mostrarReservaDom(){
  $(`#datosReserva`).append($(`<div class="div-datos-reserva" id="sub-div-reserva" style="display: none">
                                  <h6>¡Reserva confirmada!</h6>
                                  <p>Usted reservó a nombre de: <b>${document.getElementById("fname").value} ${document.getElementById("lname").value}</p></b>
                                  <p>Los datos de contacto son: <b>${document.getElementById("tel").value} / ${document.getElementById("email").value}</p></b>
                                  <p>La fecha y hora de reserva son: <b>${document.getElementById("date").value} / ${document.getElementById("time").value}</p></b>
                                  <p>La cantidad de personas es: <b>${document.getElementById("cantidad").value}</p></b>
                                  <p><i>Para ver nuevamente los datos de su reserva presione el botón de notificaciones arriba a la izquierda.</i></p>
                                  <button id="btn-aceptar-reserva">Aceptar</button>
                                 </div>`).fadeIn(200));

  $(`#btn-aceptar-reserva`).on("click", function(){
      $(`#sub-div-reserva`).fadeOut(200, function(){
          $(`#sub-div-reserva`).remove();
      });
  });
}

function mostrarNotificacionReserva(){
  let getDatosReserva = JSON.parse(localStorage.getItem(1));
  
  $(`#notificacionReservas`).append($(`<div id="sub-div-notificacion" style="display: none"; height: 100%">
                                          <div class="title-cerrar">
                                              <h6>Reservas</h6>
                                              <button id="btn-cerrar-not"><i class="fas fa-times"></i></button>
                                          </div>
                                          <div class="icon-data-reserva">
                                              <i class="fas fa-calendar-day"></i>
                                              <p><b>${getDatosReserva[0].dia} / ${getDatosReserva[0].hora}</b>. Mesa a nombre de <b>${getDatosReserva[0].nombre} ${getDatosReserva[0].apellido}</b> para ${getDatosReserva[0].cantidadPersonas} personas.</p>
                                          </div>
                                      </div>`).slideDown(500));
  
  $(`#btn-cerrar-not`).on("click", function(){
      $(`#sub-div-notificacion`).slideUp(500, function(){
      $(`#sub-div-notificacion`).remove();
      });
  });
}

const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src= ${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
`
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

$('#arriba').on('click',function (){
    
  $('html,body').animate ({scrollTop: 0},800);
  
  });



/*ARRAY RESERVA*/
const arrayReservas = [];

/*LLAMADOS LISTENER*/
let formReserva = document.getElementById("formulario");
formReserva.addEventListener("submit", function(e){
    e.preventDefault();
    validarFormReserva();
    formReserva.reset();
});

$(`#notification-btn`).on("click", mostrarNotificacionReserva);