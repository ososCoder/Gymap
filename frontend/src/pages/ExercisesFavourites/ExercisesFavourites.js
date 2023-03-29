import { useEffect, useState } from 'react';
import { Exercise } from '../../components/Exercise/Exercise';
// import { AuthContext } from '../../context/AuthContext';
import './ExercisesFavourites.css';
// import { getFavouriteExercisesService } from '../../services';
export const ExercisesFavourites = ({ exercises, setExercises }) => {
  const [listaFavs, setListaFavs] = useState([]);
  const [error, setError] = useState('');

  // const { token, user } = useContext(AuthContext);

  useEffect(() => {
    try {
      const getFavourites = async (exercises) => {
        const isFavExercises = exercises?.filter(
          (exercise) => exercise.isFav === true
        );
        setListaFavs(isFavExercises);
      };
      getFavourites(exercises);
    } catch (error) {
      setError(error);
    }
  }, [exercises]);

  return (
    <section className='ExercisesFavourites-section'>
      <h2>Tus ejercicios favoritos</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {listaFavs?.map((exercise) => {
          return (
            <Exercise
              exercise={exercise}
              exercises={exercises}
              key={exercise.id}
              setExercises={setExercises}
            />
          );
        })}
      </ul>
    </section>
  );
};
