import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import {companyOptions, roleOptions} from './options'
import './UpdateEmployee.css'

export default function AddEmployee() {

    const [imageValue, setImageValue] = useState('')
    const [employeeId, setEmployeeId] = useState('')

    const handleChange = (e) => {
        setImageValue(e.target.value)
    }

    const back = () => {
        window.location.replace('/')
    }

    useEffect(() => {
        const companies = document.getElementById('selectCompany')
        const roles = document.getElementById('selectRoles')
        const url = new URL(window.location.href)
        setEmployeeId( url.searchParams.get('id') )
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

    },[imageValue])

    return (
        <div className="main-container">
            <div className="nd-container">
            <div className="title-container"><img src="images/update.png" /><h3>UPDATE EMPLOYEE</h3></div>
            <hr />
            <div className="form-container">
                <div className="name"><input className="form-control" placeholder="first name" /> <input className="form-control" placeholder="last name" /></div>
                <div className="email"> <input className="form-control" placeholder="email" /></div>
                <div className="work-details"> 
                    <DatePicker style={{border:'1px solid green'}} />
                    <select id="selectCompany" className="form-control"  placeholderText="Company name" >
                        <option value="" disabled selected>Select the company</option>
                    </select>
                    <select id="selectRoles" className="form-control"  placeholder='Select the role'>
                        <option value="" disabled selected>Select the employee's role</option>    
                    </select> 
                 </div>
                <div className="details-bis"><input className="form-control" placeholder="Phone number" /> <input className="form-control" placeholder="Salary" /></div>
                <div className="image">  
                        <div id="imageSpan"><span> Select image </span> </div> 
                        <label id="imageLabel" for="image"> <img id="avatarIcon" src="images/avatarIcon.png" /> <span>  Browse</span> </label> 
                        <input value={imageValue} onChange={handleChange} type="file"  accept="image/*" id="image" style={{backgroundColor:'#fff'}}/> 
                        <span id="pathShow"> </span>
                </div>
            </div>
            <div className="button-container">
                <button  onClick={back} className="btn btn-primary"> Cancel </button> <button className="btn btn-primary"> Update Employee </button>
            </div>
            </div>
        </div>
    )
}
