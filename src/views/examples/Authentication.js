import React from "react";
import './authentication.css'
import firebase from "firebase"
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  Label,
  Input,
  FormGroup,
  CardFooter,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  Form,
  UncontrolledTooltip
} from "reactstrap";

import Cookies, { set } from 'js-cookie'
import uuidV3 from 'uuid/dist/v4'
import uuid from 'uuid/dist/v4'
// core components
import UserHeader from "components/Headers/auth";
import Modal from "components/modals/modal"

class Profile extends React.Component {
  state = {
    SessionID: "",
    AddUser: false,
    loaded: false,
    IsGoogleEnabled: false,
    IsFacebookEnabled: false,
    IsGithubEnabled: false,
    IsCustomEnabled: false,
    itemArray: [],
    UID: "",
  }

  deleteUser = (id) => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("console-users").doc(id).delete().then(res => {
      window.location.reload()
    }).catch(err => {
      window.alert(err)
    })
  }

  CustomAuth = (e) =>{
    e.preventDefault()
    if (this.state.IsCustomEnabled)
    {
      this.setState({ IsCustomEnabled: false })
    }
    else
    {
      this.setState({ IsCustomEnabled: true }) 
    }
  }

  
  AddModal = (e) =>{
    if (this.state.AddUser)
    {
      this.setState({ AddUser: false })
    }
    else
    {
      this.setState({ AddUser: true }) 
    }
  }

  GithubAuth = (e) =>{
    e.preventDefault()
    if (this.state.IsGithubEnabled)
    {
      this.setState({ IsGithubEnabled: false })
    }
    else
    {
      this.setState({ IsGithubEnabled: true }) 
    }
  }
  
  FacebookAuth = (e) =>{
    e.preventDefault()
    if (this.state.IsFacebookEnabled)
    {
      this.setState({ IsFacebookEnabled: false })
    }
    else
    {
      this.setState({ IsFacebookEnabled: true }) 
    }
  }
  
  GoogleAuth = (e) =>{
    e.preventDefault()
    if (this.state.IsGoogleEnabled)
    {
      this.setState({ IsGoogleEnabled: false })
    }
    else
    {
      this.setState({ IsGoogleEnabled: true }) 
    }
  }


  GetUsers = () => {
    const db = firebase.firestore()
    const self = this

    
    setTimeout(()=> {
    db.collection("users").doc(this.state.UID).collection('console-users').get().then(function(doc){
      doc.forEach(snapshot => {
        self.createUsers(snapshot)
      })
  })
},800)
  }

  GetId = () =>{
    setTimeout(()=> {
    this.setState({ TestUID: uuid() })
    },900)
  }

  SetStateFromAuth = () =>{
    //updates the auth flow based on if signed in
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setTimeout(() => {
          self.setState({ IsUser: true, userEmail: user.email, UID: user.uid })
        },800)
      } else {
        // No user is signed in.      
        setTimeout(() => {
          self.setState({ IsUser: false, LoggedOut: true })
        },800)
      }
    })
  }

  CreateCookie = () =>{
    if (Cookies.get("Authentication"))
    {

    }
    else
    {
  Cookies.set("Authentication", this.state.SessionID, { expires: 1, path: '/admin/Authentication/u/1/' })
    }
  }

  MakeGetSessionID = () =>{
    const db = firebase.firestore()
    const self = this

    db.collection("users").doc(firebase.auth().currentUser.uid).collection("console-database").doc("database").get().then(function(storage){
      if (storage.exists){
        self.setState({ SessionID: storage.data().Key + ".gmad.storage"})
      }
      else
      {
        db.collection("users").doc(firebase.auth().currentUser.uid).collection("console-database").doc("database").set({
          Key: uuidV3()
        }).then(res => {
          this.setState({ SessionID: res.Key + ".gmad.storage"})
        }).catch(error => {

        })
      }
    })
  }

    render() {
      this.SetStateFromAuth()
      if (this.state.loaded == false){        
        setTimeout(()=> {
         this.MakeGetSessionID()
               
        this.CreateCookie()
         setTimeout(()=> {
          localStorage.setItem("ID", this.state.SessionID)
         },900)
        this.GetUsers()
        },900)
         this.GetId()
        setTimeout(()=> {    
          this.setState({ loaded: true })
        },800)
      }
    return (
      <>
        <UserHeader user={this.state.userEmail} />
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
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                       <h5>Sesion ID: {this.state.SessionID}</h5>
                    </div>
                    </div>
                  </Row>
                  <div className="content-center p-t-7">
                      <Button color="primary pr-2">Edit or add a service</Button>
                      </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My users</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    </Form>
                    </CardBody>
                    <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Users</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">UID</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.itemArray.map((item, index) => {
         return <tr key={index}>{item}</tr>
       })}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <Modal isOpen={this.state.AddUser} close={this.AddModal.bind(this)}/>
                         <Button onClick={this.AddModal} color="success">Add a user</Button>
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
              </div> 
              </Row>
              </Card>
              <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Methods</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Provider</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">                          
                       <td>Google</td>
                       </Media>
                       </th>
                       <th>{this.state.IsGoogleEnabled ? ("Enabled") : ("Disabled")}</th>
                       <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                               Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={this.GoogleAuth}
                            >
                              {this.state.IsGoogleEnabled? ("Disable") : ("Enable")}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>                      
                      </tr>
                      <tr>
                      <th scope="row">
                        <Media className="align-items-center">                          
                       <td>Facebook</td>
                       </Media>
                       </th>
                       <th>{this.state.IsFacebookEnabled ? ("Enabled") : ("Disabled")}</th>
                       <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                               Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={this.FacebookAuth}
                            >
                              {this.state.IsFacebookEnabled? ("Disable") : ("Enable")}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>                      
                      </tr>
                      <tr>
                      <th scope="row">
                        <Media className="align-items-center">                          
                       <td>Github</td>
                       </Media>
                       </th>
                       <th>{this.state.IsGithubEnabled ? ("Enabled") : ("Disabled")}</th>
                       <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                               Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={this.GithubAuth}
                            >
                              {this.state.IsGithubEnabled? ("Disable") : ("Enable")}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>                      
                      </tr>
                      <tr>
                      <th scope="row">
                        <Media className="align-items-center">                          
                       <td>Custom</td>
                       </Media>
                       </th>
                       <th>{this.state.IsCustomEnabled ? ("Enabled") : ("Disabled")}</th>
                       <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                               Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={this.CustomAuth}
                            >
                              {this.state.IsCustomEnabled? ("Disable") : ("Enable")}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>                      
                      </tr>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                  </CardFooter>
                  </Card>
                  </div>
                  </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  createUsers(doc){
    const self = this
    const { match: {params} } = this.props;
    const item = self.state.itemArray;
    let id = doc.id
    
    item.push(    
      <>
                      <th scope="row">
                        <Media className="align-items-center">                          
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {doc.data().username}
                            </span>
                          </Media>
                        </Media>
                      </th>
                       <td>{doc.data().UID}</td>
                       <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={()=>this.deleteUser(id)}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Disable
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Reset password
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      </>
    )
    
    this.setState({itemArray: item})
}

}

export default Profile;
