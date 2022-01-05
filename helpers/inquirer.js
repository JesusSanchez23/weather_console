const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message : '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.green} Buscar lugar`
            },
            {
                value:2,
                name: `${'2'.green} Historial`
            },
            {
                value: 0,
                name: `${'0'.green} Salir`
            },
           
        ]
    }
];

const listarLugares = async( lugares = []) => {
    const choices = lugares.map( (lugar,i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    } );
    choices.unshift({
        value: '0',
        name: '0.'.green + ' cancelar'
    })
    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Selecciona lugar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async( message) =>{
    const question = [
        {
            type:'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const enter = [
    {
    type: 'input',
    name: 'opt',
    message:`Presione ${'enter'.red} para continuar`
    }
];


const inquirerMenu = async() =>{
    console.log('========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('=========================\n'.green);

const {opcion} = await inquirer.prompt(preguntas);

return opcion;
}


const pausa = async() =>{
    console.log("\n");
    const {message} = await inquirer.prompt(enter);
    console.log("\n");
    return message;
}

const leerInput = async(message) =>{
    const question = [
        {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Ingresa un valor';
            }
            return true;
        }
        }
    ];

    const {desc}= await inquirer.prompt(question);
    return desc;
}

const mostrarListadoChecklist = async( tareas = []) => {
    const choices = tareas.map( (tarea,i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    } );
  
    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}