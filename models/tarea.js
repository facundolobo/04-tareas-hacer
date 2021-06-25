const {v4: uuidv4} = require('uuid');

class Tarea{
    id = '';
    desc = '';
    completadaEn = null; //si tiene fecha quiere decir q se a completado

    constructor( desc ) {
        this.desc= desc;
        this.id= uuidv4();
        this.completadoEn = null;
    }

}

module.exports = Tarea;