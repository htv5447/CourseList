import React, { Component } from 'react';
import {Button,Label, Input, ModalHeader, Modal, ModalBody, ModalFooter} from 'reactstrap';

class Add extends Component{
    constructor(props){
        super(props);
        this.state={modal: false, name:"",c_desc:"", details:"",department:"", list:[]
    };
}

updateList = (apiResponse) => {
    this.setState({list: apiResponse})
}

fetchList = () => {
    //In package.json add "proxy": "http://localhost:5000" 
    //This will allow redirect to REST api in Flask w/o CORS errors
     fetch('/department')
     .then(
         response => response.json() 
         )//The promise response is returned, then we extract the json data
     .then (jsonOutput => //jsonOutput now has result of the data extraction
              {
                  this.updateList(jsonOutput)
                }
          )
  }

componentDidMount(){
    this.fetchList();    
}

toggle = () =>{
    this.setState({
      modal: !this.state.modal
    });}
    
updateName = (e) =>
  { this.setState({name: e.target.value}) //Update the text data in state
  }

updateDescription = (e) => 
  { this.setState({c_desc: e.target.value}) //Update the text data in state
  }

updateDetails = (e) => 
  { this.setState({details: e.target.value}) //Update the text data in state
  }

updateDepartment = (e) => 
  { this.setState({department: e.target.value}) //Update the text data in state
  }
    
addCourse = () =>{
        fetch('/coursedata/', {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({name: this.state.name, c_desc: this.state.c_desc, details:this.state.details, department: this.state.department})
      
        })
        .then(this.toggle)
        .then(this.props.onClick())
}
    
renderList = (data) =>{
  return(
    <option>{data.department}</option>
  )
}
    
      render(){
        return (
        <div>
          <Button color = "primary" onClick={this.toggle}>Add</Button>
    
          <Modal
            isOpen={this.state.modal} toggle={this.toggle}
          >
            <ModalHeader  toggle={this.toggle} closeButton>Edit Course</ModalHeader>
            <ModalBody>
                <Label for="Name">Course Name</Label>
                <Input id="Name" type='text' onChange={this.updateName}></Input>
                <Label for="Description">Course Description</Label>
                <Input id="Description" type='text' onChange={this.updateDescription}></Input>
                <Label for="Details">Course Details</Label>
                <Input id="Details" type='text' onChange={this.updateDetails}></Input>
                <Label for="Select">Department</Label>
                <Input type="select" name="select" id="Select" onChange = {this.updateDepartment}>{this.state.list.map(this.renderList)}
                </Input>
            </ModalBody>
            <ModalFooter>
            <Button color = "primary" onClick={this.addCourse}>
                Ok
              </Button>
              <Button color = "secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        );
      }
    }

    
export default Add;