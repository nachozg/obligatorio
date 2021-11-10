let usuarios = [];
let vehiculos = [];
let subirEmpresas = [];
let usuarioEstaLogueado = false;
let proximoId = 1;
let envios = [];
let proximoEnvio = 1;
let enviosFinalizados = [];
Inicializar();

function Inicializar() {
    agregarEventosDeClick();
    ocultarPantallas();
    precargarDatos()
    eventosClickRegistro();
    eventosClickIngresar();
    eventosclickInterfazAdministrador();
    actualizarTablaDeUsuarios();
    eventosclickInterfazPersona();
    // mostrarPantallas();

}
// funcion para precargar datos
function precargarDatos() {
    registrarUsuario("12345678", "guilen", "zugarra", "guille", "123treTRE", "opcion_Persona");
    registrarUsuario("87654321", "gala", "zugarra", "galuchi", "123treTRE", "opcion_Persona");
    registrarUsuario("11223344", "nacho", "zugarra", "nachozg", "123treTRE", "opcion_Persona");
    registrarUsuario("44332211", "manu", "cabrera", "manuela", "123treTRE", "opcion_Persona");
    registrarUsuario("444554455", "empresa1", "bicho", "rentistas", "123treTRE", "opcion_Empresa", "Camion", true);
    registrarUsuario("444554335", "empresa2", "bohemio", "wanderers", "123treTRE", "opcion_Empresa", "Camioneta", true);
    registrarUsuario("444888888", "empresa3", "tricoplayero", "huracanbuceo", "123treTRE", "opcion_Empresa", "Moto", true);
    registrarUsuario("444999999", "empresa4", "papal", "bellavista", "123treTRE", "opcion_Empresa", "Camioneta", false);
    registrarUsuario("444777777", "empresa5", "picapiedra", "rampla", "123treTRE", "opcion_Empresa", "Camioneta", false);
    registrarUsuario("", "", "", "Admin", "Admin01", "opcion_Administrador", "", true);
    subirVehiculos("Camion");
    subirVehiculos("Camioneta");
    subirVehiculos("Moto");
    subirEnvios("guille", "Camion", 450, "", "Pendiente", "", "guilen", "zugarra");
    subirEnvios("galuchi", "Camioneta", 150, "", "En tránsito", "wanderers", "gala", "zugarra");
    subirEnvios("manuela", "Moto", 20, "", "Finalizado", "huracanbuceo", "manuela", "cabrera");
    subirEmpresasalArray()
    console.log(usuarios)
    console.log(vehiculos)
    console.log(envios)
}
// funcion para ocultar pantallas
function ocultarPantallas() {
    document.querySelector("#cuerpo_Interfaz").style.display = "none";
    document.querySelector("#interfaz_Persona").style.display = "none";
    document.querySelector("#interfaz_Empresa").style.display = "none";

}

