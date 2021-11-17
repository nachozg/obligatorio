class Envios {
    constructor(pUsuario, pVehiculo, pDistancia, pFoto, pEstado, pEmpresa,pNombre,pApellido,pId) {
        this.usuario = pUsuario;
        this.estado = pEstado;
        this.vehiculo = pVehiculo;
        this.empresa = pEmpresa;
        this.distancia = pDistancia;
        this.foto = pFoto;
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.id = proximoEnvio;
        proximoEnvio++;
        
       // this.imagen = pImagen;
    }
    establecerEstado(estado) {
        if (estado == undefined) {
            this.estado = "Pendiente";
        }
    }
   
}