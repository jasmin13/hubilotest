import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUsers } from "./../store/actions/userAction";

const Home = props => {
  const [checkedIds, setCheckedIds] = useState([]);

  const dispatch = useDispatch();
  const users = useSelector(state => state.user.data);
  const checkRec = (target, id) => {
    if (target.checked) {
      checkedIds.push(id);
      setCheckedIds(checkedIds);
    } else {
      setCheckedIds(checkedIds.filter(idSelected => idSelected !== id));
    }
  };

  useEffect(
    () => {
      dispatch(fetchUsers());
    },
    [dispatch]
  );
  return (
  <div>
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col">
          <div className="text-right">
            <Link
              to="/posts/new"
              className="btn btn-primary pull-xs-right mt-3 mr-3 mb-3"
            >
              Add
            </Link>
            <button
              className="btn btn-danger pull-xs-right"
              onClick={() => dispatch(deleteUsers(checkedIds))}
            >
              Delete
            </button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Portfolio Link</th>
                <th>Hobbies</th>
                <th>Gender</th>
                <th>Skills</th>
                <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              {users.map(userData => (
                <tr key={userData.id}>
                  <td>
                    <input
                      type="checkbox"
                      onClick={e => checkRec(e.target, userData.id)}
                    />
                  </td>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>{userData.dob}</td>
                  <td>{userData.portfolio}</td>
                  <td>{userData.hobbies}</td>
                  <td>{userData.gender}</td>
                  <td>{userData.skills}</td>
                  <td>
                    <Link to={"/posts/" + userData.id}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
