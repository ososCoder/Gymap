import './CreateExercise.css';
import { toast } from 'react-hot-toast';
import { FiX, FiUpload } from 'react-icons/fi';
import gymapBlack from '../../assets/logo/gymapBlack.svg';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { createExerciseService, getAllExercisesService } from '../../services';

export const CreateExercise = ({
  showCreateExercise,
  closeCreateExercise,
  setExercises,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [typology, setTypology] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [photo, setPhoto] = useState('');
  const [sendingExercise, setSendingExercise] = useState(false);
  const [errorDataExercise, setErrorDataExercise] = useState('');

  //LLAMADA AL CONTEXTO
  const { token } = useContext(AuthContext);

  if (!showCreateExercise) return null;

  if (!token)
    return (
      <>
        <p>Debes ser admin para poder acceder a esta página</p>
        <Link to="/">
          <h3>Volver al inicio</h3>
        </Link>
      </>
    );

  //Toast
  const createdExercise = () => toast.success('Ejercicio creado correctamente');
  const createdExerciseError = () => toast.error('Error al crear el ejercicio');

  //Crear ejercicio
  const handleCreateExerciseForm = async (e) => {
    e.preventDefault();
    try {
      setSendingExercise(true);

      let data = new FormData();

      data.append('name', name);
      data.append('description', description);
      data.append('photo', photo);
      data.append('typology', typology);
      data.append('muscleGroup', muscleGroup);

      await createExerciseService(token, data);

      createdExercise();
      setName('');
      setDescription('');
      setTypology('');
      setMuscleGroup('');
      setPhoto(null);
      //llamada a ejercicios
      const newExercisesList = await getAllExercisesService('', '', token);

      //setExercises. Función pasada por props desde el hook
      setExercises(newExercisesList);

      closeCreateExercise();
    } catch (error) {
      setErrorDataExercise(error.message);
      createdExerciseError();
    } finally {
      setSendingExercise(false);
    }
  };

  return (
    <div className={`CreateExercise-modal-${showCreateExercise}`}>
      <div className="CreateExercise-container">
        <header className="CreateExercise-header">
          <FiX
            onClick={closeCreateExercise}
            className="CreateExercise-closeModal"
          />
          <div>
            <h2>Gymap</h2>
            <img src={gymapBlack} alt="Gymap logo" />
          </div>
          <p>Creando ejercicio</p>
        </header>
        <div className="CreateExercise-body">
          <form onSubmit={handleCreateExerciseForm}>
            <div className="CreateExercise-data">
              <section>
                <label>Titulo</label>
                <input
                  id="titulo"
                  required
                  placeholder="Titulo del ejercicio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </section>
              <section>
                <label>Descripcion del ejercicio</label>
                <textarea
                  id="descripcionDelEjercicio"
                  required
                  placeholder="Descripcion del ejercicio"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </section>
              <section>
                <ul>
                  <li>
                    <select
                      id="typology"
                      name="typology"
                      value={typology}
                      onChange={(e) => {
                        setTypology(e.target.value);
                      }}
                    >
                      <option value="" disabled hidden>
                        Tipología
                      </option>
                      <option value="Aeróbico">Aeróbico</option>
                      <option value="Anaeróbico">Anaeróbico</option>
                      <option value="Resistencia">Resistencia</option>
                      <option value="Flexibilidad">Flexibilidad</option>
                    </select>
                  </li>
                  <li>
                    <select
                      id="muscleGroup"
                      name="muscleGroup"
                      value={muscleGroup}
                      onChange={(e) => setMuscleGroup(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Grupo muscular
                      </option>
                      <option>Brazos</option>
                      <option>Hombros</option>
                      <option>Espalda</option>
                      <option>Pecho</option>
                      <option>Abdomen</option>
                      <option>Piernas</option>
                    </select>
                  </li>
                </ul>
              </section>
            </div>
            <div className="CreateExercise-image">
              <label htmlFor="exercisePhoto">
                <FiUpload />
              </label>
              <input
                type="file"
                id="exercisePhoto"
                name="exercisePhoto"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              ></input>
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`${name} Preview`}
                  className="CreateExercise-newImage"
                />
              ) : null}
            </div>
            <button>CREAR EJERCICIO</button>
          </form>
          {sendingExercise ? 'Actualizando ejercicio' : null}
          {errorDataExercise ? errorDataExercise : null}
        </div>
        <div className="CreateExercise-footer"></div>
      </div>
    </div>
  );
};
