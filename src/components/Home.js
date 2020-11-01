import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import EmployeeItem from './EmployeeItem'
import {Modal, Button} from 'react-bootstrap'


function Home() {

    const [showFilterModal, setFilterModal] = useState(false)
    const [employees, setEmployees] = useState([])
    const [shownEmployees, setShownEmployees] = useState([])
    const [nbrItems, setNbrItems] = useState(10)
    const [nbrPages, setNbrPages] = useState(0)
    const [pages, setPages] = useState([])

    const AddEmployee = () => {
        window.location.replace('/add')
    }

    const options = {
        url: 'http://localhost:8000/getEmployeesList',
        method: 'GET'
    }

    const showFilters = () => {
        setFilterModal(true)
    }

    const changePage = () => {

    }


    var pages_temp=[]

    useEffect(() => {
        axios.request(options).then((response) => {
            setEmployees(response.data)
            setShownEmployees(response.data.slice(0, nbrItems))
            response.data.length%nbrItems > 0 ? setNbrPages((response.data.length/nbrItems)+1) : setNbrPages(response.data.length/nbrItems) 
        }).catch((error) => console.log(error))
        console.log(nbrPages)
        for(let i=0;i<nbrPages;i++){
            pages_temp.push(i)
        }
        console.log(pages_temp.length)
        setPages(pages_temp)
    },[])
 

    return (
        <div className="main-container-home">
            <div className="ndd-container">
            <div className="title-container">
                <div className="leftTitle"><img src="images/list.png" /><span> EMPLOYEES LIST </span></div>
                <div className="search"><span><img id="searchIcon" src="images/search.png" /></span> <input style={{height:'35px', alignSelf:'center'}} type="text" class="form-control" placeholder="Search ..."/> </div>
            </div>
            <hr />
            <div className="actions-filters-container">
                <button className="btn btn-primary" onClick={AddEmployee}><img id="addAction" src="images/add.png"/>&nbsp;&nbsp; <span>Add employee</span></button>
                <span onClick={showFilters} style={{ justifyContent:'center', justifyItems:'center', alignSelf:'center'}}><img style={{height:'50px', marginTop:'5px', border:'0px solid #1D3467'}} id="dropIcon" src="images/filters.png"/></span>
            </div>
            <hr />
            <div className="employees-list-container">
                <EmployeeItem data={shownEmployees} />
                {shownEmployees.length > 0 ?
                <div className="pagination">
                    <img className="paginationImage" src="images/double-left-chevron.jpg" /> 
                    <img  className="paginationImage" src="images/left-chevron.png"/>
                {
                    pages.map(item => { return <span className="page-number" onClick={changePage} key={item}> {item}&nbsp;&nbsp;  </span> })
                }
                    <img className="paginationImage" src="images/right-chevron.png" /> 
                    <img className="paginationImage" src="images/double-right-chevron.png" />
                </div>
                : '' }
            </div>
                 {shownEmployees.length === 0 ? <span className="no-found-message"> No Employee found </span> : '' }
            </div>

            <Modal show={showFilterModal} onHide={() => setFilterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>   Filter settings    </Modal.Title>
                </Modal.Header>
                <Modal.Body>    Filters here    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFilterModal(false)}>Close</Button>
                    <Button variant="primary">Apply filters</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
