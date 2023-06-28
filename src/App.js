

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

function App() {
  const { isLoading } = useContext(LoaderContext);


  return (
    <Loader loading={isLoading} >
      {/* className={`app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}` */}
      <div style={{ height: '100vh' }}>

        <Routes>
          <Route path="/" element={<Publicroute><Loginpage /></Publicroute>} />
          <Route path="/users" element={<Authprovider ><Users />  </Authprovider >} />
          <Route path="/siteconfig" element={<Authprovider><Siteconfigureration /></Authprovider>} />

        </Routes>
      </div>
    </Loader >
  );
}

export default App;
