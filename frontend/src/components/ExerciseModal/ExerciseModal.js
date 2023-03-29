import './ExerciseModal.css';
import { FiX } from 'react-icons/fi';
import gymapBlack from '../../assets/logo/gymapBlack.svg';

export const ExerciseModal = ({
  exercise,
  showModalExercise,
  closeModalExercise,
}) => {
  //Si no se ha pulsado sobre el ejercicio el State de showModalExercise no cambia a true-
  //Por lo tanto no se muestra el Modal del ejercicio
  if (!showModalExercise) return null;

  //En cambio si hay click sobre el ejercicio showModalExercise será true.
  //Se retornará el modal del ejercicio con toda la información.
  return (
    <div className="ExerciseModal-modal">
      <div className="ExerciseModal-container">
        <header className="ExerciseModal-header">
          <FiX
            onClick={closeModalExercise}
            className="ExerciseModal-closeModal"
          />
          <div>
            <h2>Gymap</h2>
            <img src={gymapBlack} alt="Gymap logo" />
          </div>
        </header>
        <div className="ExerciseModal-body">
          <div className="ExerciseModal-data">
            <h2>{exercise.name}</h2>
            <p>{exercise.description}</p>
            <div className="ExerciseModal-body-tags">
              <h3>{exercise.typology}</h3>
              <h3>{exercise.muscleGroup}</h3>
            </div>
          </div>
          <img
            src={`${process.env.REACT_APP_BACKEND}/${exercise.photo}`}
            alt={exercise.description}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
