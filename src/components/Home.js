import React, { useEffect, useState } from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import AddEmployee from './AddEmployee'
import {columns} from './options'
import axios from 'axios'
import EmployeeItem from './EmployeeItem'
import {Modal, Button} from 'react-bootstrap'


function Home() {

    const [showFilterModal, setFilterModal] = useState(false)
    const [employees, setEmployees] = useState([])

    const AddEmployee = () => {
        window.location.replace('/add')
    }

    const options = {
        url: 'http://localhost:3000/employees',
        method: 'GET'
    }

    const showFilters = () => {
        setFilterModal(true)
    }

    useEffect(() => {
        axios.request(options).then((response) => {
            setEmployees(response.data)
        }).catch((error) => console.log(error))
    })

    return (
        <div className="main-container-home">
            <div className="ndd-container">
            <div className="title-container">
                <div className="leftTitle"><img src="images/list.png" /><span>EMPLOYEES LIST </span></div>
                <div className="search"><span><img id="searchIcon" src="images/search.png" /></span> <input style={{height:'35px', alignSelf:'center'}} type="text" class="form-control" placeholder="Search ..."/> </div>
            </div>
            <hr />
            <div className="actions-filters-container">
                <button className="btn btn-primary" onClick={AddEmployee}><img id="addAction" src="images/add.png"/>&nbsp;&nbsp; <span>Add employee</span></button>
                <span onClick={showFilters} style={{ justifyContent:'center',justifyItems:'center', alignSelf:'center'}}><img style={{height:'50px', marginTop:'5px', border:'0px solid #1D3467'}} id="dropIcon" src="images/filters.png"/></span>
            </div>
            <hr />
            <div className="employees-list-container">
                <EmployeeItem data={employees} />
            </div>
            {employees.length === 0 ? <span className="no-found-message"> No Employee found </span> : '' }
            </div>

            <Modal show={showFilterModal} onHide={() => setFilterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>Filters here</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFilterModal(false)}> Close</Button>
                    <Button variant="primary">Apply filters</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
