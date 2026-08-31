import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const localApiUrl = 'http://localhost:8000/api/workouts/';
const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
const apiUrl = codespaceName ? codespaceApiUrl : localApiUrl;

const buildApiUrl = () => apiUrl;

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidateKeys = ['workouts', 'results', 'data', 'items', 'records'];

  for (const key of candidateKeys) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  const value = Object.values(payload).find(Array.isArray);
  return Array.isArray(value) ? value : [];
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl(), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load workouts.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading workouts...</div>
        ) : (
          <div className="row g-3">
            {workouts.length === 0 ? (
              <div className="col-12 text-muted">No workouts found.</div>
            ) : (
              workouts.map((workout) => (
                <div key={workout._id || workout.id || workout.name} className="col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h5 mb-0">{workout.name}</h3>
                      <span className="badge text-bg-primary">{workout.type}</span>
                    </div>
                    <p className="text-muted mb-2">{workout.description || 'No description available.'}</p>
                    <div className="small text-secondary">
                      {workout.durationMinutes ?? workout.duration ?? 0} min • {workout.difficulty || 'moderate'} • {workout.focusArea || 'general'}
                    </div>
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

export default Workouts;
