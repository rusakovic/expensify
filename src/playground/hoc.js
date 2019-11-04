
import React from 'react';
import ReactDom from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      { props.isAdmin && <p>This is private info. Please, don't share!</p> }
      
      <WrappedComponent {...props} />
    </div>
  )
}

const requireAuthentication = (WrappedComponent) => {
  return(props) => (
    <div>
      { props.isAuthenticated ? 
        ( <p>Admin info</p>) : (
          <p>please log-in</p>
        )}
      <WrappedComponent {...props} />
    </div>
  )
  }



const AdminInfo =  withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDom.render(<AdminInfo isAdmin={true} info="this is the detail" />, document.getElementById('app'))
ReactDom.render(<AuthInfo isAuthenticated={false} info="this is the detail" />, document.getElementById('app'))