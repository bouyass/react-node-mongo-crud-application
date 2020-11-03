import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import {companyOptions, roleOptions} from './options'
import './UpdateEmployee.css'
import axios from 'axios'

export default function AddEmployee(props) {

    const [imageValue, setImageValue] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [salary, setSalary] = useState('')
    const [hire, setHire] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errors, setErrors] = useState([])

    const firstNameChange = (e) => {
        setFirstName(e.target.value)
    }   

    const lastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }

    const phoneChange = (e) => {
        setPhone(e.target.value)
    }

    const salaryChange = (e) => {
        setSalary(e.target.value)
    }

    const hireChange = (e) => {
        setHire(e)
    }

    const companyChange = (e) => {
        setCompany(e.target.value)
    }

    const roleChange = (e) => {
        setRole(e.target.value)
    }

    const updateOptions = {
        url: 'http://localhost:8000/updateEmployee/',
        method: 'put'
    }

    const getEmployeeOptions = {
        url: 'http://localhost:8000/getEmployee/',
        method: 'GET'
    }

    const handleChange = (e) => {
        setImageValue(e.target.value)
    }

    const handleUpdateClick = () => {

        updateOptions.url = updateOptions.url+employeeId

        updateOptions.data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            salary: salary,
            hire: hire,
            phone: phone,
            company: company,
            role: role,
            image:'https://www.w3schools.com/howto/img_avatar.png'
        }


        axios.request(updateOptions).then(response => {
            if(typeof response.data === 'string'){
                setErrors('')
                setSuccessMessage(response.data)
            }else{
                setErrors([])
                setSuccessMessage('')
                setErrors(response.data)
            }
            
        }).catch((error) => alert(error))
    }

    const back = () => {
        window.location.replace('/')
    }

    useEffect(() => {
        const companies = document.getElementById('selectCompany')
        const roles = document.getElementById('selectRoles')
 
        companyOptions.map(item => {
            var child = document.createElement("option")
            child.setAttribute('value', item.value)
            var text = document.createTextNode(item.text)
            child.appendChild(text)
            companies.appendChild(child)
        })

        roleOptions.map(item => {
            var child = document.createElement("option")
            child.setAttribute('value', item.value)
            var text = document.createTextNode(item.text)
            child.appendChild(text)
            roles.appendChild(child)
        })


        document.getElementById('image').style.visibility = 'hidden'
        if(imageValue.length > 0){
            document.getElementById('pathShow').innerText = imageValue
        }
        const url = new URL(window.location.href)
        const id = url.searchParams.get('id')
       
        getEmployeeOptions.url = getEmployeeOptions.url+id

        axios.request(getEmployeeOptions)
                .then((response) => {
                    setEmployeeId(response.data._id)
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setEmail(response.data.email)
                    setPhone(response.data.phone)
                    setSalary(response.data.salary)
                    setRole(response.data.role)
                    setCompany(response.data.company)
                    setHire(response.data.Hire)
                })
                .catch((error) => console.log(error))

    },[imageValue])

    return (
        <div className="main-container">
            <div className="nd-container">
            <div className="title-container"><img src="images/update.png" /><h3>UPDATE EMPLOYEE</h3></div>
            <hr />
            <div className="form-container">
                <div className="name"><input  value={firstName} onChange={firstNameChange} className="form-control" placeholder="first name" /> <input value={lastName} onChange={lastNameChange} className="form-control" placeholder="last name" /></div>
                <div className="email"> <input value={email} onChange={emailChange} className="form-control" placeholder="email" /></div>
                <div className="work-details"> 
                    <DatePicker  value={hire} onChange={hireChange}  style={{border:'1px solid green'}} />
                    <select value={company} onChange={companyChange} id="selectCompany" className="form-control"  placeholderText="Company name" >
                        <option value="" disabled selected>Select the company</option>
                    </select>
                    <select value={role} onChange={roleChange} id="selectRoles" className="form-control"  placeholder='Select the role'>
                        <option value="" disabled selected>Select the employee's role</option>    
                    </select> 
                 </div>
                <div className="details-bis"><input  value={phone} onChange={phoneChange} className="form-control" placeholder="Phone number" /> <input value={salary} onChange={salaryChange} className="form-control" placeholder="Salary" /></div>
                <div className="image">  
                        <div id="imageSpan"><span> Select image </span> </div> 
                        <label id="imageLabel" for="image"> <img id="avatarIcon" src="images/avatarIcon.png" /> <span>  Browse</span> </label> 
                        <input value={imageValue} onChange={handleChange} type="file"  accept="image/*" id="image" style={{backgroundColor:'#fff'}}/> 
                        <span id="pathShow"> </span>
                </div>
            </div>
            <div className="button-container">
                <button  onClick={back} className="btn btn-primary"> Cancel </button> <button onClick={handleUpdateClick}  className="btn btn-primary"> Update Employee </button>
            </div>
            {successMessage.length > 0 ? <div id="successMessage"> Employee data have been successfully updated </div> : '' }
            {errors.length > 0 ? <div className="errors"> <ul> {errors.map(item => {return <li><span> * {item} must be fullfilled.</span></li> }) } </ul></div> : ''} 
            </div>
        </div>
    )
}
