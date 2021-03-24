import React, { Component } from 'react';
import {Table} from 'reactstrap';
import './CourseList.css';
import Edit from './Edit'
import Add from './Add';

class CourseList extends Component{
    constructor(props){
        super(props);
        this.state={data: []}
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
    }

    fetchData = () => {
        //In package.json add "proxy": "http://localhost:5000" 
        //This will allow redirect to REST api in Flask w/o CORS errors
         fetch('/coursedata')
         .then(
             response => response.json() 
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {
                      this.updateData(jsonOutput)
                    }
              )
      }
    componentDidMount(){
        this.fetchData();
    }

    refreshPage = () =>{
        window.location.reload();
      }

    renderCousre = (data) =>{
        return(
        <tr key={data.id}>
          <td><Edit id={data.id} name = {data.name} c_desc = {data.c_desc} details = {data.details} department = {data.department} refresh = {this.refreshPage}/></td>
          <td>{data.name}</td>
          <td>{data.c_desc}</td>
          <td>{data.details}</td>
          <td>{data.department}</td>
          <td>{data.college}</td>
        </tr>)
        
      };
    render(){
        if ( this.state.data == null )
        return (<div>No data</div>)
        else
        {
        return (
            <div className='m-4'>
                <header className="CourseList-header" >COURSE LIST</header>
                <Table striped condensed hover>
          <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th> 
            <th>Details</th>
            <th>Department</th>
            <th>College</th>
           
          </tr>
          </thead>
          <tbody>{this.state.data.map(this.renderCousre)}</tbody>
          </Table>
          <Add onClick = {this.refreshPage}/>
            </div>
        )
        }
    }
}


export default CourseList;