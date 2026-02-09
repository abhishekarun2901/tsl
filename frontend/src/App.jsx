import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Fixtures from './pages/Fixtures';
import Table from './pages/Table';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import TopScorers from './pages/TopScorers';
import UpdateTournament from './pages/UpdateTournament';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Hidden admin route */}
        <Route path="/update-tournament" element={<UpdateTournament />} />
        
        {/* Public routes with navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/table" element={<Table />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/teams/:id" element={<TeamDetail />} />
              <Route path="/top-scorers" element={<TopScorers />} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
