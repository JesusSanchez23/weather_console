require('dotenv').config();
const inquirer = require("inquirer");
const {
   leerInput,
   inquirerMenu,
   pausa,
   listarLugares
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
   let opt;
   const busquedas = new Busquedas();

   do {
      opt = await inquirerMenu();
      switch (opt) {
         case 1:
            //    Mostrar mensaje
            const termino = await leerInput('Ciudad: ');
        
            
            
            // Buscar los lugares
            const lugares = await busquedas.ciudad(termino);
            // Seleccionar el lugar
            const id = await listarLugares(lugares);

            const lugarSel = lugares.find( l => l.id === id );

            
            // Datos del clima
            const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
   
            
            // Mostrar Resultados

            console.log('\nInformación de la ciudad'.green);
            console.log('Ciudad: ', lugarSel.nombre.green);
            console.log('Lat: ', lugarSel.lat);
            console.log('Lng: ', lugarSel.lng);
            console.log('Temperatura: ', clima.temp);
            console.log('Mínima: ', clima.min);
            console.log('Maxima: ', clima.max);
            console.log('detalles: ', clima.desc.green);

            break;
      }
      await pausa();
      console.clear();
   } while (opt !== 0);
}


main();