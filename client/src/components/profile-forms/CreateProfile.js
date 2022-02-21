import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    institute: "",
    location: "",
    level: "",
    term: "",
    skills: "",
    githubusername: "",
    bio: "",
  });

  const {
    fullName,
    institute,
    location,
    level,
    term,
    skills,
    githubusername,
    bio,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Let's get some information to make your profile stand out
      </p>
      <small>* = required field</small>
      {/* <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={states} onChange={(e) => onChange(e)}>
            <option value="0">Select Level</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full name"
            name="fullName"
            value={fullName}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">Please provide your full name</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="BUET/Dhaka University etc."
            name="institute"
            value={institute}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            Please provide your institution name
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Dhaka/Chattogram/Rajshahi"
            name="location"
            value={location}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            City & State suggested (eg. Dhaka,Chattogram)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="example: 4"
            name="level"
            value={level}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">Current level you are in</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="example: 1"
            name="term"
            value={term}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">Current term you are in</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your skillset"
            name="skills"
            value={skills}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS, JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>
      </form> */}
    </Fragment>
  );
};

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
