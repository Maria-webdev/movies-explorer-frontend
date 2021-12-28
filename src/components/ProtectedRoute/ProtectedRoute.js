import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...props }) => {
  // TODO проблема с loggedIn при монтирвании on False, поэтому редирект на главную
  return (
    <Route>
      {() =>
        (props.loggedIn ? <Component {...props} /> : <Redirect to='/' />)
      }
    </Route>
  );
};

export default ProtectedRoute;