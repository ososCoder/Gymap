# Proyecto Final HAB

## Óscar Ousinde & Nicolás López

## WebApp que permite publicar ejercicios para la gestion de un gimnasio y crear usuarios.

---

## INSTALACIÓN DEL PROYECTO

#### Todo el proyecto se encuentra en el directorio **TRAINING_APP**.

Suponemos que el <code>backend</code> ya se ha configurado, si no es asi, los pasos estan en el README.md de la carpeta <code>backend</code>.

Una vez configurado el <code>backend</code>, se deben seguir estos pasos:

1. Crear un archivo <code>.env</code> a partir del archivo ya existente como referencia <code>.env.example</code> completando todas las variables con sus valores correspondientes. En nuestro caso: http://localhost:4000
2. Desde la consola, nos situaremos en la carpeta <code>frontend</code> e introduciremos <code>npm i</code> para instalar las dependencias de react.
3. Recomendamos abrir un nuevo terminal en la carpeta de <code>backend</code>, desde aqui, inicializaremos el servidor de <code>backend</code> con <code>npm run dev</code>. Si el servidor ya esta abierto, podemos saltarnos este paso.
4. Desde la consola de <code>frontend</code>, donde instalamos las dependencias, una vez haya acabado la instalacion introduciremos <code>npm start</code> para inicializar el proyecto.

---

<br>

## FUNCIONAMIENTO DE LA APP

## No User Zone

    La funcionalidad principal de la app es la lista de ejercicios, la cual es accesible por cualquier usuario sin necesidad de tener una cuenta. Se accede haciendo click en el boton "Ir a ejercicios" de la pagina de inicio.

    Junto con esta lista visualizaremos una pestaña en la que pone "Filtro de ejercicios".
    Haciendo click en el icono de la derecha se despliegan las opciones de filtrado: Tipología y Grupo Muscular.
    Despues de haber seleccionado algun filtro, si queremos volver a visualizar la lista completa, haremos click en borrar filtros.

    Para poder visualizar y acceder a la descripcion del ejercicion, haz click sobre este y se abrirá.

## User Zone

    Creando una cuenta se abren nuevas opciones dentro de la App, para empezar, en la pagina principal haciendo click en el menu desplegable podremos registarnos o iniciar sesion (si ya tienes una cuenta).

    Una vez creada la cuenta, se redirigira al inicio de sesion donde habra que verificarse.

    Una vez tengamos sesion iniciada, podremos ver nuestro avatar el la esquina superior derecha, desde el cual podremos desplegar el menu.

    Con nuestra cuenta de usuario podemos:

     - Dar Like o Favorito a los ejercicios ademas de poder visualizar los Likes y Favoritos totales de cada uno

     - Editar perfil: En esta página podremos cambiar nuestro nombre de usuario, avatar y contraseña.

     - Mis Favoritos: Una página donde quedaran guardados todos los ejercicios a los que les hayas dado Favorito. Para eliminar de la lista de favoritos basta con quitar el Favorito del ejercicio.

## Admin Zone

    Esta cuenta no puede dar Like o Favorito, por lo tanto,tampoco tiene pagina de Mis Favoritos.

    Con la cuenta de admin podremos:

    - Editar Perfil: Cambiar nuestro nombre de usuario, avatar y contraseña.

    - Nuevo ejercicios: Esta opcion nos abre una ventana donde podremos crear un nuevo ejercicio.

    - Eliminar usuario: En esta ventana podremos eliminar a cualquiera de los usuarios registrados en nuestra App, para ello necesitaremos el id del usuario. Este id se puede encontrar en la info del menu desplegable de dicho usuario como: GymHero #(id)(o en la base de datos).

    - Editar ejercicio: Haciendo click en el icono del lapiz, podremos editar todos los datos del ejercicio.

    - Eliminar ejercicio: Haciendo click en el icono de la papelera, borraremos el ejercicio seleccionado, pero antes hay que aceptar la alerta para poder confirmar la accion.
