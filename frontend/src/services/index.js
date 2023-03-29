export const getAllExercisesService = async (
  typology = '',
  muscleGroup = '',
  token = ''
) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises?typology=${typology}&muscleGroup=${muscleGroup}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data.exercises;
};
//Funcion que envia el registro a la bdd
export const createAccountService = async ({ userName, email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userName,
      email,
      password,
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Servicio de Login

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

//Servicio para obtener info del usuario logeado
export const getUserDataService = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

//Servicio que postea un like
export const postLikeService = async (token, exerciseId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${exerciseId}/likes`,
    {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Delete like service
export const deleteLikeService = async (token, exerciseId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${exerciseId}/likes`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Añadir ejercicio a favoritos servicio
export const addFavouriteService = async (token, exerciseId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${exerciseId}/favourites`,
    {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Eliminar ejercicio de favoritos servicio
export const deleteFavouriteService = async (token, exerciseId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${exerciseId}/favourites`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
//Servicio para cambiar la contraseña
export const changePasswordService = async (
  token,
  userId,
  actualPassword,
  newPassword
) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/${userId}/password`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        actualPassword,
        newPassword,
      }),
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Modificar el perfil del usuario (nombre y/o avatar)
export const changeUserDataService = async ({ data, token, userId }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/${userId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: token,
      },
      body: data,
    }
  );

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);
};

//Servicio para crear ejercicio
export const createExerciseService = async (token, data) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/exercises`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: data,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Borrar usuario
export const deleteUserService = async (token, userToDelete) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/${userToDelete}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

//Borrar ejercicio
export const deleteExerciseService = async (token, exerciseId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${exerciseId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

//Servicio editar ejercicio
export const editExerciseService = async (token, exerciseId, data) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${exerciseId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: token,
      },
      body: data,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.exercise;
};

//Servicio llamada a ejercicios favoritos
export const getFavouriteExercisesService = async (token, userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/favourites/${userId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data.exercises;
};
