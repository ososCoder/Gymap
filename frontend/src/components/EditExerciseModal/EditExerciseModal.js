import '../EditExerciseModal/EditExerciseModal.css';
import { FiX, FiEdit3 } from 'react-icons/fi';
import gymapBlack from '../../assets/logo/gymapBlack.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { editExerciseService } from '../../services';
import { toast, Toaster } from 'react-hot-toast';

export const EditExerciseModal = ({
  exercise,
  exercises,
  setExercises,
  showEditExercise,
  closeEditExercise,
}) => {
  const [name, setName] = useState(exercise.name);
  const [description, setDescription] = useState(exercise.description);
  const [typology, setTypology] = useState(exercise.typology);
  const [muscleGroup, setMuscleGroup] = useState(exercise.muscleGroup);
  const [photo, setPhoto] = useState();
  const [editingExercise, setEditingExercise] = useState(false);
  const [errorEditExercise, setErrorEditExercise] = useState('');

  //LLAMADA AL CONTEXTO
  const { token } = useContext(AuthContext);

  //HOT TOAST
  const editNotificationOK = () => toast.success('Ejercicio modificado');

  //FORM
  const handleEditExerciseForm = async (e) => {
    e.preventDefault();

    try {
      setEditingExercise(true);

      let data = new FormData();

      data.append('name', name);
      data.append('description', description);
      data.append('photo', photo);
      data.append('typology', typology);
      data.append('muscleGroup', muscleGroup);

      const editedExercise = await editExerciseService(
        token,
        exercise.id,
        data
      );

      setExercises(
        exercises.map((currentExercise) => {
          if (currentExercise.id === exercise.id) {
            currentExercise.name = editedExercise.name;
            currentExercise.description = editedExercise.description;
            currentExercise.typology = editedExercise.typology;
            currentExercise.muscleGroup = editedExercise.muscleGroup;
            currentExercise.photo = editedExercise.photo;

            //Otra forma de hacer lo mismo que arriba
            // currentExercise = {
            //   ...currentExercise,
            //   ...editedExercise,
            // };
          }

          return currentExercise;
        })
      );

      //TOAST
      editNotificationOK();
    } catch (error) {
      setErrorEditExercise(error.message);
    } finally {
      setEditingExercise(false);
    }
  };

  return (
    <>
      <Toaster />

      <div className={`EditExercise-modal-${showEditExercise}`}>
        <div className="EditExercise-container">
          <header className="EditExercise-header">
            <FiX
              onClick={closeEditExercise}
              className="EditExercise-closeModal"
            />
            <div>
              <h2>Gymap</h2>
              <img src={gymapBlack} alt="Gymap logo" />
            </div>
          </header>
          <div className="EditExercise-body">
            <p>Editando ejecicio</p>
            <form
              onSubmit={handleEditExerciseForm}
              className="EditExerciseModal-form"
            >
              <div className="EditExercise-data">
                <section>
                  <label>
                    Titulo <FiEdit3 className="EditExercise-iconTitulo" />
                  </label>
                  <input
                    id="titulo"
                    required
                    placeholder="Titulo del ejercicio"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </section>
                <section>
                  <label>
                    Descripcion del ejercicio{' '}
                    <FiEdit3 className="EditExercise-iconTitulo" />
                  </label>
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
                        <option>Aeróbico</option>
                        <option>Anaeróbico</option>
                        <option>Resistencia</option>
                        <option>Flexibilidad</option>
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
              <div className="EditExercise-image">
                {/* <label htmlFor='exercisePhoto'>
                  <FiUpload />
                </label> */}
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`${exercise.name} Preview`}
                  />
                ) : exercise.photo ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/${exercise.photo}`}
                    alt={`${exercise.name} Preview`}
                  />
                ) : null}
                <input
                  type="file"
                  id="exercisePhoto"
                  accept="image/*"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  className="EditExerciseModal-imageUploadInput"
                />
              </div>
              <button>EDITAR EJERCICIO</button>
            </form>
            {/* {editingExercise ? 'Editando ejercicio' : null}
            {errorEditExercise ? errorEditExercise : null} */}
          </div>
          <div className="EditExercise-footer"></div>
        </div>
      </div>
    </>
  );
};
