

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

function App() {
  const { isLoading } = useContext(LoaderContext);
  console.log(isLoading, "isLoading")
  return (
    <Loader loading={isLoading} >
      <div style={{ height: '100vh' }} className="">
        <Navbar />

        <Routes>

          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/login" replace element={<Loginpage />} />
          <Route path="/users" element={<Authprovider ><Users />  </Authprovider >} />

        </Routes>
      </div>
    </Loader >
  );
}

export default App;
