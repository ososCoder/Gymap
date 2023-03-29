import { useEffect, useState } from 'react';
import { getAllExercisesService } from '../services';

export const useGetExercises = (typology, muscleGroup, token) => {
  const [exercises, setExercises] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await getAllExercisesService(typology, muscleGroup, token);
        setExercises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [typology, muscleGroup, token]);

  return { exercises, setExercises, loading, error };
};
