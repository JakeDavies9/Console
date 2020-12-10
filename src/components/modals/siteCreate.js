
import React from "react";
import classnames from "classnames";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import config from "config/config"
import firebase, { auth } from "firebase"
import { Alert } from 'reactstrap';

// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: ""
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: ""
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: ""
  }
];

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoModal: false,
      miniModal: false,
      formModal: false,
      username: "",
      password: ""
    };
  }

  onSubmit = () =>{
const self = this
const db = firebase.firestore()

if (this.state.password.includes("/")){

    db.collection("users").doc(firebase.auth().currentUser.uid).collection("console-sites").add({
        Site_Name: this.state.username,
        Site_Path: this.state.password,
        Site_Publish: false,
        plugins_Enabled: true
    }).then(res => {
        this.props.close()
        window.location.reload()
    }).catch(err => {
        console.error("An error: " + err)
    })
}
else
{
    window.alert("The URL must be in valid format")
}
}

  Onchange = (e) =>{
      this.setState({
          [e.target.id]: e.target.value
      })
  }

  toggleModal = modalState => {
      this.props.close()
  };
  render() {
    return (
            <Modal
              modalClassName="modal-black"
              isOpen={this.props.isOpen}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-header justify-content-center">
                <h3>Create a site</h3>
                <div className="text-muted text-center ml-auto mr-auto">
                </div>
              </div>
              <div className="modal-body">
                <div className="btn-wrapper text-center">
                    </div>
                <div className="text-center text-muted mb-4 mt-3">
                  <small>Enter site info</small>
                </div>
                <Form role="form" onSubmit={this.onSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.emailFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Enter an site name"
                        id='username'
                        onChange={this.Onchange}
                        required
                        type="text"
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Enter an path/URL eg. /mysite/"
                        type="text"
                        id='password'
                        required
                        onChange={this.Onchange}
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                        Create the site
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>
    );
  }
}

export default Create;