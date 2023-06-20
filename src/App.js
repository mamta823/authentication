

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authprovider from './authentication/Authprovider';
import Loginpage from './pages/Loginpage';
import Users from './pages/users';
import { Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/login" replace element={<Loginpage />} />
        <Route path="/users" element={<Authprovider ><Users />  </Authprovider >} />

      </Routes>
    </div>
  );
}

export default App;
