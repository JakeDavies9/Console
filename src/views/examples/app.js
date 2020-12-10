import React from "react";
import './database.css'
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

import uuidV3 from 'uuid/dist/v4'
import uuid from 'uuid/dist/v5'
// core components

import UserHeader from "components/Headers/app";

class App extends React.Component {
  state = {
    loaded: false,
    itemArray: [],
    UID: "",
  }
  SetStateFromAuth = () =>{
    //updates the auth flow based on if signed in
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setTimeout(() => {
          self.setState({ IsUser: true, UID: user.uid })
        },800)
      } else {
        // No user is signed in.      
        setTimeout(() => {
          self.setState({ IsUser: false })
        },800)
      }
    })
  }

    render() {
      this.SetStateFromAuth()
      if (this.state.loaded == false){        
        setTimeout(()=> {
          setTimeout(()=> {
          },900)
        },900)
        setTimeout(()=> {
          this.setState({ loaded: true })
        },800)
      }
    return (
      <>
        <UserHeader />
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
                    </div>
                    </div>
                  </Row>
                  <div className="content-center p-t-7">
                      </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">This Project</h3>
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
                    </h6>
                    </Form>
                    </CardBody>
                    <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                 <h3 className="mb-0">App: {localStorage.getItem("Project")}</h3>
                </CardHeader>
              </Card>
              </div> 
              </Row>
              </Card>
              </Col>
              </Row>
              </Container>
      </>
    );
  }

}

export default App;
