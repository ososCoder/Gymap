import './App.css';

//imports externos
import { Routes, Route } from 'react-router-dom';

//components
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFound/NotFound';
import { ExercisesPage } from './pages/ExercisesPage/ExercisesPage';
import { ExercisesFavourites } from './pages/ExercisesFavourites/ExercisesFavourites';
import { EditProfile } from './pages/EditProfile/EditProfile';

import { useGetExercises } from './hooks/useGetExercises';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  //CONTEXT
  const { token } = useContext(AuthContext);

  //HOOK
  const { exercises, loading, error, setExercises } = useGetExercises(
    '',
    '',
    token
  );

  return (
    <div className='App'>
      <Header setExercises={setExercises} />
      <main className='App-main'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/exercises'
            element={
              <ExercisesPage
                exercises={exercises}
                setExercises={setExercises}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path='/exercises/favourites'
            element={
              <ExercisesFavourites
                exercises={exercises}
                setExercises={setExercises}
              />
            }
          />
          <Route path='/profile' element={<EditProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
