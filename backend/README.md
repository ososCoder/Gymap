# Proyecto 2 HAB

## Nicolás López & Óscar Ousinde

## API que permite publicar ejercicios para la gestión de los mismos en un gimnasio

---

## INSTALACIÓN DEL PROYECTO

#### Todo el proyecto se encuentra en el directorio **TRAINING_APP**.

### Una vez descargado se deben de seguir los siguientes pasos:

1. Desde la consola, en el directorio raiz, instalar todas las dependencias disponibles en el archivo package.json con el comando <code>npm install</code>.
2. Crear un archivo <code>.env</code> a partir del archivo ya existente como referencia <code>.env.example</code> completando todas las variables con sus valores correspondientes.
3. Crear la base de datos desde MySQL Workbench con el nombre <code>gym</code>.
4. Desde la consola, en el directorio raiz, iniciar la base de datos desde el archivo <code>initDB.js</code>. El código en la consola se será <code>node ./bbdd/initDB.js</code>. En este momento las tablas se deberían de haber creado en la base de datos. El usuario ADMIN se crea en este momento de forma automática.
5. Existe un script en el archivo package.json que permite al usuario iniciar el servidor con la dependencia nodemon. Para ello basta con introducir en la consola en comando <code>npm run dev</code>.
6. En este momento se puede importar desde POSTMAN el archivo <code>gym.postman_collection.json</code>, disponible en el directorio <code>docs</code>.

---

<br>

## FUNCIONAMIENTO DE LA APP

#### Una vez que todo esté instalado correctamente se puede comenzar a utilizar **TRAINING_APP**:

1.  Asegurarse de que el servidor esté en escucha.
2.  La colección de POSTMAN tiene el nombre de **gym**:

    - Utilizar la petición **newUser** para crear un nuevo usuario. El body de la petición debe de ser un objeto JSON raw.

            {
             "name": "Your name",
             "email": "Your email",
             "password": "Your password"
            }

    - Utilizar la petición **loginUser** para loguearse con el usuario que se desee (en este paso se puede loguear el ADMIN, lo que permitirá la creación, modificación y eliminación de lso ejercicios). El body de la petición debe ser un objeto JSON raw. El loggin devolverá el TOKEN de usuario. Necesario para realizar determinadas acciones.

            {
               "name": "Your name",
               "password": "Your password"
            }

    - Si en el paso anterior el usuario logueado es el ADMIN, este tiene privilegios para la creación y manipulación de los ejercicios del gimnasio. En este caso se pueden utilizar las peticiones exclusivas de ADMIN **createExercise**, **modifyExercise**, **deleteExercise**, **deleteUser**.

      - **createExercise**: header con KEY Authorization y VALUE TOKEN del ADMIN. Body como form-data.

              KEY             VALUE
              name            Nombre del ejercicio
              description     Descripción del ejercicio
              photo           Imagen del ejercicio
              typology        Tipología del ejercicio
              muscleGroup     Músculos ejercitados en el ejercicio

      - **modifyExercise**: header con KEY Authorization y VALUE el TOKEN del ADMIN.Body como form-data. En esta petición se puede modificar la información de cada ejercicio. Se comporta de forma similar a **createExercise**.
      - **deleteExercise**: se utilizan los path params para eliminar el ejercicio deseado. En el Header debe de constar KEY Authorization y VALUE el TOKEN del ADMIN.
      - **deleteUser**: se utilizan los path params para eliminar el usuario deseado. En el Header debe de constar KEY Authorization y VALUE el TOKEN del ADMIN.

    - Si el login se ha realizado con un nuevo (o ya existente usuario), este tiene disponible las funcionalidades **infoUser**, **modifyUser**, **modifyPwd**, **listExercises**, **getExercise**, **postLike**, **deleteLike**, **addFavourite**, **deleteFavourite**, **getFavourites**.

      - **infoUser**: header con KEY Authorization y VALUE el TOKEN del usuario logueado o del ADMIN. La información que se devuelve es diferente. En los path params se indicará el id del usuario del que se requiere la info.

                Si usuario "member" la info a la que se tiene acceso es:

                {
                        "name": "Nombre del usuario consultado",
                        "avatar": ""Avatar del usuario consultado
                }

                Si usuario "admin" la info a la que se tiene acceso es:

                {
                        "name": "Nombre del usuario consultado",
                        "avatar": "Avatar del usuario consultado",
                        "email": "Email del usuario consultado",
                        "createdAt": "Fecha creación del usuario consultado"
                }

      - **modifyUser**: header con KEY Authorization y VALUE el TOKEN del usuario logueado. En los path params se indica el id del usuario a modificar. La información a modificar disponible se encuentra en el body con formato form-data.

                KEY             VALUE
                name            Nuevo nombre del usuario
                avatar          Avatar del usuario (como fichero)

      - **modifyPwd**: header con KEY Authorization y VALUE el TOKEN del usuario logueado. Path params con el id del usuario a modificar su contraseña. El body debe contener un objeto JSON en formato raw con la siguiente información.

                {
                        "actualPassword": "Contraseña actual",
                        "newPassword": "Nueva contraseña"
                }

      - **listExercises**: devuelve un listado de todos los ejercicios disponibles. Si el usuario está logueado (header con KEY Authorization y VALUE el TOKEN del usuario) además de la información de cada ejercicio, se devuelve si ese usuario ha dado LIKE o ha añadido a FAVORITOS alguno de los ejercicios. Los Path params se pueden utilizar para filtrar el listado de ejercicios por tipología y grupo muscular.

                Params

                KEY             VALUE
                typology        Ej. cardio
                muscleGroup     Ej. brazos

      - **getExercise**: devuelve la información de un ejercicio en concreto. El id de este debe ser pasada por path params. El header con KEY Authorization y VALUE el TOKEN del usuario logueado.

                Info del ejercicio

                    "data": {
                        "name": "Running",
                        "description": "correr",
                        "photo": "18ec44c3-f734-4087-a9e5-34b214c84f15.jpg",
                        "typology": "Cardio",
                        "muscleGroup": "Piernas",
                        "likes": 3,
                        "favs": 1,
                        "wasLiked": true,
                        "isFav": true
                        }

      - **postLike**: permite al usuario logueado (header con KEY Authorization y VALUE el TOKEN del usuario) pasar el id del ejercicio al que se quiere dar LIKE por path params.
      - **deleteLike**: de la misma forma que **postLike** permite al usuario logueado (header con KEY Authorization y VALUE el TOKEN del usuario) pasar el id del ejercicio al que se quiere quitar LIKE por path params.
      - **addFavourite**: permite al usuario logueado (header con KEY Authorization y VALUE el TOKEN del usuario) pasar el id del ejercicio que se quiere guardar en TUS FAVORITOS por path params.
      - **deleteFavourite**: permite al usuario logueado (header con KEY Authorization y VALUE el TOKEN del usuario) pasar el id del ejercicio que se quiere quitar en TUS FAVORITOS por path params.
      - **getFavourites**: permite al usuario logueado (header con KEY Authorization y VALUE el TOKEN del usuario) pasar su propio id por path params para obtener un listado de sus ejercicios favoritos.

