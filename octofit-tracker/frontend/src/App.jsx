import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function Overview() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="alert alert-info mb-0">
          <strong>API base:</strong> {apiBaseUrl}
          <div className="small mt-1 text-secondary">
            VITE_CODESPACE_NAME must be defined in .env.local for GitHub Codespaces.
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xl-3">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h5 text-muted">Users</h2>
            <p className="display-6 mb-0">Track each athlete and coach</p>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xl-3">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h5 text-muted">Teams</h2>
            <p className="display-6 mb-0">Build group accountability</p>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xl-3">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h5 text-muted">Activities</h2>
            <p className="display-6 mb-0">Log workouts and milestones</p>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xl-3">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h2 className="h5 text-muted">Leaderboard</h2>
            <p className="display-6 mb-0">Celebrate healthy competition</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Octofit Tracker</p>
            <h1 className="h2 mb-0">Fitness dashboard</h1>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded mt-3 px-3">
          <div className="navbar-nav flex-row flex-wrap gap-2">
            <NavLink className="nav-link" to="/">Overview</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
