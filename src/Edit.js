import React, { Component } from 'react';
import {Button,Label, Input, ModalHeader, Modal, ModalBody, ModalFooter} from 'reactstrap';

class Edit extends Component{
    constructor(props){
        super(props);
        this.state={appear: false, name: this.props.name,c_desc:this.props.c_desc, details:this.props.details,department:this.props.department, list:[]
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
          appear: !this.state.appear
        });
      }
    
    updateName = (e) =>
     { this.setState({name: e.target.value}) 
    }
    updateDescription = (e) => 
    { this.setState({c_desc: e.target.value}) 
    }
    updateDetails = (e) => 
    { this.setState({details: e.target.value}) 
    }
    updateDepartment = (e) => 
    { this.setState({department: e.target.value}) 
    }
    updateCourse = (id)=>{
        fetch('/coursedata/'+ id, {
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({name: this.state.name, c_desc: this.state.c_desc, details:this.state.details, department: this.state.department})
      
        }
        
        )
    }
    
    renderList = (data) =>{
        return(
            <option>{data.department}</option>
        )
    }
    
      render(){
        return (
        <div>
          <Button onClick={this.toggle}>Edit</Button>
    
          <Modal
            isOpen={this.state.appear} toggle={this.toggle}
          >
            <ModalHeader  toggle={this.toggle} closeButton>Edit Course</ModalHeader>
            <ModalBody>
                <Label for="Name">Course Name</Label>
                <Input id="Name" type='text' placeholder= {this.props.name} onChange={this.updateName}></Input>
                <Label for="Description">Course Description</Label>
                <Input id="Description" type='text' placeholder={this.props.c_desc} onChange={this.updateDescription}></Input>
                <Label for="Details">Course Details</Label>
                <Input id="Details" type='text' placeholder={this.props.details} onChange={this.updateDetails}></Input>
                <Label for="Department">Department</Label>
                <Input type="select" name="department" id="Department" placeholder={this.props.department} onChange = {this.updateDepartment}>{this.state.list.map(this.renderList)}
                </Input>
            </ModalBody>
            <ModalFooter>
            <Button color = "primary" onClick= {this.updateCourse(this.props.id)} onClick={this.toggle} onClick = {this.props.refresh}>
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

    
    export default Edit;