//funcion para registrar usuariosPersona
function registrarUsuario(documento, nombre, apellido, usuario, contraseña, tipo, vehiculo, habilitacion) {
    let nuevoUsuario = new Usuario(documento, nombre, apellido, usuario, contraseña, tipo, vehiculo, habilitacion);
    usuarios.push(nuevoUsuario);
}
//funcion para obtener nuevos vehiculos subidos por el admin
function obtenerVehiculo() {
    let vehiculo = document.querySelector("#agregar_tipo_vehiculo").value;
    subirVehiculos(vehiculo);
}
//funcion para subir vehiculos
function subirVehiculos(vehiculo) {
    let nuevoVehiculo = new Vehiculos(vehiculo);
    vehiculos.push(nuevoVehiculo);
    console.log(vehiculos);
    mostrarVehiculos();
}
// funcion para subir envios
function subirEnvios(usuario, vehiculo, distancia, foto, estado, empresa, nombre, apellido) {
    let envio = new Envios(usuario, vehiculo, distancia, foto, estado, empresa, nombre, apellido);
    envios.push(envio)
}
//funcion para mostrarvehiculos
function mostrarVehiculos() {
    let mostrarParrafo = ``;
    for (let i = 0; i < vehiculos.length; i++) {
        let reciboVehiculos = vehiculos[i];
        let reciboTipoVEhiculo = reciboVehiculos.vehiculo;
        let reciboId = reciboVehiculos.id;
        mostrarParrafo += `<li>${reciboTipoVEhiculo}</li>`;

    }
    document.querySelector("#mostrar_vehiculos").innerHTML = mostrarParrafo;

}
//funcion para desplegar combo vehiculos en pagina registro empresas y combo desplegable en interfaz persona
function comboVehiculosRegistro() {
    let comboVehiculos = `<option></option>`;
    for (let i = 0; i < vehiculos.length; i++) {
        let reciboVehiculos = vehiculos[i];
        let reciboTipoVehiculo = reciboVehiculos.vehiculo;

        comboVehiculos += `<option value="${reciboTipoVehiculo}">${reciboTipoVehiculo}</option>`
    }
    console.log(comboVehiculos)
    document.querySelector("#vehiculo_Registro").innerHTML = comboVehiculos;
    document.querySelector("#select_vehiculos").innerHTML = comboVehiculos;
}


//funcion para subir empresas al array subirEmpresas
function subirEmpresasalArray() {
    for (let i = 0; i < usuarios.length; i++) {
        let reciboUsuarios = usuarios[i];
        let reciboTipoUsuario = reciboUsuarios.tipoUsuario;
        if (reciboTipoUsuario == "opcion_Empresa") {
            subirEmpresas.push(reciboUsuarios);
        }
    }
    console.log(subirEmpresas)
}
// funcion para los eventos de click en el header (menu principal)
function agregarEventosDeClick() {
    document.querySelector("#btnMenuLogin").addEventListener("click", botonLoguearse);
    document.querySelector("#btnMenuCerrarSesion").addEventListener("click", botonCerrarSesion);
    document.querySelector("#btnMenuRegistroUsuario").addEventListener("click", botonRegistrarse);

}

