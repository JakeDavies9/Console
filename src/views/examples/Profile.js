import React from "react";
import firebase from "firebase"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

class Profile extends React.Component {
  state = {
    userEmail: '',
    Study: "",
    WorkRole: "",
    about: "",
    age: "",
    username: "",
    about: "",
    loaded: false,
    IsUser: false,
    UID: "",
    POST_COUNT: 0,
    CoverURL: "",
    UserPicture: "",
    displayName: "",
  }

  SetStateFromAuth = () =>{
    //updates the auth flow based on if signed in
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setTimeout(() => {
          self.setState({ IsUser: true, userEmail: user.email, UID: user.uid, displayName: user.displayName})
        },800)
      } else {
        // No user is signed in.      
        setTimeout(() => {
          self.setState({ IsUser: false, LoggedOut: true })
        },800)
      }
    })
  }

  DeleteAccount = () =>{
    const db = firebase.firestore()
    let Confirm = window.confirm("Do you want to delete your account?")
    if (Confirm)
    {
      if(this.state.POST_COUNT == 0)
      {

        db.collection("users").doc(firebase.auth().currentUser.uid).delete()

        setTimeout(()=> {          
  firebase.auth().currentUser.delete().then(()=>{
    window.alert("Deleted")
  }).catch((error)=>{
    window.alert(error + " For your surcurity please log out and log in and try again so we can verify it's you")
  })
       },900)
      }
      }
      else
      {
        this.deleteCollection()
    }
  }

   deleteCollection() {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    let collectionRef = db.collection('users').doc(firebase.auth().currentUser.uid).collection('posts');
    let query = collectionRef.orderBy('__name__').limit(200);
  
    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(db, query, resolve, reject);
    });
  }
  
   deleteQueryBatch(db, query, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
          return 0;
        }
  
        // Delete documents in a batch
        let batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }
  
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          this.deleteQueryBatch(db, query, resolve, reject);
        });
      })
      .catch(reject);
  }

  GetUserData = () =>{
    const self = this
    const db = firebase.firestore()

    db.collection("users").doc(this.state.UID).get().then(function(user){
      self.setState({
        Study: user.data().Study,
        WorkRole: user.data().WorkRole,
        about: user.data().about,
        age: user.data().age,
        username: user.data().username,
        UserPicture: user.data().Cover_URL,        
      })
    }).then(() => {
      db.collection("users").doc(this.state.UID).collection("posts").get().then(function(snap){
        self.setState({ POST_COUNT: snap.size })
      })
    })
  }

  SetData = () =>{
    
    const db = firebase.firestore()
  db.collection("users").doc(firebase.auth().currentUser.uid).get().then(function(user){
    if (user.exists)
    {
      if (user.data().HasData){

      }
      else{
      db.collection("users").doc(firebase.auth().currentUser.uid).update({        
        Study: "Study role: None set",
        WorkRole: "Work role: None set",
        about: "New user to the console",
        age: "unknown",
        username: "",
        HasData: true,
        email: firebase.auth().currentUser.email,
        Cover_URL: "https://johannesippen.com/img/blog/humans-not-users/header.jpg",
      })
    }
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
  }
    render() {
      setTimeout(()=> {
      this.SetStateFromAuth()  
      },2000)
      if (this.state.loaded == false){
         this.SetData()
          setTimeout(()=> {
        this.GetUserData()
        },3500)
        setTimeout(()=> {
          this.setState({ loaded: true })
        },800)
      }
    return (
      <>
        <UserHeader profilePic={this.state.UserPicture} cover={this.state.CoverURL} user={this.state.displayName ? (this.state.displayName) : (this.state.userEmail)} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={this.DeleteAccount}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Projects</span>
                        </div>
                        <div>
                         <span className="heading">{this.state.POST_COUNT}</span>
                          <span className="description">Posts</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.userEmail}
    <span className="font-weight-light">, age: {this.state.age}</span>
                      <br />
                      <Button color="primary pr-2">Change</Button>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Lives: Unknown
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.WorkRole}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.Study}
                    </div>
                    <hr className="my-4" />
                    <p>
                      {this.state.about}
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="user.gmad"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="user@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="New York"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
