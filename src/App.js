

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authprovider from './authentication/Authprovider';
import Loginpage from './pages/Loginpage';
import Users from './pages/users';
import { useContext } from 'react';
import LoaderContext from './context/ContextProvider';
import Loader from './components/Loader';
import Publicroute from './authentication/Publicroute';
import Siteconfigureration from './pages/siteconfigureration';
import Cookies from 'js-cookie';

function App() {
  const { isLoading } = useContext(LoaderContext);
  const handleSave = (str) => {
    const tok = Cookies.set('str', str)
    console.log("yes", tok)
  }

  const handleLogoutSave = () => {
    const string = Cookies.get('str')
    console.log(string, "topken in context")
    Cookies.remove('str', { path: '/', domain: "" })
  }
  return (
    <Loader loading={isLoading} >
      {/* className={`app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}` */}
      <div style={{ height: '100vh' }}>
        <buttun onClick={() => handleSave("sdfhjshd82734897489vcffdsfsdf")}>save</buttun>
        <button onClick={() => handleLogoutSave()}>logoutsave</button>
        <Routes>
          <Route path="/" element={<Publicroute><Loginpage /></Publicroute>} />
          <Route path="/users" element={<Authprovider ><Users />  </Authprovider >} />
          <Route path="/siteconfig" element={<Authprovider ><Siteconfigureration /></Authprovider>} />

        </Routes>
      </div>
    </Loader >
  );
}

export default App;
