const readline = require('readline');
const fs = require('fs');
const yargs = require('yargs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const argv = yargs
  .option('file', {
    alias: 'f',
    description: 'Nombre del archivo donde guardar los productos',
    type: 'string',
    default: 'productos.json'  
  })
  .argv;


function pedirDatos() {
  rl.question('Producto: ', (producto) => {
    rl.question('Precio: ', (precio) => {
      rl.question('Cantidad: ', (cantidad) => {

        const nuevoProducto = {
          nombre: producto,
          precio: parseFloat(precio),
          cantidad: parseInt(cantidad)
        };

      
        guardarDatos(nuevoProducto);
      });
    });
  });
}


function guardarDatos(nuevoProducto) {
  
  fs.readFile(argv.file, 'utf8', (err, data) => {
    let productos = [];
    
    if (!err && data) {
     
      productos = JSON.parse(data);
    }

    
    productos.push(nuevoProducto);

    
    fs.writeFile(argv.file, JSON.stringify(productos, null, 2), 'utf8', (err) => {
      if (err) {
        console.log('Error al guardar el archivo:', err);
      } else {
        console.log('Producto guardado correctamente.');
      }

      
      console.log('Contenido del archivo:', productos);

      
      rl.close();
    });
  });
}


pedirDatos();