---

<br>

## BASE DE DATOS 💻

### TABLAS

#### users

- id
- name
- email
- password
- avatar
- role
- createdAt

#### exercises

- id
- userId
- name
- description
- photo
- typology
- muscleGroup
- createdAt

#### likes

- id
- userId
- exerciseId
- createdAt

#### favourites

- id
- userId
- exerciseId
- createdAt

---

<br>

## ENDPOINTS 🏁

<br>

### users ENDPOINTS 🔗

- POST [/users] ▶️ Registro de usuario ◾ newUser.
- POST [/users/login] ▶️ Login de usuario (Devuelve **TOKEN**) ◾ loginUser.
- GET [/users/:id] ▶️ Devuelve información de los usuarios. **TOKEN** ◾ infoUser.

<br>

### exercises ENDPOINTS 🔗

#### USERS ADMIN

- POST [/exercises] ▶️ Creación de un nuevo ejercicio. **TOKEN** ◾ createExercise.
- PUT [/exercises/:id] ▶️ Modificación de un ejercicio. **TOKEN** ◾ modifyExercise.
- DELETE [/exercises/:id] ▶️ Eliminación de un ejercicio. **TOKEN** ◾ deleteExercise.

#### USERS MEMBER

- GET [/exercises] ▶️ Listado de todos los ejercicios con filtros. **TOKEN OPCIONAL** ◾ listExercises.
- GET [/exercises/:id] ▶️ Devuelve información de un ejercicio concreto. **TOKEN OPCIONAL** ◾ getExercise.
- POST [/exercises/:id/likes] ▶️ Añade un like a un ejercicio. **TOKEN** ◾ postLike.
- DELETE [/exercises/:id/likes] ▶️ Deshace un like de un ejercicio. **TOKEN** ◾ deleteLike.

<br>

### Extra ENDPOINTS ⭐

#### FAVOURITES

- POST [/exercises/:id/favourites] ▶️ Añade un ejercicio a la lista de favoritos. **TOKEN** ◾ addFavourite.
- DELETE [/exercises/:id/favourites] ▶️ Quita un ejercicio de la lista de favoritos. **TOKEN** ◾ deleteFavourite.
- GET [/exercises/favourites] ▶️ Muestra al usuario su lista de favoritos. **TOKEN** ◾ getFavourite.

#### ADMIN FUNCIONALIDADES EXTRA

- DELETE [/users/:id] ▶️ Permite al admin borrar un usuario. **TOKEN** ◾deleteUser.

#### USERS FUNCIONALIDADES EXTRA

- PUT [/users/:id] ▶️ Permite al usuario modificar su nombre y avatar. **TOKEN** ◾modifyUser
- PUT [/users/:id/password] ▶️ Permite al usuario cambiar su contraseña. **TOKEN** ◾modifyPwd

---
