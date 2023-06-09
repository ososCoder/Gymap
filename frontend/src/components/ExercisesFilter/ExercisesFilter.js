import { useState } from 'react';

export const ExercisesFilter = ({ children }) => {
  const [typology, setTypology] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');

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
    <section>
      <h3>Filtro de ejercicios</h3>
      <p>Puedes filtrar los ejercicios por tipología y grupo muscular</p>
      <form onChange={handleChange}>
        <h3>Filtrar por:</h3>
        <fieldset>
          {/* <label htmlFor='typology'>Tipología: </label> */}
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
        <fieldset>
          {/* <label htmlFor='muscleGroup'>Grupo muscular: </label> */}
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
        <button onClick={handleClickRemoveFilters}>Borrar filtros</button>
      </form>
    </section>
  );
};
