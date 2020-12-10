import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import firebase from "firebase"

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  Alert,
  InputGroup,
} from "reactstrap";
import { isImportEqualsDeclaration } from "typescript";
import Login from "components/Footers/AuthFooter";

class Auth extends React.Component {
  state = {
    IsUser: false,
    username: '',
    password: '',
    error: false,
    errorText: '',
  }

  onChangeUsername = (e) =>{
    this.setState({ username: e.target.value })
  }

  onChangePassword = (e) =>{
    this.setState({ password: e.target.value })
  }

  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  LoginWithGoogle = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

firebase.auth().signInWithRedirect(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  const db = firebase.firestore()

  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
  }

  GetAuthState = () =>{
 const self = this

 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Tells the console that you have been logged in
    setTimeout(()=> {
    self.setState({ IsUser: true })
    },2000)
  } else {
    // No user is signed in.
    setTimeout(()=> {
    self.setState({ IsUser: false })
    },2000)
  }
});
  }

  Login = () => {
    const self = this
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(function(user){      
      self.setState({ error: false, errorText: '' })
  const db = firebase.firestore()

  db.collection("users").doc(firebase.auth().currentUser.uid).get().then(function(user){
    if (user.exists)
    {

    }
    else
    {
      db.collection("users").doc(firebase.auth().currentUser.uid).set({        
        Study: "Study role: None set",
        WorkRole: "Work role: None set",
        about: "New user to the console",
        age: "unknown",
        username: "",
        email: firebase.auth().currentUser.email,
        Cover_URL: "https://johannesippen.com/img/blog/humans-not-users/header.jpg",
      })
    }
  })
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      self.setState({ error: true, errorText: errorCode + ' ' + errorMessage })
      // ...
    });
  }

  render() {
    this.GetAuthState()

    if (this.state.IsUser) return <Redirect to='/'/>
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white"></h1>
                    <p className="text-lead text-light">
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
            <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Reset password</small>
                </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="New Password" type="password" autoComplete="new-password" onChange={this.onChangePassword}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.Login}>
                    Reset password
                  </Button>
                  {this.state.error ? (
                        <Alert color="danger">
                        {this.state.errorText}
                      </Alert>
                  ) : (
                    <>
                    </>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="gma.digital"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Auth;
