require('colors');  
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { leerInput,
        inquirerMenu,
        pausa, 
        listaTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async()=>{
    let opt='';
    
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){
        //establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
        //TODO cargar tareas 
    }
    

    do{
        //imprimir menu
        opt = await inquirerMenu(); 

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTareas(desc); //crear la lista de tareas e ir agregando
            break;
            
            case '2':
                tareas.listadoCompleto()
            break;

            case '3':
                tareas.listarPendientesCompletadas(true)
            break;

            case '4':
                tareas.listarPendientesCompletadas(false)
            break;

            case '5': //completo || pendiente
                const ids= await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
            break;

            case '6': //Borrar tareas
                const id = await listaTareasBorrar(tareas.listadoArr);
                
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro')
                    // Todo preguntar si esta seguro
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }                    
                }
                
            break;
        }

        guardarDB(tareas.listadoArr); //guardar los cambios 

        await pausa();
    
    }while(opt !== '0');

}

main();