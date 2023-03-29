import '../DeleteUser/DeleteUser.css';
import { toast, Toaster } from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import gymapBlack from '../../assets/logo/gymapBlack.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { deleteUserService } from '../../services';

export const DeleteUser = ({ showDeleteUser, closeDeleteUser }) => {
  const [userToDelete, setUserToDelete] = useState('');
  const [error, setError] = useState('');
  const [messageOK, setMessageOK] = useState('');

  //CONTEXT
  const { token } = useContext(AuthContext);

  //Toast
  const userDeleted = () =>
    toast.success(<p>Usuario {userToDelete} eliminado</p>);

  const userDeletedFail = () =>
    toast.error(<p>El usuario #{userToDelete} no existe</p>);

  //FUNCIÓN ELIMINACIÓN USUARIO
  const handleDeleteUserForm = async (e) => {
    e.preventDefault();

    try {
      const response = await deleteUserService(token, userToDelete);
      setMessageOK(response.message);
      userDeleted();
    } catch (error) {
      setError(error.message);
      userDeletedFail();
    } finally {
      setUserToDelete('');
    }
  };

  return (
    <div className={`DeleteUser-modal-${showDeleteUser}`}>
      <Toaster />
      <div className='DeleteUser-container'>
        <header className='DeleteUser-header'>
          <FiX onClick={closeDeleteUser} className='DeleteUser-closeModal' />
          <div>
            <h2>Gymap</h2>
            <img src={gymapBlack} alt='Gymap logo' />
          </div>
        </header>
        <div className='DeleteUser-body'>
          <form onSubmit={handleDeleteUserForm}>
            <h3>Eliminación de usuarios</h3>
            <label htmlFor='idUserToDelete'>#id Usuario a eliminar:</label>
            <input
              required
              id='idUserToDelete'
              name='idUserToDelete'
              type='number'
              min='2'
              value={userToDelete}
              onChange={(e) => setUserToDelete(e.target.value)}
            ></input>
            <button>Eliminar usuario</button>
          </form>
        </div>
        <div className='DeleteUser-footer'></div>
      </div>
    </div>
  );
};
