export default class RepositorioBase {
    constructor(model){
        this.model = model;
    }

    async getTodos(){
        return this.model.findAll()
    }

    async obtenerPorId(id){
        return this.model.findByPk(id)
    }

    async crear(datos){
        return this.model.create(datos)
    }

    async actualizar(id, datos){
        const instancia = await this.obtenerPorId(id);
        if (instancia) {
            return instancia.update(datos);
        }
        throw new Error("Instancia no encontrada");
    }

    async eliminar(id){
        const instancia = await this.obtenerPorId(id);
        if (instancia) {
            return instancia.destroy();
        }
        throw new Error("Instancia no encontrada");
    }


}