import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { Links } from './enum/Links';
import LoginPage from './pages/Login/Login';
import TutorsPage from './pages/Tutors/TutorsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path={Links.ROOT} element={<Home />} />
          <Route path={Links.LOGIN_STUDENT} element={<LoginPage />} />
          <Route path={Links.TUTORS} element={<TutorsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
