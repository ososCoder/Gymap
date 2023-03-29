import './ExercisesList.css';
import { Exercise } from '../Exercise/Exercise';
import { Fragment } from 'react';

export const ExercisesList = ({
  exercises,
  setExercises,
  typology,
  muscleGroup,
}) => {
  return (
    <section className='ExercisesList'>
      {exercises.length === 0 ? (
        <Fragment>
          <p className='ExercisesList-noFilter'>
            No existen ejercicios disponibles en la categoría de{' '}
            <span>{typology}</span> + <span>{muscleGroup}</span>.
          </p>{' '}
          <p className='ExercisesList-noFilterDelete'>
            Borra los filtros o modifícalos para poder visualizar otros
            ejercicios.
          </p>
        </Fragment>
      ) : null}
      <ul className='ExercisesList-list'>
        {exercises.map((exercise) => {
          return (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              exercises={exercises}
              setExercises={setExercises}
            />
          );
        })}
      </ul>
    </section>
  );
};
