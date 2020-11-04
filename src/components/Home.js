import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import EmployeeItem from './EmployeeItem'
import {Modal, Button} from 'react-bootstrap'


function Home() {

    var pages_temp=[]


    const [showFilterModal, setFilterModal] = useState(false)
    const [employees, setEmployees] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [filteredEmployeesHistoric, setFilteredEmployeesHistoric] = useState([])
    const [shownEmployees, setShownEmployees] = useState([])
    const [nbrItems, setNbrItems] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])
    const [minSalaryFilter, setMinSalaryFilter] = useState(0)
    const [maxSalaryFilter, setMaxSalaryFilter] = useState(0)
    const [filter, setFilter] = useState(false)


    const minSalaryFilterChange = (e) => {
        setMinSalaryFilter(e.target.value)
    }

    const maxSalaryFilterChange = (e) => {
        setMaxSalaryFilter(e.target.value)
    }

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
        setShownEmployees(filteredEmployees.slice((e.target.id*nbrItems),(e.target.id*nbrItems) + nbrItems))
        setCurrentPage(e.target.id)
    }

    const firstPage = () => {
        setShownEmployees(filteredEmployees.slice(0, nbrItems))
        setCurrentPage(0)
    }

    const lastPage = () => {
        setShownEmployees(filteredEmployees.slice(((pages[pages.length-1])*nbrItems),((pages[pages.length-1])*nbrItems) + nbrItems))
        setCurrentPage(pages[pages.length-1])
    }

    const nextPage = () => {
        if(currentPage === pages[pages.length-1]){

        }else{
            lastPage()
        }
        
    }


    const previousPage = () => {
        if(currentPage === 0){
            firstPage()
        }else{
            setShownEmployees(filteredEmployees.slice(((currentPage-1)*nbrItems),((currentPage-1)*nbrItems) + nbrItems))
            setCurrentPage(currentPage-1)
        }
    }

    const inputMinSalaryFilter = (e) => {
        setMinSalaryFilter(e.target.value)
    }

    const inputMaxSalaryFilter = (e) => {
        setMaxSalaryFilter(e.target.value)
    }

    
    const searchWordChange = (e) => {
        setSearchWord(e.target.value)
        setFilteredEmployees([])
        let employeeTempArray = []
        employees.map(employee => {
            var valuesTempArray = Object.values(employee).slice(1,11)
            for(var i = 0; i < valuesTempArray.length; i++){
                if(valuesTempArray[i].toString().includes(e.target.value)){
                    employeeTempArray.push(employee)
                    break;
                }
            }
        })
        setFilteredEmployees(employeeTempArray)
        setShownEmployees(employeeTempArray.slice(0,nbrItems))

        if(employeeTempArray.length > nbrItems){
            if(employeeTempArray.length%nbrItems > 0){
                for(let i = 0; i < ((employeeTempArray.length/nbrItems));i++){
                    pages_temp.push(i)
                }
                setPages(pages_temp)
            }else{
                for(let i = 0; i < (employeeTempArray.length/nbrItems);i++){
                    pages_temp.push(i)
                    
                }
               
                setPages(pages_temp)
            }
        }else {
                setCurrentPage(0)
                setPages([0])
        }
    }

    const applyFilters = (e) => {
        setFilter(true)
        setFilteredEmployeesHistoric(filteredEmployees)
        setFilteredEmployees([])
        var employeeTempArray = []
        employees.map(employee => {
            if(Number(employee.salary) >= Number(minSalaryFilter) && Number(employee.salary) <= Number(maxSalaryFilter)){
                employeeTempArray.push(employee)
            }
        })
        console.log(employeeTempArray)
        setFilteredEmployees(employeeTempArray)
        setShownEmployees(employeeTempArray.slice(0,nbrItems))

        if(employeeTempArray.length > nbrItems){
            if(employeeTempArray.length%nbrItems > 0){
                for(let i = 0; i < ((employeeTempArray.length/nbrItems));i++){
                    pages_temp.push(i)
                }
                setPages(pages_temp)
            }else{
                for(let i = 0; i < (employeeTempArray.length/nbrItems);i++){
                    pages_temp.push(i)
                    
                }
               
                setPages(pages_temp)
            }
        }else {
                setCurrentPage(0)
                setPages([0])
        }
    }

    const desableFilters = (e) => {
        setFilteredEmployees(filteredEmployeesHistoric)
        setShownEmployees(filteredEmployeesHistoric.slice(0,nbrItems))

        if(filteredEmployeesHistoric.length > nbrItems){
            if(filteredEmployeesHistoric.length%nbrItems > 0){
                for(let i = 0; i < ((filteredEmployeesHistoric.length/nbrItems));i++){
                    pages_temp.push(i)
                }
                setPages(pages_temp)
            }else{
                for(let i = 0; i < (filteredEmployeesHistoric.length/nbrItems);i++){
                    pages_temp.push(i)
                    
                }
               
                setPages(pages_temp)
            }
        }else {
                setCurrentPage(0)
                setPages([0])
        }
        setFilteredEmployeesHistoric([])
    }

    

    const getData = () => {
        axios.request(options).then((response) => {
            setEmployees(response.data)
            setFilteredEmployees(response.data)
            setShownEmployees(response.data.slice(0, nbrItems))
            if(response.data.length > nbrItems){
                if(response.data.length%nbrItems > 0){
                    for(let i = 0; i < ((response.data.length/nbrItems));i++){
                        pages_temp.push(i)
                    }
                    setPages(pages_temp)
                }else{
                    for(let i = 0; i < (response.data.length/nbrItems);i++){
                        pages_temp.push(i)
                        
                    }
                   
                    setPages(pages_temp)
                }    
            }else {
                setCurrentPage(0)
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
                <div className="search"><span><img id="searchIcon" src="images/search.png" /></span> <input value={searchWord} onChange={searchWordChange} style={{height:'35px', alignSelf:'center'}} type="text" class="form-control" placeholder="Search ..."/> </div>
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
                    <img onClick={firstPage} className="paginationImage" src="images/double-left-chevron.jpg" /> 
                    <img onClick={previousPage} className="paginationImage1" src="images/left-chevron.png"/>
                {
                    pages.map(item => { return <b>  <span className="page-number" id={item} onClick={changePage} key={item}> &nbsp;{item}&nbsp;  </span></b> })
                }
                    <img onClick={nextPage} className="paginationImage1" src="images/right-chevron.png" /> 
                    <img onClick={lastPage} className="paginationImage" src="images/double-right-chevron.png" />
                </div>
                : '' }
            </div>
                 {shownEmployees.length === 0 ? <span className="no-found-message"> No Employee found </span> : '' }
            </div>

            <Modal show={showFilterModal} onHide={() => setFilterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>   Filter settings    </Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                    <div className="filter-container"> 
                    <h3>Employee salary</h3> 
                    
                    <div className="minSalaryFilter">
                    <label for="customRange1">Min salary</label>
                    <input type="range" min="0" max="200000" value={minSalaryFilter} step="5" onChange={minSalaryFilterChange} class="slider" id="myRange" />
                    <span> <input onChange={inputMinSalaryFilter} id="minSalaryInput" type="number" value={minSalaryFilter} /> &nbsp; <b>$</b></span>
                    </div>
                    <div className="maxSalaryFilter">
                    <label for="customRange1">Max salary</label>
                    <input type="range" min="0" max="200000" value={maxSalaryFilter} step="5" onChange={maxSalaryFilterChange} class="slider" id="myRange" />
                    <span> <input onChange={inputMaxSalaryFilter} id="maxSalaryInput" type="number" value={maxSalaryFilter} /> &nbsp; <b>$</b></span>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFilterModal(false)}>Close</Button>
                    <Button onClick={applyFilters} variant="primary">Apply filters</Button>
                    <Button onClick={desableFilters} variant="primary">Desable filters</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
