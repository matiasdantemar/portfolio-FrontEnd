  
  window.addEventListener("resize", cambiarImagen);
  
  // llamar la función por primera vez para que se actualice la imagen cuando se carga la página
  cambiarImagen();
  
function cambiarImagen() {
    const imagenes = document.getElementsByClassName("image-nav");
  
    for (let i = 0; i < imagenes.length; i++) {
      if (window.innerWidth >= 768) {
        imagenes[i].src = "logo-arg-programa-768px.svg";
      } else {
        imagenes[i].src = "logo-arg-programa.svg";
      }
    }
  }
