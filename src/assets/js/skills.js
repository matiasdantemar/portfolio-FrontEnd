// var bar1 = new ProgressBar.Circle(container1, {
//     color: '#fff',
// //Esto tiene que ser del mismo tamaño que el ancho máximo para
// //  evita el recorte
//    strokeWidth: 4,
//    trailWidth: 10,
//    easing: 'easeInOut',
//    duration: 1400,
//    text: {
//      autoStyleContainer: false
//    },
//    from: { color: '#e10f0f', width: 10 },
//    to: { color: '#e10f0f', width: 10 },
//    // Establecer la función de paso predeterminada para todas las llamadas animadas
//    step: function(state, circle) {
//      circle.path.setAttribute('stroke', state.color);
//      circle.path.setAttribute('stroke-width', state.width);
 
//      var value = Math.round(circle.value() * 100 );
//      if (value === 0) {
//        circle.setText('');
//      } else {
//        circle.setText(value + "%");
//      }

//    }
//  });
//  bar1.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
//  bar1.text.style.fontSize = '2rem';
 
//  bar1.animate(0.8);  // Número de 0.0 a 1.0


initProgressBar('#container1', '#E91E63', 0.7);
initProgressBar('#container2', '#2196F3', 0.5);
initProgressBar('#container3', '#4CAF50', 0.9);
initProgressBar('#container4', '#E91E63', 0.7);
initProgressBar('#container5', '#2196F3', 0.5);
initProgressBar('#container6', '#4CAF50', 0.9);

 function initProgressBar(container, color, value) {
  var bar = new ProgressBar.Circle(container, {
    color: color,
    strokeWidth: 4,
    trailWidth: 10,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: color, width: 10 },
    to: { color: color, width: 10 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var textValue = Math.round(circle.value() * 100) + '%';
      if (textValue === '0%') {
        circle.setText('');
      } else {
        circle.setText(textValue);
      }
    }
  });
  // bar.text.style.fontFamily = 'Arial, sans-serif';
  // bar.text.style.fontSize = '24px';
  bar.animate(value);
}
