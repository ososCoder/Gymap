import '../EditProfile/EditProfile.css';
import { toast, Toaster } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  changePasswordService,
  changeUserDataService,
  getUserDataService,
} from '../../services';

export const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //CONTEXTO para comprobar login.
  const { token, user, setUser } = useContext(AuthContext);

  if (!token)
    return (
      <>
        <p>Debes de iniciar sesión para poder acceder a esta página</p>
        <Link to='/'>
          <h3>Volver al inicio</h3>
        </Link>
      </>
    );

  //Modificar contraseña
  const passwordChangeNotification = () =>
    toast.success('La contraseña ha sido modificada correctamente');

  const failedToChangePassword = () =>
    toast.error(error ? <p>{error}</p> : 'Completa los campos necesarios');

  const handlePasswordForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await changePasswordService(token, user.id, actualPassword, newPassword);
      setNewPassword('');
      setActualPassword('');
      passwordChangeNotification();
    } catch (error) {
      setError(error.message);
      setNewPassword('');
      setActualPassword('');
      failedToChangePassword();
    } finally {
      setLoading(false);
    }
  };

  //Modificar usuario (nombre y foto de perfil)
  const infoUserNotification = () =>
    toast.success('Información del usuario actualizada correctamente');

  const failedToChangeUserInfo = () =>
    toast.error(error ? <p>{error}</p> : 'Completa los campos necesarios');

  const handleUserInfoForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let data = new FormData();
      data.append('name', userName);
      data.append('avatar', image);

      await changeUserDataService({ data, token, userId: user.id });

      //LLAMADA A DATOS TRAS ACTUALZARLOS
      const dataUser = await getUserDataService(token, user.id);

      setUser({
        ...dataUser,
      });
      e.target.reset();

      setUserName('');
      setImage(null);

      infoUserNotification();
    } catch (error) {
      setError(error.message);
      setUserName('');
      setImage(null);
      failedToChangeUserInfo();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <header className='EditProfile-header'>
        <h2>Aquí puedes editar tu información personal y contraseña</h2>
      </header>
      <section className='EditProfile-container'>
        <form onSubmit={handleUserInfoForm} className='EditProfile-infoForm'>
          <h3>Nombre y foto de perfil </h3>
          <fieldset>
            <label htmlFor='newUserName'>Nuevo nombre:</label>
            <input
              type='text'
              id='newUserName'
              name='newUserName'
              placeholder='Introduce un nuevo nombre aquí'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <p>Nueva foto de perfil:</p>
            <div>
              <label htmlFor='newAvatar' id='uploaderAvatar'>
                <FiUpload />
              </label>
              <input
                type='file'
                id='newAvatar'
                name='newAvatar'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`${user.name} Preview`}
                  className='EditProfile-imagePreview'
                />
              ) : null}
            </div>
          </fieldset>
          <button>Actualizar perfil</button>
          {loading ? 'Actualizando perfil...' : null}
          {/* {error ? 'Error al actualizar el perfil...' : null} */}
        </form>
      </section>
      <section className='Password-container'>
        <form
          onSubmit={handlePasswordForm}
          className='EditProfile-changePasswordForm'
        >
          <h3>Cambia tu contraseña</h3>
          <fieldset>
            <label htmlFor='actualPassword'>Contraseña actual:</label>
            <input
              type='password'
              id='actualPassword'
              placeholder='Introduce tu contraseña actual'
              value={actualPassword}
              onChange={(e) => setActualPassword(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor='newPassword'>Nueva contraseña:</label>
            <input
              type='password'
              id='newPassword'
              placeholder='Introduce tu nueva contraseña'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
          </fieldset>
          <button>Actualizar contraseña</button>
          {loading ? 'Actualizando contraseña' : null}
        </form>
      </section>
    </>
  );
};
