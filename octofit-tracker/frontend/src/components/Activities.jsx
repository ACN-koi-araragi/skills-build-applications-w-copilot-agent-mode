import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const apiUrl = `${apiBaseUrl}/api/activities/`;

const buildApiUrl = () => apiUrl;

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidateKeys = ['activities', 'results', 'data', 'items', 'records'];

  for (const key of candidateKeys) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  const value = Object.values(payload).find(Array.isArray);
  return Array.isArray(value) ? value : [];
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl(), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load activities.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {loading ? (
          <div className="text-muted">Loading activities...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-muted text-center">
                      No activities found.
                    </td>
                  </tr>
                ) : (
                  activities.map((activity) => (
                    <tr key={activity._id || activity.id || `${activity.type}-${activity.date}`}>
                      <td>{activity.type}</td>
                      <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                      <td>{activity.durationMinutes ?? activity.duration ?? '—'} min</td>
                      <td>{activity.caloriesBurned ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
