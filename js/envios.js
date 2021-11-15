class Envios {
    constructor(pUsuario, pVehiculo, pDistancia, pFoto, pEstado, pEmpresa,pNombre,pApellido,pId) {
        this.usuario = pUsuario;
        this.estado = pEstado;
        this.vehiculo = pVehiculo;
        this.empresa = pEmpresa;
        this.distancia = pDistancia;
        this.foto = pFoto;//Agregar foto al class
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
    
    obtenerImagen(foto) {
        let imagenParaDevolver = '';

        if (this.imagen) {
            imagenParaDevolver = this.imagen;
        } else {
            if (this.imagen == "P" ) {
                imagenParaDevolver = 'pequenio.jpg';
            } else if (this.imagen == "M") {
                imagenParaDevolver = "mediano.jpg";
            } else if (this.imagen == "G") {
                imagenParaDevolver = "grande.png";
            }
        }
        return imagenParaDevolver;
    }
}