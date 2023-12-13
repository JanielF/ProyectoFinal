function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "1" && password === "1") {
        alert("Inicio de sesión exitoso. ¡Bienvenido!");

        // Actualizar la información del usuario en la esquina superior derecha
        document.getElementById("nombreUsuarioNavbar").textContent = "Usuario: " + username;
        document.getElementById("rolUsuarioNavbar").textContent = "Rol: " + obtenerRolUsuario(username);

        // Redirige al usuario a la página del tablero Kanban
        window.location.href = "dashboard.html";

        return false; // No es necesario enviar el formulario después de la redirección
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        return false; // Evita que el formulario se envíe
    }
}

// Función para obtener el rol del usuario (ajusta según tus necesidades)
function obtenerRolUsuario(username) {
    // En este ejemplo, supondré que tienes una lista de usuarios almacenada localmente
    var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Busca el usuario por nombre de usuario
    var usuario = usuariosRegistrados.find(u => u.username === username);

    // Retorna el rol del usuario si se encuentra
    return usuario ? usuario.rol : "Rol no especificado";
}

function isLocalStorageSupported() {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch (e) {
        return false;
    }
}

// Lista de roles predefinidos
var rolesPredefinidos = ["Usuario Estándar", "Administrador", "Editor"];


function registrarUsuario() {
    // Obtener valores del formulario de registro
    var nuevoUsuario = document.getElementById("newUsername").value;
    var nuevaContraseña = document.getElementById("newPassword").value;
    var rolSeleccionado = document.getElementById("rolUsuario").value;

    // Verificar si el navegador es compatible con el almacenamiento local
    if (isLocalStorageSupported()) {
        // Obtener la lista actual de usuarios registrados o inicializar una lista vacía
        var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el usuario ya está registrado
        if (usuariosRegistrados.some(usuario => usuario.username === nuevoUsuario)) {
            alert("El usuario ya está registrado. Por favor, elija otro nombre de usuario.");
        } else {
            // Agregar el nuevo usuario a la lista
            usuariosRegistrados.push({ username: nuevoUsuario, password: nuevaContraseña, rol: rolSeleccionado });

            // Almacenar la lista actualizada en el almacenamiento local
            localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

            alert("Usuario registrado exitosamente. Rol asignado: " + rolSeleccionado);

            // Cerrar el modal
            $('#registroModal').modal('hide');

            // Limpiar el formulario
            document.getElementById("formularioRegistro").reset();
        }
    } else {
        alert("Lo siento, tu navegador no es compatible con el almacenamiento local.");
    }

    // Evitar que el formulario se envíe realmente
    return false;
}

// Función para crear un nuevo rol
function crearRol() {
    // Obtener el nombre del nuevo rol desde el formulario
    var nombreRol = document.getElementById("nombreRol").value;

    // Verificar si el navegador es compatible con el almacenamiento local
    if (isLocalStorageSupported()) {
        // Obtener la lista actual de roles o inicializar una lista vacía
        var roles = JSON.parse(localStorage.getItem("roles")) || [];

        // Verificar si el rol ya existe
        if (roles.includes(nombreRol)) {
            alert("El rol ya existe. Por favor, elija otro nombre para el rol.");
        } else {
            // Agregar el nuevo rol a la lista
            roles.push(nombreRol);

            // Almacenar la lista actualizada en el almacenamiento local
            localStorage.setItem("roles", JSON.stringify(roles));

            alert("Rol creado exitosamente.");

            // Cerrar el modal
            $('#crearRolModal').modal('hide');

            // Limpiar el formulario
            document.getElementById("formularioCrearRol").reset();
        }
    } else {
        alert("Lo siento, tu navegador no es compatible con el almacenamiento local.");
    }

    // Evitar que el formulario se envíe realmente
    return false;
}