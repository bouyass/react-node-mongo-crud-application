import React, { useState } from 'react'
import './EmployeeItem.css'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'


function EmployeeItem(props) {

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)
    const [employeeToDelete, setEmployeeToDelete] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [salary, setSalary] = useState('')
    const [hire, setHire] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')



    const deleteConfirmation = (e) => {
        console.log(e.target.id)
        setEmployeeToDelete(e.target.id)
        setShowDeleteConfirmationModal(true)
    }

    
    const deleteOptions = {
        url: 'http://localhost:8000/deleteOne/',
        method: 'DELETE'
    }

    const updateOptions = {
        url: 'http://localhost:8000/updateOne/',
        method: 'put'
    }

    const goUpdate = (e) => {
        window.location.replace('/update?id='+e.target.id)
    }

    const deleteItem = () => {
        console.log(employeeToDelete)
        deleteOptions.url = deleteOptions.url+employeeToDelete
        axios.request(deleteOptions)
            .then(() => {
                
                alert('Employee deleted')
            })
            .catch((error) => {console.log(error)})
        setEmployeeToDelete('')
        setShowDeleteConfirmationModal(false)
        window.location.replace('/')
    }

    return (
        <div className="main-container">
            <ul className="list">
                <li id="list-columns" className="list-item"><span id="id">Avatar</span> <span id="fn">FIRST NAME</span> <span id="ln">LAST NAME</span> <span id="email">EMAIL</span> <span id="hire">HIRE DATE</span> <span id="comp"> COMPANY </span> <span id="role">ROLE</span> <span id="phone">PHONE</span>  <span id="salary"> SALARY </span> <span id="update"> UPDATE</span> <span id="delete"> DELETE</span></li>
                {
                    props.data.map(item => {
                        return <li className="list-item" > <span id="id"><img id="colAvatar" src={item.image} /> </span> <span id="fn">{item.firstName}</span> <span id="ln">{item.lastName}</span> <span id="email">{item.email}</span> <span id="hire">{item.Hire}</span>  <span id="comp">{item.company}</span>  <span id="role">{item.role}</span>  <span id="phone">{item.phone}</span> <span id="salary">{item.salary}</span>  <span  id="update"><img id={item._id} onClick={goUpdate} src="images/update.png"/></span> <span  id="delete"><img id={item._id} onClick={deleteConfirmation} src="images/delete.png" /></span> </li>
                    })
                }
            </ul>
            <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>   Confirmation dialog   </Modal.Title>
                </Modal.Header>
                <Modal.Body>    Are you sure you want to delete this employee ?    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Close</Button>
                    <Button onClick={deleteItem} variant="primary">Confirm & delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeeItem
