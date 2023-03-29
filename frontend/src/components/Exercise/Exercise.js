import './Exercise.css';
import { toast, Toaster } from 'react-hot-toast';
import { FiHeart, FiStar, FiTrash2, FiEdit3 } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  addFavouriteService,
  deleteExerciseService,
  deleteFavouriteService,
  deleteLikeService,
  getAllExercisesService,
  postLikeService,
} from '../../services';
import { EditExerciseModal } from '../EditExerciseModal/EditExerciseModal';
import { ExerciseModal } from '../ExerciseModal/ExerciseModal';

export const Exercise = ({ exercise, exercises, setExercises }) => {
  const [showModalExercise, setModalExercise] = useState(false);
  const [error, setError] = useState('');
  const [responseOK, setResponseOK] = useState('');
  const [showEditExercise, setShowEditExercise] = useState(false);

  const { token, user } = useContext(AuthContext);

  const postLike = async (e) => {
    e.stopPropagation();
    if (!exercise.wasLiked) {
      await postLikeService(token, exercise.id);
      const newExercises = await getAllExercisesService('', '', token);
      setExercises(newExercises);
    } else if (exercise.wasLiked) {
      await deleteLikeService(token, exercise.id);
      const newExercises = await getAllExercisesService('', '', token);
      setExercises(newExercises);
    }
  };

  //TOAST
  const deleteFav = () =>
    toast.success('Ejercicio eliminado de Mis Favoritos', {
      iconTheme: {
        primary: 'yellow',
        secondary: 'black',
      },
    });

  const addFavourite = async (e) => {
    e.stopPropagation();
    if (!exercise.isFav) {
      await addFavouriteService(token, exercise.id);
      const newExercises = await getAllExercisesService('', '', token);
      setExercises(newExercises);
    } else if (exercise.isFav) {
      await deleteFavouriteService(token, exercise.id);
      //NOTIFICATION
      deleteFav();
      const newExercises = await getAllExercisesService('', '', token);
      setExercises(newExercises);
    }
  };

  const deleteExercise = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Quieres eliminar el ejercicio?') === true) {
      try {
        const response = await deleteExerciseService(token, exercise.id);
        setResponseOK(response.message);

        const newExercises = await getAllExercisesService('', '', token);
        setExercises(newExercises);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const editExercise = (e) => {
    e.stopPropagation();
    setShowEditExercise(true);
  };

  return (
    <>
      <li className='Exercise-exercise'>
        <Toaster />
        <article>
          <div
            className='Exercise-div'
            style={{
              backgroundImage: `url(${process.env.REACT_APP_BACKEND}/${exercise.photo})`,
            }}
            onClick={() => setModalExercise(true)}
          >
            <div className='Exercise-info-div'>
              <h2>{exercise.name}</h2>
              <div className='Exercise-tagsAndActions'>
                <div className='Exercise-tags'>
                  <h3>{exercise.typology}</h3>
                  <h3>{exercise.muscleGroup}</h3>
                </div>
                <div>
                  {user?.role === 'admin' ? (
                    <div className='Exercise-deleteEdit'>
                      <ul>
                        <li>
                          <FiTrash2
                            onClick={deleteExercise}
                            className='Exercise-delete'
                          />
                        </li>
                        <li>
                          <FiEdit3
                            onClick={editExercise}
                            className='Exercise-edit'
                          />
                        </li>
                      </ul>
                    </div>
                  ) : user?.role === 'member' ? (
                    <div>
                      <ul className='Exercise-userLikeFav'>
                        <li>
                          <FiHeart
                            onClick={postLike}
                            className={`Exercise-FiHeart-${exercise.wasLiked}`}
                          />

                          <span
                            className={`Exercise-counterLikes-${exercise.wasLiked}`}
                          >
                            {exercise.likes}
                          </span>
                        </li>
                        <li>
                          <FiStar
                            onClick={addFavourite}
                            className={`Exercise-FiStar-${exercise.isFav}`}
                          />
                          <span
                            className={`Exercise-counterFavs-${exercise.isFav}`}
                          >
                            {exercise.favs}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </article>
        <ExerciseModal
          exercise={exercise}
          showModalExercise={showModalExercise}
          closeModalExercise={() => setModalExercise(false)}
        />
        <EditExerciseModal
          exercise={exercise}
          exercises={exercises}
          setExercises={setExercises}
          showEditExercise={showEditExercise}
          closeEditExercise={() => setShowEditExercise(false)}
        />
      </li>
    </>
  );
};
