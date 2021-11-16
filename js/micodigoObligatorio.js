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
    mostrarKMporEmpresa();
    personaMasEnviosRealizados();
    mostrarEnviosPendientes();
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
    subirEnvios("galuchi", "Camioneta", 150, "", "En transito", "wanderers", "gala", "zugarra");
    subirEnvios("manuela", "Moto", 20, "", "Finalizado", "huracanbuceo", "manuela", "cabrera");

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
    document.querySelector("#comunicaion_Logueo").value = "";
    document.querySelector("#comunicador_Registro").innerHTML = "";
}
//funcion para los eventos de click en la pagina de registro
function eventosClickRegistro() {
    document.querySelector("#tipo_de_Registro").addEventListener("click", opcionPaginasRegistro);
    document.querySelector("#ingreso_datos_registroPERS").addEventListener("click", registroPersonas);
    document.querySelector("#ingreso_datos_registroEMP").addEventListener("click", registroEmpresas);
    console.log(usuarios)
}
// funcion para eventos de click en ingresar
function eventosClickIngresar() {
    document.querySelector("#seleccionar_Usuario_Interfaz").addEventListener("click", logueo);
    document.querySelector("#mostrar_estadisticas").addEventListener("click", muestroEstadisticasEmpresa);

}
//funcion para loguearse
function logueo() {
    mostrarEnviosPendientes();
    mostrarKMporEmpresa();
    personaMasEnviosRealizados();
    estadisticasPersonasEnvios()
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
        personaMasEnviosRealizados();
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
//funcion para encontrar empresas
function encontrarEmpresas() {
    let nombres = []
    for (let i = 0; i < usuarios.length; i++) {
        let reciboArray = usuarios[i];
        let reciboNombre = reciboArray.usuario;
        let reciboTipo = reciboArray.tipoUsuario;
        if (reciboTipo == "opcion_Empresa") {
            nombres.push(reciboNombre)
        }


    }
    return nombres
}

//funcion para calcular km por empresa
function calcularKMxEmpresa(empresa) {
    let kilometrosEmp = 0;
    for (let i = 0; i < usuarios.length; i++) {
        let reciboUsuarios = usuarios[i];
        let reciboTipoUsuario = reciboUsuarios.tipoUsuario;
        let reciboUsuario = reciboUsuarios.usuario
        if (empresa == reciboUsuario && reciboTipoUsuario == "opcion_Empresa") {

        }

    }
    return kilometrosEmp
}

// funcion para mostrar KM recorrido de una empresa
function mostrarKMporEmpresa() {

    let tablaEnviosFinalizados = ``;



    for (let i = 0; i < envios.length; i++) {

        let envioRecibido = envios[i];
        let reciboEmpresa = envioRecibido.empresa;
        let estadoRecibido = envioRecibido.estado;
        let reciboId = envioRecibido.id;

        let buscoPedidoFinalizado = encontrarPedidofinalizado(reciboId);
        console.log(buscoPedidoFinalizado)
        if (estadoRecibido == "Finalizado" && buscoPedidoFinalizado == false) {
            enviosFinalizados.push(envioRecibido)
            console.log(enviosFinalizados)
        }
    }
    let empresas = encontrarEmpresas();
    for (let i = 0; i < empresas.length; i++) {
        let reciboEmpresaNombre = empresas[i];
        let cuentakm = 0;

        for (let j = 0; j < enviosFinalizados.length; j++) {

            let reciboFinalizados = enviosFinalizados[j];
            empresaFinalizo = reciboFinalizados.empresa;
            let kmRecorrido = reciboFinalizados.distancia;
            if (empresaFinalizo == reciboEmpresaNombre) {
                cuentakm += kmRecorrido
            }

        }

        tablaEnviosFinalizados += `<tr><td>${reciboEmpresaNombre}</td><td>${cuentakm}</td>
                    </tr>`;
    }

    document.querySelector("#tabla_Envios_Finalizados").innerHTML = tablaEnviosFinalizados;
    console.log(tablaEnviosFinalizados)
}
// funcion para encontrar un pedido finalizado
function encontrarPedidofinalizado(id) {
    let encontrado = false;
    let pedidobuscado = false;
    let i = 0;
    while (!encontrado && i < enviosFinalizados.length) {
        console.log("entre al while ")
        let reciboEnvios = enviosFinalizados[i];

        let reciboID = reciboEnvios.id;
        console.log(id)
        console.log(reciboID)
        if (reciboID == id) {
            encontrado = true;
            pedidobuscado = true;
        }

        i++
    }
    return pedidobuscado
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
    let validoDocumento = funcValidoDocumento(documento);
    let nombre = document.querySelector("#registro_persona_nombre").value;
    let apellido = document.querySelector("#registro_persona_apellido").value;
    let usuario = document.querySelector("#registro_persona_usuario").value.trim();
    usuario = usuario.toLowerCase()
    let contraseña = document.querySelector("#password_persona_registro").value;
    let tipoUsuario = document.querySelector("#opciones_de_registro").value;
    let usuarioValido = validarUsuario(usuario); // si devuelve true pusheo todo
    let contraseniaValidada = validarContrasenia(contraseña);
    if (usuarioValido == false && contraseniaValidada == true && contraseña.length > 5 && validoDocumento == true && nombre != "" && apellido != "") {
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

        document.querySelector("#comunicador_Registro").innerHTML = "El registro NO fue correcto debe llenar todos los campos o cambiar el nombre de usuario"
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
//funcion para validar rut o documento
function funcValidoDocumento(documento) {
    let matcheo = false;
    let valido = true;
    let i = 0;

    while (!matcheo && i < usuarios.length) {
        let reciboUsuario = usuarios[i];
        console.log(reciboUsuario)
        let reciboDocumento = reciboUsuario.documentoRUT;
        if (reciboDocumento == documento) {
            matcheo = true;
            valido = false;
            console.log("entrealif")
        }

        i++
    }
    return valido
}
// funcion para validar nombre o razon social
function funcValidoNombre(nombre) {
    let matcheo = false;
    let valido = true;
    let i = 0;

    while (!matcheo && i < usuarios.length) {
        let reciboUsuario = usuarios[i];
        let reciboNombre = reciboUsuario.nombreRAZONsocial;
        if (reciboNombre == nombre) {
            matcheo = true;
            valido = false;
        }
        i++
    }
    return valido
}
// funcion para registrar empresas
function registroEmpresas() {

    let documento = document.querySelector("#ingresar_Rut_Empresa").value;
    let validoDocumento = funcValidoDocumento(documento);
    let nombre = document.querySelector("#registro_Razon_Social").value.trim().toLowerCase();
    let validoNombre = funcValidoNombre(nombre);
    let apellido = document.querySelector("#registro_Nombre_Fantasia").value;
    let usuario = document.querySelector("#registro_Empresa_usuario").value.trim();
    usuario = usuario.toLowerCase();
    let contraseña = document.querySelector("#password_Empresa_registro").value;
    let tipoUsuario = document.querySelector("#opciones_de_registro").value;
    let usuarioValido = validarUsuario(usuario); // si devuelve true pusheo todo
    let contraseniaValidada = validarContrasenia(contraseña);
    let vehiculo = document.querySelector("#vehiculo_Registro").value;
    let estado = false;
    if (usuarioValido == false && contraseniaValidada == true && contraseña.length > 5 && validoDocumento == true && validoNombre == true && apellido != "" && vehiculo != "") {
        let nuevoUsuarioValidado = new Usuario(documento, nombre, apellido, usuario, contraseña, tipoUsuario, vehiculo, estado);
        usuarios.push(nuevoUsuarioValidado);

        document.querySelector("#ingresar_Rut_Empresa").value = "";
        document.querySelector("#registro_Razon_Social").value = "";
        document.querySelector("#registro_Nombre_Fantasia").value = "";
        document.querySelector("#registro_Empresa_usuario").value = "";
        document.querySelector("#password_Empresa_registro").value = "";
        document.querySelector("#opciones_de_registro").value = "";
        document.querySelector("#comunicador_Registro").innerHTML = "El registro fue correcto en breve nos comunicaremos para darle el alta de usuario"
    } else {

        document.querySelector("#comunicador_Registro").innerHTML = "El registro NO fue correcto debe llenar todos los campos"
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
        if (usuario == usuarioGuardado.usuario) {
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
    document.querySelector("#btnBuscarEmpresas").addEventListener("click", botonBuscarEmpresas);
}
//funcion para buscar empresas 


function botonBuscarEmpresas() {
    let empresaBuscada = document.querySelector("#buscador_de_empresas").value.trim().toLowerCase();
    let matchearEmpresa = buscarEmpresa(empresaBuscada);
    let nombreFantasiaBuscado = encontrarNombreFantasiaempresa(empresaBuscada);
    let mensaje = ``;
    if (empresaBuscada == matchearEmpresa.nombreRAZONsocial && matchearEmpresa.tipoUsuario == "opcion_Empresa") {
        mensaje = `
            Usuario: ${matchearEmpresa.usuario}.<br>
            Contraseña: ${matchearEmpresa.contraseña}.<br>
            Razon Social ${matchearEmpresa.nombreRAZONsocial}.<br>
            Nombre Fantasía: ${matchearEmpresa.apellidoFANTASIA}.<br>
            Tipo de Usuario: ${matchearEmpresa.tipoUsuario}.<br>
            Habilitación: ${matchearEmpresa.habilitacion}.<br>
            Rut: ${matchearEmpresa.documentoRUT}.<br.
            `;
    }else if (empresaBuscada == nombreFantasiaBuscado.apellidoFANTASIA && nombreFantasiaBuscado.tipoUsuario == "opcion_Empresa") {
       mensaje = `
       Usuario: ${nombreFantasiaBuscado.usuario}.<br>
            Contraseña: ${nombreFantasiaBuscado.contraseña}.<br>
            Razon Social ${nombreFantasiaBuscado.nombreRAZONsocial}.<br>
            Nombre Fantasía: ${nombreFantasiaBuscado.apellidoFANTASIA}.<br>
            Tipo de Usuario: ${nombreFantasiaBuscado.tipoUsuario}.<br>
            Habilitación: ${nombreFantasiaBuscado.habilitacion}.<br>
            Rut: ${nombreFantasiaBuscado.documentoRUT}.<br.
       `;
    }else{
        mensaje = "La empresa no fue encontrada.";
    }

    document.querySelector("#BuscadorEmpresas").innerHTML = mensaje;
}
// funcion para buscar empresa
function buscarEmpresa(empresaBuscada) {
    let matcheo = false;
    let reciboUsuarios = []
    let i = 0;

    while (i < usuarios.length && !matcheo) {
        reciboUsuarios = usuarios[i];
        let reciboNombre = reciboUsuarios.nombreRAZONsocial;
        let reciboFantasia = reciboUsuarios.apellidoFANTASIA;
        if (reciboNombre == empresaBuscada) {
            matcheo = true;

        }

        i++;
    }
    console.log(reciboUsuarios)
    return reciboUsuarios
}



//funcion para eventos de click interfaz persona
function eventosclickInterfazPersona() {
    document.querySelector("#cargar_Envio").addEventListener("click", completarEnvio);
    document.querySelector("#mostrar_X_Estado").addEventListener("click", estadisticasPersonasEnvios);

}
// funcion para subir envios al array
function completarEnvio() {
    let usuario = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();
    let vehiculo = document.querySelector("#select_vehiculos").value;
    let distancia = parseInt(document.querySelector("#ingresar_km").value);
    let estado = "Pendiente"
    let foto = document.querySelector("#opciones_de_fotos_envios").value;
    let nombre = encontrarNombreUsuario(usuario);
    let apellido = encontrarApellidoUsuario(usuario);
    if (vehiculo != "" && !isNaN(distancia) && distancia > 0) {
        subirEnvios(usuario, vehiculo, distancia, foto, estado, "", nombre, apellido);
        document.querySelector("#respuesta_envio").innerHTML = "El pedido esta siendo procesado"
        console.log(envios)
    } else {
        document.querySelector("#respuesta_envio").innerHTML = "Todos los campos son obligatorios y la distancia debe ser mayor a 0"
    }
    estadisticasPersonasEnvios()
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
        let empresaDelEnvio = reciboEnvios.empresa;
        console.log(empresaDelEnvio)
        let reciboNombre = reciboEnvios.nombre;
        console.log(reciboNombre)
        let reciboApellido = reciboEnvios.apellido
        let reciboEstado = reciboEnvios.estado;
        let vehiculo = reciboEnvios.vehiculo;
        let distancia = reciboEnvios.distancia;
        let foto = reciboEnvios.foto;
        let id = reciboEnvios.id;
        let letraParaBotonEstado = cambiarTextoBtnEstado(reciboEstado);

        console.log(empresaDelEnvio)
        console.log(usuario)
        if (vehiculo == obtenerVehiculoUsuarioEmpresa && reciboEstado == "Pendiente") {
            mostrarTablaPendientes += `<tr><td>${reciboNombre}</td>
                              <td>${reciboApellido}</td>
                             <td>${distancia}</td>
                             <td>${foto}</td>
                             <td>${letraParaBotonEstado}</td>
                             <td><input estadoPedido="${id}" class="btnCambiarEstadoPedido" type="button" value="${letraParaBotonEstado}"></td>
                        </tr>`;

        } else if (vehiculo == obtenerVehiculoUsuarioEmpresa && reciboEstado == "En transito" && usuario == empresaDelEnvio) {
            console.log("entre al else if")
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
        console.log(reciboEmpresa)
        let nombreFantasiaEmpresa = encontrarApellidoUsuario(reciboEmpresa) //encontrarNombreFantasiaempresa(reciboEmpresa);
        let reciboEstado = reciboEnvios.estado;
        let foto = reciboEnvios.foto;
        let letraParaBotonEstado = cambiarTextoBtnEstado(reciboEstado);


        if (usuario == reciboUsuario) {
            mostrarTablaPedidosDePersona += `<tr><td>${foto}</td>
                              <td>${letraParaBotonEstado}</td>
                             <td>${nombreFantasiaEmpresa}</td>
                        </tr>`;

        }
    }
    document.querySelector("#tabla_Envios_Persona").innerHTML = mostrarTablaPedidosDePersona;
}
// funcion para encontrar nombre de fanatasia de una empresa
function encontrarNombreFantasiaempresa(empresa) {
   
    let reciboUsuario = ``;
    let matcheo = false;
    let i = 0;
    while (!matcheo && i < usuarios.length) {
         reciboUsuario = usuarios[i];
        let reciboEmpresa = reciboUsuario.empresa;
        let reciboNombreFantasia = reciboUsuario.apellidoFANTASIA;

        if (empresa == reciboNombreFantasia) {
            matcheo = true;
            
        }
        i++
    }
    console.log(reciboUsuario)
    return reciboUsuario
}
// funcion eventos de click cambiar de en transito a finalizado
function btnFUNCCambiarEstadoPedidoTransito() {

    let cambiarEstado = this.getAttribute("estadoPedidoFinalizar");
    let obtengoEnvioParaCambiar = obtenerPedido(cambiarEstado);
    let envioenTransito = finalizarPedidoYA(obtengoEnvioParaCambiar);
    cambiarEstadoFinalizar(envioenTransito)
    personaMasEnviosRealizados()

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
    mostrarEnviosPendientes();
    personaMasEnviosRealizados()
    // mostrarEnviosEnTransitoTomados();

    // actualizo la tabla de pedidos
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
    let paraRetorno = true;
    let envioEstado = elenvio.estado
    if (envioEstado == "En transito") {
        elenvio.estado = "Finalizado";
        elenvio.empresa = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();
        enviosFinalizados.push(elenvio)
        console.log(elenvio)
    }

    personaMasEnviosRealizados()
    mostrarEnviosPendientes()
    console.log(envios)
    return paraRetorno
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
            matcheo = true;

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
// funcion para estadisticas Interfaz empresa
function personaMasEnviosRealizados() {
    let usuario = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();

    let pedidosDEempresa = pedidosFinalizadosxEMP(usuario);

    let personas = encontrarRemitentes(pedidosDEempresa);

    let mejorCliente = encontrarMejorCliente(usuario, pedidosDEempresa, personas);

    document.querySelector("#cantidad_envios").innerHTML = "el mejor cliente es " + mejorCliente

}
//function para mostrar contenido de array
function mostrarContenidoDeArray(arrayParaMostrar, idElementoHTML, separador, caracterFinal, borrarResultadoActual) {
    let resultado = "";

    if (arrayParaMostrar.length == 0) {
        resultado = "El array está vacío."
    } else {
        for (let i = 0; i < arrayParaMostrar.length; i++) {
            let elementoActual = arrayParaMostrar[i];
            resultado += elementoActual;


            if (i < arrayParaMostrar.length - 1) {
                resultado += separador;
            } else {
                resultado += caracterFinal;
            }
        }
    }

    if (borrarResultadoActual) {
        document.querySelector(`#${idElementoHTML}`).innerHTML = resultado;
    } else {
        document.querySelector(`#${idElementoHTML}`).innerHTML += "<br>" + resultado;
    }
}
// funcion para encontrar el usuario que mas pedidios se le realizo por la empresa

function encontrarMejorCliente(empresa, pedidos, clientes) {

    let clienteMasPedidos = []; //array para recibir cliente con mas pedidos
    let mayorNumPedidos = 0;
    for (let i = 0; i < clientes.length; i++) { // recorro array clientes
        let cantidadPedidos = 0; // cuenta pedidos

        console.log(mayorNumPedidos)
        let reciboCliente = clientes[i]; // recibo cliente

        for (let i = 0; i < pedidos.length; i++) { // recorro array pedidos

            let reciboPedidos = pedidos[i]; // recibo pedidos
            let reciboPersona = reciboPedidos.usuario; // recibo usuario del pedidos
            if (reciboPersona == reciboCliente) { // si son iguales cliente y persona que hace pedidos
                cantidadPedidos++
                console.log(cantidadPedidos)
            }

        }
        if (cantidadPedidos == mayorNumPedidos && leerArrayNumPedidos(clienteMasPedidos, reciboCliente) == false) {
            clienteMasPedidos.push(reciboCliente);


        } else if (cantidadPedidos > mayorNumPedidos) {
            clienteMasPedidos = []
            mayorNumPedidos = cantidadPedidos
            clienteMasPedidos.push(reciboCliente)
        }

    }
    console.log(clienteMasPedidos)
    return clienteMasPedidos // retorno cliente con mas pedidos 
}
// funcion para leer array pedidos
function leerArrayNumPedidos(arrayClientes, cliente) {
    let resultado = false;
    let matcheo = false;
    let i = 0;
    console.log(matcheo)
    console.log(cliente)
    console.log(arrayClientes)
    while (!matcheo && arrayClientes.length >= i) {
        let reciboArray = arrayClientes[i];
        if (reciboArray == cliente) {
            matcheo = true;
            resultado = true
        }

        i++;

    }
    console.log(resultado)
    return resultado
}
// funcion para encontrar pedidos por empresa
function pedidosFinalizadosxEMP(usuario) {

    let enviosEmpresa = [];
    for (let i = 0; i < enviosFinalizados.length; i++) {
        let reciboEnvios = enviosFinalizados[i];
        let reciboEmpresa = reciboEnvios.empresa;
        console.log(reciboEmpresa)
        console.log(usuario)
        if (usuario == reciboEmpresa) {
            enviosEmpresa.push(reciboEnvios);
        }


    }
    console.log(enviosEmpresa)
    return enviosEmpresa
}
// funcion encontrar remitentes de pedidos realizados
function encontrarRemitentes(pedidos) {
    let remitentes = [];
    for (let i = 0; i < pedidos.length; i++) {
        let reciboPedidos = pedidos[i];
        let reciboUsuario = reciboPedidos.usuario;
        remitentes.push(reciboUsuario);

    }

    return remitentes
}
// funcion para mostrar estadisticas
function muestroEstadisticasEmpresa() {
    let estadoEstadistica = document.querySelector("#estadisticas_Estado_pedidios").value;
    let empresa = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();
    let resultado = "";
    if (estadoEstadistica == "cantidad_Finalizados") {
        resultado = cuentaPedidosFinalizados(empresa)
    } else if (estadoEstadistica == "cantidad_En_transito") {
        resultado = cuentaPedidosEnTRANS(empresa)

    }
    document.querySelector("#muestro_Estadisticas").innerHTML = "La cantidad de pedidos en ese estado es: " + resultado

}
// funcion cuentapedios finalizados
function cuentaPedidosFinalizados(empresa) {
    let cuentaPedidosFIN = 0;
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboEmpresa = reciboEnvios.empresa;
        let reciboEstado = reciboEnvios.estado;
        if (reciboEstado == "Finalizado" && empresa == reciboEmpresa) {
            cuentaPedidosFIN++;
        }
    }
    return cuentaPedidosFIN
}
// funcion cuenta pedidos en transito
function cuentaPedidosEnTRANS(empresa) {
    let cuentaPedidosTRANS = 0;
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboEmpresa = reciboEnvios.empresa;
        let reciboEstado = reciboEnvios.estado;
        if (reciboEstado == "En transito" && reciboEmpresa == empresa) {
            cuentaPedidosTRANS++;
        }
    }
    return cuentaPedidosTRANS
}
//funcion para ver estadisticas en interfaz persona
function estadisticasPersonasEnvios() {
    let usuario = document.querySelector("#ingresar_Usuario").value.trim().toLowerCase();
    let resultado = "";
    
    let estadoEnvio = document.querySelector("#estadisticas_Persona").value;
    if (estadoEnvio == "pendientes") {
        resultado = cuentaPedidosPendientes(usuario);
    } else if (estadoEnvio == "transito") {
        resultado = cuentaPedidosEnTRANSpersonas(usuario);

    } else if (estadoEnvio == "finalizada") {
        resultado = cuentaPedidosFINpersona(usuario);
    }
    let porcentajeEnvios = porcentajeEnviosTomados(usuario)
    document.querySelector("#porcentaje_envios_asignados").innerHTML = "Elporcentaje de envios tomados es: " + porcentajeEnvios;
    document.querySelector("#estados_envios_existentes").innerHTML = "La cantidad de pedidos en ese estado es: " + resultado;
}
// funcion para contar pedidos pendientes por usuario
function cuentaPedidosPendientes(usuario) {
    let cuentaPedidosPendientes = 0;
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboUsuario = reciboEnvios.usuario;
        let reciboEstado = reciboEnvios.estado;
        if (reciboEstado == "Pendiente" && reciboUsuario == usuario) {
            cuentaPedidosPendientes++;
        }
    }
    console.log(cuentaPedidosPendientes)
    return cuentaPedidosPendientes
}
//funcion para contar pedidos en transito por persona
function cuentaPedidosEnTRANSpersonas(usuario) {
    let cuentaPedidosTRANS = 0;
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboUsuario = reciboEnvios.usuario;
        let reciboEstado = reciboEnvios.estado;
        if (reciboEstado == "En transito" && reciboUsuario == usuario) {
            cuentaPedidosTRANS++;
        }
    }
    return cuentaPedidosTRANS
}
// funcion para contar pedidos finalizados por persona
function cuentaPedidosFINpersona(usuario) {
    let cuentaPedidosFIN = 0;
    for (let i = 0; i < envios.length; i++) {
        let reciboEnvios = envios[i];
        let reciboUsuario = reciboEnvios.usuario;
        let reciboEstado = reciboEnvios.estado;
        if (reciboEstado == "Finalizado" && reciboUsuario == usuario) {
            cuentaPedidosFIN++;
        }
    }
    return cuentaPedidosFIN
}
//funcion para mostrar porcentaje de envios tomadas por alguna empresa de un usuario persona
function porcentajeEnviosTomados(usuario) {
    let porcentaje = 0;
    let totalenvios = cuentaPedidosEnTRANSpersonas(usuario) + cuentaPedidosFINpersona(usuario) + cuentaPedidosPendientes(usuario);
    let totaltomados = cuentaPedidosEnTRANSpersonas(usuario) + cuentaPedidosFINpersona(usuario);
     porcentaje = totaltomados *100 /totalenvios
     return porcentaje
}