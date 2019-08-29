import React, { useEffect } from "react";
import { addUser, fetchUsers } from "./../store/actions/userAction";
import { Field, reduxForm, change } from "redux-form";
import { required, email } from "./../validation/validate";
import { useDispatch, useSelector } from "react-redux";
import { renderField, RadioGroup, CheckboxGroup } from "./../utils/renderField";
import { withRouter, Link } from "react-router-dom";

const Add = props => {
  const { id } = props.match.params;
  const { user, userSaved } = useSelector(state => {
    return {
      user: state.user.data
        ? state.user.data.find(userData => userData.id === id)
        : [],
      userSaved: state.user.userSaved
    };
  });

  const dispatch = useDispatch();

  useEffect(
    () => {
      id && dispatch(fetchUsers());
    },
    [dispatch, id]
  );

  useEffect(
    () => {
      if (user) {
        dispatch(change("AddForm", "id", user.id));
        dispatch(change("AddForm", "name", user.name));
        dispatch(change("AddForm", "email", user.email));
        dispatch(change("AddForm", "dob", user.dob));
        dispatch(change("AddForm", "portfolio", user.portfolio));
        dispatch(change("AddForm", "hobbies", user.hobbies));
        dispatch(change("AddForm", "gender", user.gender));
        dispatch(change("AddForm", "skills", user.skills));
      }
    },
    [dispatch, user]
  );

  useEffect(
    () => {
      if (userSaved) {
        props.history.push("/");
      }
    },
    [props.history, userSaved]
  );

  const { handleSubmit, submitting } = props;

  return (
    <div>
      <section className="userSection mt-3">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-5 align-self-center">
              <div className="card">
                <div className="card-header">Add/Edit User</div>
                <div className="card-body">
                  <form
                    id="userForm"
                    autoComplete="off"
                    className="form"
                    onSubmit={handleSubmit(values => dispatch(addUser(values)))}
                  >
                    <div className="form-group">
                      <Field
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        component={renderField}
                        validate={required}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        id="email"
                        component={renderField}
                        validate={[required, email]}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        className="form-control"
                        placeholder="Dob"
                        id="dob"
                        name="dob"
                        type="date"
                        component={renderField}
                        validate={required}
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        className="form-control"
                        placeholder="Portfolio"
                        type="text"
                        id="portfolio"
                        name="portfolio"
                        component={renderField}
                        validate={required}
                      />
                    </div>

                    <div className="form-group">
                      <label>Hobbies</label>
                      <Field
                        component={CheckboxGroup}
                        name="hobbies"
                        validate={required}
                        options={[
                          { title: "Travel", value: "travel" },
                          { title: "Music", value: "music" }
                        ]}
                      />
                    </div>

                    <div className="form-group">
                      <label>Gender</label>

                      <Field
                        component={RadioGroup}
                        name="gender"
                        validate={required}
                        options={[
                          { title: "Male", value: "male" },
                          { title: "Female", value: "female" }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Skills</label>
                      <Field
                        component={CheckboxGroup}
                        name="skills"
                        validate={required}
                        options={[
                          { title: "PHP", value: "php" },
                          { title: "JavaScript", value: "javascript" },
                          { title: "React", value: "react" }
                        ]}
                      />
                    </div>

                    <div className="form-group text-left">
                      <button
                        className="btn btn-primary btn-lg my-2 my-sm-0"
                        type="submit"
                        name="submit"
                        disabled={submitting}
                      >
                        Submit
                      </button>
                      <Link to="/" className="btn btn-secondary btn-lg ml-3">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default reduxForm({
  form: "AddForm"
})(withRouter(Add));
