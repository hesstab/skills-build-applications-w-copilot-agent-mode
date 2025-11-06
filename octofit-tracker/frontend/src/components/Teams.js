import React, { useEffect, useState } from 'react';


const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="display-6 mb-4">Teams</h2>
          <button className="btn btn-primary mb-3" type="button" data-bs-toggle="modal" data-bs-target="#teamModal">Add Team</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{team.id || idx + 1}</td>
                  <td>{team.name || '-'}</td>
                  <td>{team.members ? team.members.join(', ') : JSON.stringify(team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Example */}
      <div className="modal fade" id="teamModal" tabIndex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="teamModalLabel">Add Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="teamName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamMembers" className="form-label">Members</label>
                  <input type="text" className="form-control" id="teamMembers" placeholder="Comma separated" />
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
export default Teams;