//funcion para cerrar sesion
function botonCerrarSesion() {
    document.querySelector("#btnMenuRegistroUsuario").style.display = "";
    document.querySelector("#btnMenuLogin").style.display = "";
    document.querySelector("#cuerpo_Interfaz").style.display = "none";
    document.querySelector("#opciones_de_registro").value = "";
    document.querySelector("#interfaz_Administrador").style.display = "none";
    document.querySelector("#interfaz_Persona").style.display = "none";
    document.querySelector("#interfaz_Empresa").style.display = "none";
    document.querySelector("#ingresar_Usuario").value = "";
}
//funcion para los eventos de click en la pagina de registro
function eventosClickRegistro() {
    document.querySelector("#tipo_de_Registro").addEventListener("click", opcionPaginasRegistro);
    document.querySelector("#ingreso_datos_registroPERS").addEventListener("click", registroPersonas);
    document.querySelector("#ingreso_datos_registroEMP").addEventListener("click", registroEmpresas);

}
// funcion para eventos de click en ingresar
function eventosClickIngresar() {
    document.querySelector("#seleccionar_Usuario_Interfaz").addEventListener("click", logueo);

}
//funcion para loguearse
function logueo() {
    let usuario = document.querySelector("#ingresar_Usuario").value.trim();
    usuario = usuario.toLowerCase()
    let contrasenia = document.querySelector("#password_usuario").value;
    let validarIngreso = validoIngreso(usuario, contrasenia);
    let comprobacionEstadoEmpresa = empresaEstado(usuario);

    if (validarIngreso == "opcion_Persona") {
        document.querySelector("#interfaz_Persona").style.display = "";
        document.querySelector("#loguearse").style.display = "none";
        // document.querySelector("#ingresar_Usuario").value = "";
        document.querySelector("#password_usuario").value = "";
        mostrarEnviosPersona()

    } else if (validarIngreso == "opcion_Empresa" && comprobacionEstadoEmpresa == true) {
        mostrarKMporEmpresa();
        mostrarEnviosPendientes();
        document.querySelector("#interfaz_Empresa").style.display = "";
        document.querySelector("#loguearse").style.display = "none";
        // document.querySelector("#ingresar_Usuario").value = "";
        document.querySelector("#password_usuario").value = "";

    } else if (validarIngreso == "opcion_Administrador") {
        mostrarKMporEmpresa()
        document.querySelector("#interfaz_Administrador").style.display = "";
        document.querySelector("#loguearse").style.display = "none";
        // document.querySelector("#ingresar_Usuario").value = "";
        document.querySelector("#password_usuario").value = "";

    } else {
        document.querySelector("#comunicaion_Logueo").innerHTML = "datos incorrectos para acceder al sistema"
    }


}
//funcion para calcular km por empresa
function calcularKMxEmpresa(empresa){
return kilometrosEmp
}
// cambio git
// funcion para mostrar KM recorrido de una empresa
function mostrarKMporEmpresa() {

    let tablaEnviosFinalizados = ``;
    


    for (let i = 0; i < envios.length; i++) {

        let envioRecibido = envios[i];
        let reciboEmpresa = envioRecibido.empresa;
        let estadoRecibido = envioRecibido.estado;
        let cuentakm = 0;
        let empresaFinalizo = ``;
        if (estadoRecibido == "Finalizado") {
            enviosFinalizados.push(envioRecibido)
        }
     // let  cuentadistancia =  mostrarEmpresaykms(reciboEmpresa)
        for (let j = 0; j < enviosFinalizados.length; j++) {

            let reciboFinalizados = enviosFinalizados[j];
            empresaFinalizo = reciboFinalizados.empresa;
            let kmRecorrido = reciboFinalizados.distancia;
            if (empresaFinalizo == reciboEmpresa) {
                cuentakm += kmRecorrido
            }


        }


        if (estadoRecibido == "Finalizado" && empresaFinalizo == reciboEmpresa) {
            tablaEnviosFinalizados += `<tr><td>${reciboEmpresa}</td><td>${cuentakm}</td>
                    </tr>`;
        }

    }

    document.querySelector("#tabla_Envios_Finalizados").innerHTML = tablaEnviosFinalizados;
    console.log(tablaEnviosFinalizados)
}
// funcion que recibe empresa y devuelve km recorridos
function mostrarEmpresaykms(empresa){

}
//funcion para ver el estado habilitado o no de la empresa
function empresaEstado(empresa) {
    let estado = false;
    for (let i = 0; i < usuarios.length; i++) {
        let reciboArray = usuarios[i];
        let reciboUsuario = reciboArray.usuario;
        let reciboEstado = reciboArray.habilitacion;
        if (empresa == reciboUsuario) {
            estado = reciboEstado;
        }

    }
    return estado
}
//funcion para validar ingreso al sistema y derivar a su respectiva interfaz
function validoIngreso(usuario, password) {

    let validoUsuario = false;
    let usuarioMatcheado = ``;
    let i = 0;
    while (!validoUsuario && i < usuarios.length) {
        let reciboUsuarios = usuarios[i];
        let reciboNickname = reciboUsuarios.usuario;
        reciboNickname = reciboNickname.toLowerCase();
        let contrasenia = reciboUsuarios.contraseña;
        let reciboTipoUsuario = reciboUsuarios.tipoUsuario;
        if (reciboNickname == usuario && contrasenia == password) {
            validoUsuario = true
            usuarioMatcheado = reciboTipoUsuario

        }
        i++
    }
    console.log(usuarioMatcheado)
    return usuarioMatcheado
}
//funcion para mostrar tipo de pagina de registro (empresa o persona)
function opcionPaginasRegistro() {
    let opcionTipoRegistro = document.querySelector("#opciones_de_registro").value;
    if (opcionTipoRegistro == "opcion_Empresa") {
        document.querySelector("#div_Registro_Empresa").style.display = "";
        document.querySelector("#div_Registro_Persona").style.display = "none";
    } else if (opcionTipoRegistro == "opcion_Persona") {
        document.querySelector("#div_Registro_Persona").style.display = "";
        document.querySelector("#div_Registro_Empresa").style.display = "none";
    }
    comboVehiculosRegistro()
}



