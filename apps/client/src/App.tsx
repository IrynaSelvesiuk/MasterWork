import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { Links } from './enum/Links';
import LoginPage from './pages/Login/LoginPage';
import TutorsPage from './pages/Tutors/TutorsPage';
import RegisterPage from './pages/Register/RegisterPage';
import { Provider } from 'react-redux';
import { store } from './context/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Links.ROOT} element={<Home />} />
            <Route path={Links.LOGIN_STUDENT} element={<LoginPage />} />
            <Route path={Links.REGISTER_TEACHER} element={<RegisterPage />} />
            <Route path={Links.LOGIN_TEACHER} element={<LoginPage />} />
            <Route path={Links.TUTORS} element={<TutorsPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
