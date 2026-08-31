import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const buildApiUrl = () => `${apiBaseUrl}/api/teams/`;

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidateKeys = ['teams', 'results', 'data', 'items', 'records'];

  for (const key of candidateKeys) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  const value = Object.values(payload).find(Array.isArray);
  return Array.isArray(value) ? value : [];
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl(), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading teams...</div>
        ) : (
          <div className="row g-3">
            {teams.length === 0 ? (
              <div className="col-12 text-muted">No teams found.</div>
            ) : (
              teams.map((team) => (
                <div key={team._id || team.id || team.name} className="col-md-6">
                  <div className="border rounded p-3 h-100">
                    <h3 className="h5 mb-1">{team.name}</h3>
                    <p className="text-muted mb-2">{team.description || 'No description available.'}</p>
                    <div className="small text-secondary mb-2">
                      Members: {Array.isArray(team.members) ? team.members.length : 0}
                    </div>
                    <div className="fw-semibold">Total points: {team.totalPoints ?? 0}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