//function mostrarPantallas() {
//ocultarPantallas();
//}

// funcion boton loguearse
function botonLoguearse() {
    document.querySelector("#cuerpo_Interfaz").style.display = "";
    document.querySelector("#loguearse").style.display = "";
    document.querySelector("#btnMenuRegistroUsuario").style.display = "none";
    document.querySelector("#btnMenuLogin").style.display = "none";
    document.querySelector("#interfaz_Administrador").style.display = "none";
    document.querySelector("#interfaz_Persona").style.display = "none";
    document.querySelector("#interfaz_Empresa").style.display = "none";
    document.querySelector("#div_Registro_Empresa").style.display = "none";
    document.querySelector("#div_Registro_Persona").style.display = "none";
    document.querySelector("#registro_Empresa_o_Persona").style.display = "none";
    actualizarTablaDeUsuarios()
    comboVehiculosRegistro()

}

//funcion para registrarse
function botonRegistrarse() {
    document.querySelector("#btnMenuRegistroUsuario").style.display = "none";
    document.querySelector("#btnMenuLogin").style.display = "none";
    document.querySelector("#cuerpo_Interfaz").style.display = "";
    document.querySelector("#interfaz_Administrador").style.display = "none";
    document.querySelector("#interfaz_Persona").style.display = "none";
    document.querySelector("#interfaz_Empresa").style.display = "none";
    document.querySelector("#div_Registro_Empresa").style.display = "none";
    document.querySelector("#div_Registro_Persona").style.display = "none";
    document.querySelector("#loguearse").style.display = "none";
    document.querySelector("#registro_Empresa_o_Persona").style.display = "";

}
// function registrar usuarios
function registroPersonas() {

    let documento = document.querySelector("#ingresar_documento_persona").value;
    let nombre = document.querySelector("#registro_persona_nombre").value;
    let apellido = document.querySelector("#registro_persona_apellido").value;
    let usuario = document.querySelector("#registro_persona_usuario").value.trim();
    usuario = usuario.toLowerCase()
    let contraseña = document.querySelector("#password_persona_registro").value;
    let tipoUsuario = document.querySelector("#opciones_de_registro").value;
    let usuarioValido = validarUsuario(usuario); // si devuelve true pusheo todo
    let contraseniaValidada = validarContrasenia(contraseña);
    if (usuarioValido == false && contraseniaValidada == true && contraseña.length > 5) {
        let nuevoUsuarioValidado = new Usuario(documento, nombre, apellido, usuario, contraseña, tipoUsuario);
        usuarios.push(nuevoUsuarioValidado);
        document.querySelector("#ingresar_documento_persona").value = "";
        document.querySelector("#registro_persona_nombre").value = "";
        document.querySelector("#registro_persona_apellido").value = "";
        document.querySelector("#registro_persona_usuario").value = "";
        document.querySelector("#password_persona_registro").value = "";
        document.querySelector("#opciones_de_registro").value = "";
        document.querySelector("#comunicador_Registro").innerHTML = "El registro fue correcto"
    } else {
        console.log("hay un error buscalo")
        document.querySelector("#comunicador_Registro").innerHTML = "El registro NO fue correcto"
    }
    console.log(usuarios)
    document.querySelector("#div_Registro_Persona").style.display = "none";
}
//funcion para validar usuario 
function validarUsuario(usuario) {
    // aca use logica inversa si no son iguales mando false si es igual true entonces 
    // arriba con false pusheo 
    let validado = false;
    let i = 0
    while (!validado && i < usuarios.length) {

        let reciboUsuarios = usuarios[i];

        let reciboNickname = reciboUsuarios.usuario;

        if (reciboNickname == usuario) {
            validado = true;
        }
        i++
    }
    console.log(validado)
    return validado
}
// funcion para validar contrasenia
function validarContrasenia(password) {
    let validado = false;
    let minuscula = cuentaMinusculas(password);
    let mayuscula = cuentaMayusculas(password);
    let numero = cuentaNumeros(password);
    if (minuscula > 0 && mayuscula > 0 && numero > 0) {
        validado = true;
    }
    console.log(validado)
    return validado

}
// funcion para contar mayusculas
function cuentaMayusculas(texto) {
    contadorMayus = 0;
    for (let i = 0; i < texto.length; i++) {
        let textoNuevo = texto[i];
        if (textoNuevo == texto[i].toUpperCase() && isNaN(textoNuevo)) {
            contadorMayus++;
        }

    }
    console.log(contadorMayus)
    return contadorMayus
}
// funcion para contar minusculas
function cuentaMinusculas(texto) {
    contadorMinus = 0;
    for (let i = 0; i < texto.length; i++) {
        let textoNuevo = texto[i];
        if (textoNuevo == texto[i].toLowerCase() && !isNaN(textoNuevo)) {
            contadorMinus++;
        }

    }
    console.log(contadorMinus)
    return contadorMinus
}
//funcion para contar numeros
function cuentaNumeros(texto) {
    let cuentaNum = 0;

    for (let i = 0; i < texto.length; i++) {
        let reciboTexto = texto[i];
        if (!isNaN(reciboTexto)) {
            cuentaNum++;
        }
    }
    console.log(cuentaNum)
    return cuentaNum
}
// funcion para registrar empresas
function registroEmpresas() {

    let documento = document.querySelector("#ingresar_Rut_Empresa").value;
    let nombre = document.querySelector("#registro_Razon_Social").value;
    let apellido = document.querySelector("#registro_Nombre_Fantasia").value;
    let usuario = document.querySelector("#registro_Empresa_usuario").value.trim();
    usuario = usuario.toLowerCase();
    let contraseña = document.querySelector("#password_Empresa_registro").value;
    let tipoUsuario = document.querySelector("#opciones_de_registro").value;
    let usuarioValido = validarUsuario(usuario); // si devuelve true pusheo todo
    let contraseniaValidada = validarContrasenia(contraseña);
    let vehiculo = document.querySelector("#vehiculo_Registro").value;
    let estado = false;
    if (usuarioValido == false && contraseniaValidada == true && contraseña.length > 5) {
        let nuevoUsuarioValidado = new Usuario(documento, nombre, apellido, usuario, contraseña, tipoUsuario, vehiculo, estado);
        usuarios.push(nuevoUsuarioValidado);

        documento = document.querySelector("#ingresar_Rut_Empresa").value = "";
        document.querySelector("#registro_Razon_Social").value = "";
        document.querySelector("#registro_Nombre_Fantasia").value = "";
        document.querySelector("#registro_Empresa_usuario").value = "";
        document.querySelector("#password_Empresa_registro").value = "";
        document.querySelector("#opciones_de_registro").value = "";
        document.querySelector("#comunicador_Registro").innerHTML = "El registro fue correcto en breve nos comunicaremos para darle el alta de usuario"
    } else {
        console.log("hay un error buscalo")
        document.querySelector("#comunicador_Registro").innerHTML = "El registro NO fue correcto"
    }
    console.log(usuarios)
    document.querySelector("#div_Registro_Empresa").style.display = "none";
}

