import React, { useState } from 'react'
import './EmployeeItem.css'



function EmployeeItem(props) {

    

    const goUpdate = () => {
        window.location.replace('/update')
    }

    const deleteItem = (e) => {
        // here delete item
    }

    return (
        <div className="main-container">
            <ul className="list">
                <li id="list-columns" className="list-item"><span id="id">ID</span> <span id="fn">FIRST NAME</span> <span id="ln">LAST NAME</span> <span id="email">EMAIL</span> <span id="hire">HIRE DATE</span> <span id="comp"> COMPANY </span> <span id="role">ROLE</span> <span id="phone">PHONE</span>  <span id="salary"> SALARY </span> <span id="update"> UPDATE</span> <span id="delete"> DELETE</span></li>
                {
                    props.data.map(item => {
                        return <li className="list-item"> <span id="id">{item.id}</span> <span id="fn">{item.firstName}</span> <span id="ln">{item.lastName}</span> <span id="email">{item.email}</span> <span id="hire">{item.Hire}</span>  <span id="comp">{item.company}</span>  <span id="role">{item.role}</span>  <span id="phone">{item.phone}</span> <span id="salary">{item.salary}</span>  <span onClick={goUpdate} id="update"><img src="images/update.png"/></span> <span onClick={deleteItem} id="delete"><img src="images/delete.png" /></span> </li>
                    })
                }
            </ul>
        </div>
    )
}

export default EmployeeItem
