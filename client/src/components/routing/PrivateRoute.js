import React from "react";
import PropTypes from "prop-types";
import { Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Element,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  let navigation = useNavigate();
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        navigation("/login")
      ) : (
        <Element {...props} />
      )
    }
  />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