// funcion para actualizar tabla de empresas en la interfaz administrador
function actualizarTablaDeUsuarios() {
    let tbodyHTML = ``;

    for (let i = 0; i < usuarios.length; i++) {
        let empresaActual = usuarios[i];
        let usuarioActual = empresaActual.usuario;
        let rutActual = empresaActual.documentoRUT;
        let razonSocialUsActual = empresaActual.nombreRAZONsocial;
        let nombreFantasiaActual = empresaActual.apellidoFANTASIA;

        let letraParaBotonHablilitado = "Habilitada";
        if (empresaActual.habilitacion == true) {
            letraParaBotonHablilitado = "Habilitada";
        } else if (empresaActual.habilitacion == false) {
            letraParaBotonHablilitado = "Deshabilitada"
        }
        let tipoUsuario = empresaActual.tipoUsuario
        if (tipoUsuario == "opcion_Empresa") {
            tbodyHTML += `<tr><td>${rutActual}</td><td>${razonSocialUsActual}</td>
                         <td>"${nombreFantasiaActual}"</td>
                         <td><input nombreUsuario="${usuarioActual}" class="btnCambiarEstadoUsuario" type="button" value="${letraParaBotonHablilitado}"></td>
                    </tr>`;

        }

    }

    document.querySelector("#tablaUsuarios").innerHTML = tbodyHTML;
    let botonesDeLaTabla = document.querySelectorAll(".btnCambiarEstadoUsuario");
    for (let i = 0; i < botonesDeLaTabla.length; i++) {
        let botonActual = botonesDeLaTabla[i];
        botonActual.addEventListener("click", btnCambiarEstadoUsuarioHandler);
    }
}
// funcion para cambiarle el estado a una empresa habilitada o no 
function btnCambiarEstadoUsuarioHandler() {
    let nombreDeUsuarioDeBotonClickeado = this.getAttribute("nombreUsuario");
    let usuarioDeBotonClickeado = obtenerUsuarioPorUsuario(nombreDeUsuarioDeBotonClickeado);
    console.log(nombreDeUsuarioDeBotonClickeado)
    console.log(usuarioDeBotonClickeado)
    cambiarEstadoUsuario(usuarioDeBotonClickeado);
    actualizarTablaDeUsuarios();
}
//funcion para obtener el usuario del array usuario
function obtenerUsuarioPorUsuario(usuario) {
    let usuarioEncontrado = null;
    let i = 0;
    while (!usuarioEncontrado && i < usuarios.length) {
        let usuarioGuardado = usuarios[i];
        if (usuario === usuarioGuardado.usuario) {
            usuarioEncontrado = usuarioGuardado;
        }
        i++;
    }
    return usuarioEncontrado;
}
// funcion para cambiar el estado del boton de habilitar o deshabilitar empresas
function cambiarEstadoUsuario(usuario) {
    let usuarioEstaHabilitado = usuario.habilitacion;

    if (usuarioEstaHabilitado) {
        usuario.habilitacion = false;
    } else {
        usuario.habilitacion = true;
    }


}

