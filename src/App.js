

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authprovider from './authentication/Authprovider';
import Loginpage from './pages/Loginpage';
import Users from './pages/users';
import { Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { useContext } from 'react';
import LoaderContext from './context/LoaderProvider';
import Loader from './components/Loader';
import Cookies from 'js-cookie';

function App() {
  const { isLoading } = useContext(LoaderContext);
  const token = Cookies.get('token')

  return (
    <Loader loading={isLoading} >
      <div style={{ height: '100vh' }} className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/users" element={<Authprovider ><Users />  </Authprovider >} />

        </Routes>
      </div>
    </Loader >
  );
}

export default App;
