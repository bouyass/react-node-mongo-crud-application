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

    const changePage = (e) => {
        setShownEmployees(employees.slice((e.target.id*nbrItems),(e.target.id*nbrItems) + nbrItems))
    }


    var pages_temp=[]

    const getData = () => {
        axios.request(options).then((response) => {
            console.log(response.data.length)
            setEmployees(response.data)
            setShownEmployees(response.data.slice(0, nbrItems))
            if(response.data.length > nbrItems){
                if(response.data.length%nbrItems > 0){
                    setNbrPages((response.data.length/nbrItems)+1)
                    for(let i = 0; i < ((response.data.length/nbrItems));i++){
                        pages_temp.push(i)
                    }
                    setPages(pages_temp)
                }else{
    
                    setNbrPages(response.data.length/nbrItems) 
                    for(let i = 0; i < (response.data.length/nbrItems);i++){
                        pages_temp.push(i)
                        
                    }
                   
                    setPages(pages_temp)
                }    
            }else {
                setNbrPages(0)
                setPages([0])
            }
                
             
        }).catch((error) => console.log(error))
    }

    


    useEffect(() => {

        getData()

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
                {shownEmployees.length > 0 && pages.length > 1 ?
                <div className="pagination">
                    <img className="paginationImage" src="images/double-left-chevron.jpg" /> 
                    <img  className="paginationImage1" src="images/left-chevron.png"/>
                {
                    pages.map(item => { return <span className="page-number" id={item} onClick={changePage} key={item}> {item}&nbsp;&nbsp;  </span> })
                }
                    <img className="paginationImage1" src="images/right-chevron.png" /> 
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