// funcion para eventos de click en la interfaz administrador
function eventosclickInterfazAdministrador() {

    document.querySelector("#agregar_vehiculo").addEventListener("click", obtenerVehiculo);
}

//funcion para eventos de click interfaz persona
function eventosclickInterfazPersona() {
    document.querySelector("#cargar_Envio").addEventListener("click", completarEnvio);

}
// funcion para subir envios al array
function completarEnvio() {
    let usuario = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();
    let vehiculo = document.querySelector("#select_vehiculos").value;
    let distancia = parseInt(document.querySelector("#ingresar_km").value);
    let estado = "Pendiente"
    let foto = "";
    let nombre = encontrarNombreUsuario(usuario);
    let apellido = encontrarApellidoUsuario(usuario);
    subirEnvios(usuario, vehiculo, distancia, foto, estado, "", nombre, apellido);
    console.log(envios)
    mostrarEnviosPersona()


}
// funcion para encontrar nombre  usuario
function encontrarNombreUsuario(usuario) {
    let nombre = "";
    let matcheo = null;
    let i = 0;
    while (i < usuarios.length && !matcheo) {
        reciboArray = usuarios[i];
        reciboUsuario = reciboArray.usuario;
        nombre = reciboArray.nombreRAZONsocial;
        if (reciboUsuario == usuario) {
            matcheo = true;
        }
        i++
    }
    return nombre
}
// funcion para encontrar nombre  usuario
function encontrarApellidoUsuario(usuario) {
    let apellido = "";
    let matcheo = null;
    let i = 0;
    while (i < usuarios.length && !matcheo) {
        reciboArray = usuarios[i];
        reciboUsuario = reciboArray.usuario;
        apellido = reciboArray.apellidoFANTASIA
        if (reciboUsuario == usuario) {
            matcheo = true;
        }
        i++
    }
    return apellido
}

