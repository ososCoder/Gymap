import './ExercisesPage.css';
import { FiChevronDown, FiTrash2 } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ExercisesList } from '../../components/ExercisesList/ExercisesList';
import { AuthContext } from '../../context/AuthContext';
import { getAllExercisesService } from '../../services';

export const ExercisesPage = ({ exercises, setExercises, loading, error }) => {
  const [typology, setTypology] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [showFilters, setShowFilters] = useState('');
  //CONTEXT
  const { token } = useContext(AuthContext);

  //FILTRO
  useEffect(() => {
    const filterExercises = async () => {
      const filtered = await getAllExercisesService(
        typology,
        muscleGroup,
        token
      );
      setExercises(filtered);
    };
    filterExercises();
  }, [typology, muscleGroup, setExercises, token]);

  if (loading) return <p>cargando ejercicios...</p>;
  if (error) return <ErrorMessage message={error} />;

  //COMPONENTE EXERCISES FILTER
  const handleChange = async (e) => {
    e.preventDefault();
  };

  const handleChangeTypology = (e) => {
    setTypology(e.target.value);
  };

  const handleChangeMuscleGroup = (e) => {
    setMuscleGroup(e.target.value);
  };

  const handleClickRemoveFilters = (e) => {
    e.preventDefault();
    setTypology('');
    setMuscleGroup('');
  };

  return (
    <>
      <h3 className='ExercisesPage-title'>
        Filtro de ejercicios{' '}
        <FiChevronDown
          className={`ExercisesPage-dropdownIcon-${showFilters}`}
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        />
      </h3>
      <div className={`ExercisesPage-filter-${showFilters}`}>
        <section className='ExercisesPage-main'>
          <p>Puedes filtrar los ejercicios por tipología y grupo muscular</p>
          <form onChange={handleChange} className='ExercisesPage-form'>
            <h3>Filtrar por:</h3>
            <fieldset className='ExercisesPage-fieldset-typology'>
              <select
                id='typology'
                name='typology'
                onChange={handleChangeTypology}
                value={typology}
              >
                <option value='' disabled hidden>
                  Tipología
                </option>
                <option>Aeróbico</option>
                <option>Anaeróbico</option>
                <option>Resistencia</option>
                <option>Flexibilidad</option>
              </select>
            </fieldset>
            <fieldset className='ExercisesPage-fieldset-muscleGroup'>
              <select
                id='muscleGroup'
                name='muscleGroup'
                onChange={handleChangeMuscleGroup}
                value={muscleGroup}
              >
                <option value='' disabled hidden>
                  Grupo muscular
                </option>
                <option>Brazos</option>
                <option>Hombros</option>
                <option>Espalda</option>
                <option>Pecho</option>
                <option>Abdomen</option>
                <option>Piernas</option>
              </select>
            </fieldset>
            <button onClick={handleClickRemoveFilters}>
              Borrar filtros <FiTrash2 />
            </button>
          </form>
        </section>
      </div>
      <ExercisesList
        exercises={exercises}
        setExercises={setExercises}
        typology={typology}
        muscleGroup={muscleGroup}
      />
    </>
  );
};
