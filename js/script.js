function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "1" && password === "1") {
        alert("Inicio de sesión exitoso. ¡Bienvenido!");

        // Redirige al usuario a la página del tablero Kanban
        window.location.href = "dashboard.html";
        
        return false; // No es necesario enviar el formulario después de la redirección
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        return false; // Evita que el formulario se envíe
    }
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

// Función para registrar usuarios
function registrarUsuario() {
    // Obtener valores del formulario de registro
    var nuevoUsuario = document.getElementById("newUsername").value;
    var nuevaContraseña = document.getElementById("newPassword").value;

    // Verificar si el navegador es compatible con el almacenamiento local
    if (isLocalStorageSupported()) {
        // Obtener la lista actual de usuarios registrados o inicializar una lista vacía
        var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el usuario ya está registrado
        if (usuariosRegistrados.some(usuario => usuario.username === nuevoUsuario)) {
            alert("El usuario ya está registrado. Por favor, elija otro nombre de usuario.");
        } else {
            // Agregar el nuevo usuario a la lista
            usuariosRegistrados.push({ username: nuevoUsuario, password: nuevaContraseña });

            // Almacenar la lista actualizada en el almacenamiento local
            localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

            alert("Usuario registrado exitosamente.");

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