//funcion para mostrar envios pendientes
function mostrarEnviosPendientes() {
    let mostrarTablaPendientes = ``;
    let mostrarTablaPedidosEnTransito = ``;

    let usuario = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();
    console.log(usuario)
    let obtenerVehiculoUsuarioEmpresa = obtenerVehiculoEmpresa(usuario);
    console.log(obtenerVehiculoUsuarioEmpresa)
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboNombre = reciboEnvios.nombre;
        console.log(reciboNombre)
        let reciboApellido = reciboEnvios.apellido
        let reciboEstado = reciboEnvios.estado;
        let vehiculo = reciboEnvios.vehiculo;
        let distancia = reciboEnvios.distancia;
        let foto = reciboEnvios.foto;
        let id = reciboEnvios.id;
        let letraParaBotonEstado = cambiarTextoBtnEstado(reciboEstado);


        if (vehiculo == obtenerVehiculoUsuarioEmpresa && reciboEstado == "Pendiente") {
            mostrarTablaPendientes += `<tr><td>${reciboNombre}</td>
                              <td>${reciboApellido}</td>
                             <td>${distancia}</td>
                             <td>${foto}</td>
                             <td>${letraParaBotonEstado}</td>
                             <td><input estadoPedido="${id}" class="btnCambiarEstadoPedido" type="button" value="${letraParaBotonEstado}"></td>
                        </tr>`;

        } else if (vehiculo == obtenerVehiculoUsuarioEmpresa && reciboEstado == "En transito") {
            mostrarTablaPedidosEnTransito += `<tr><td>${reciboNombre}</td>
            <td>${reciboApellido}</td>
           <td>${distancia}</td>
           <td>${foto}</td>
           <td>${letraParaBotonEstado}</td>
           <td><input estadoPedidoFinalizar="${id}" class="btnCambiarEstadoPedidoFinalizar" type="button" value="Finalizar"></td>
      </tr>`;
        }

    }

    document.querySelector("#tabla_Envios_En_Transito").innerHTML = mostrarTablaPedidosEnTransito;
    document.querySelector("#tabla_Envios_Pendientes").innerHTML = mostrarTablaPendientes;

    let tomarPedidoPendiente = document.querySelectorAll(".btnCambiarEstadoPedido");
    for (let i = 0; i < tomarPedidoPendiente.length; i++) {
        let botonActual = tomarPedidoPendiente[i];
        botonActual.addEventListener("click", btnFUNCCambiarEstadoPedido);
    }
    let tomarPedidoPendienteTransito = document.querySelectorAll(".btnCambiarEstadoPedidoFinalizar");
    for (let i = 0; i < tomarPedidoPendienteTransito.length; i++) {
        let botonActualFinalizar = tomarPedidoPendienteTransito[i];
        botonActualFinalizar.addEventListener("click", btnFUNCCambiarEstadoPedidoTransito);
    }

}
// funcion mostrar envios de una persona en interfaz persona
function mostrarEnviosPersona() {
    let mostrarTablaPedidosDePersona = ``;
    let usuario = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();

    console.log(usuario)
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboUsuario = reciboEnvios.usuario
        let reciboEmpresa = reciboEnvios.empresa;
        let nombreFantasia = encontrarApellidoUsuario(reciboEmpresa);
        let reciboEstado = reciboEnvios.estado;
        let foto = reciboEnvios.foto;
        let letraParaBotonEstado = cambiarTextoBtnEstado(reciboEstado);


        if (usuario == reciboUsuario) {
            mostrarTablaPedidosDePersona += `<tr><td>${foto}</td>
                              <td>${letraParaBotonEstado}</td>
                             <td>${nombreFantasia}</td>
                        </tr>`;

        }
    }
    document.querySelector("#tabla_Envios_Persona").innerHTML = mostrarTablaPedidosDePersona;
}

