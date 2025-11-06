import React, { useEffect, useState } from 'react';


const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaders(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="display-6 mb-4">Leaderboard</h2>
          <button className="btn btn-primary mb-3" type="button" data-bs-toggle="modal" data-bs-target="#leaderModal">Add Leader</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader, idx) => (
                <tr key={leader.id || idx}>
                  <td>{leader.id || idx + 1}</td>
                  <td>{leader.name || '-'}</td>
                  <td>{leader.score || JSON.stringify(leader)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Example */}
      <div className="modal fade" id="leaderModal" tabIndex="-1" aria-labelledby="leaderModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="leaderModalLabel">Add Leader</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="leaderName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="leaderName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="leaderScore" className="form-label">Score</label>
                  <input type="number" className="form-control" id="leaderScore" />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
