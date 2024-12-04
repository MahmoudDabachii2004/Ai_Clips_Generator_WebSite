import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CreateVideo from './pages/createVideo';
import DetailVideo from './pages/detailVideo';

import Auth from './pages/auth'; // Renamed for convention

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="createVideo" element={<CreateVideo />} />
        <Route path="detailVideo" element={<DetailVideo />} />

        
        <Route path="authentification" element={<Auth />}>
          <Route path="login" element={<Auth />} /> {/* Correctly defined */}
          <Route path="register" element={<Auth />} /> {/* Correctly defined */}
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;