// funcion eventos de click cambiar de en transito a finalizado
function btnFUNCCambiarEstadoPedidoTransito() {
    let cambiarEstado = this.getAttribute("estadoPedidoFinalizar");
    let obtengoEnvioParaCambiar = obtenerPedido(cambiarEstado);
    let envioenTransito = finalizarPedidoYA(obtengoEnvioParaCambiar);
    cambiarEstadoFinalizar(envioenTransito)
}
// funcion para cambiar texto boton estado
function cambiarTextoBtnEstado(reciboEstado) {

    if (reciboEstado == "Pendiente") {
        letraParaBotonEstado = "Pendiente";
    } else if (reciboEstado == "En tránsito") {
        letraParaBotonEstado = "En tránsito";
    } else if (reciboEstado == "Finalizada") {
        letraParaBotonEstado = "Finalizada";
    }
    return reciboEstado
}

//funcion para cambiar el estado del pedido
function btnFUNCCambiarEstadoPedido() {
    let asignarsePedido = this.getAttribute("estadoPedido"); // saber que boton clickea
    let obtengoEnvioParaCambiar = obtenerPedido(asignarsePedido); //obtener el pedido
    let envioenTransito = finalizarPedidoYA(obtengoEnvioParaCambiar);

    // mostrarEnviosEnTransitoTomados();

    mostrarEnviosPendientes(); // actualizo la tabla de pedidos
}

//funcion para finalizar pedido
function finalizarPedidoYA(elenvio) {
    let envioEstado = elenvio.estado
    if (envioEstado == "Pendiente") {
        elenvio.estado = "En transito";
        elenvio.empresa = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();

    } else if (envioEstado == "En Transito") {
        elenvio.estado = "Finalizado";
    }
    mostrarEnviosPendientes()

    console.log(envios)
    return elenvio
}
// funcion para cambiar estado del pedido a finalizar
function cambiarEstadoFinalizar(elenvio) {
    let envioEstado = elenvio.estado
    if (envioEstado == "En transito") {
        elenvio.estado = "Finalizado";
        elenvio.empresa = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();

    }
    mostrarEnviosPendientes()
    console.log(envios)
}
//funcion para obtener pedido cambio estado 
function obtenerPedido(idPedido) {
    let matcheo = null;
    let reciboEnvio = null;
    let i = 0;
    while (!matcheo && i < envios.length) {
        reciboEnvio = envios[i];
        let idEnvio = reciboEnvio.id;
        let estadoEnvio = reciboEnvio.estado
        if (idEnvio == idPedido) {
            matcheo = true
            //  estadoEnvio = "En transito";
            // console.log(estadoEnvio)
        }
        i++
    }
    console.log(reciboEnvio)
    return reciboEnvio
}

//funcion para obtener vehiculo de la empresa logueada
function obtenerVehiculoEmpresa(usuario) {
    let matcheo = null;
    let reciboVehiculo = "";
    let i = 0;
    while (!matcheo && i < usuarios.length) {
        let reciboArray = usuarios[i];
        let reciboUsuario = reciboArray.usuario;
        reciboVehiculo = reciboArray.vehiculo;
        if (reciboUsuario == usuario) {
            matcheo = true;
        }

        i++
    }
    return reciboVehiculo
}