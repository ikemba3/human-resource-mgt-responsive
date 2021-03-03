import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FixedNavbar from '../components/FixedNavbar';
import SearchBox from '../components/SearchBox'
import Header from '../components/Header';
import { getAllEmployeeLeaveApplication, getMyLeaveApplication, updateEmployeeLeaveApplicationId } from '../actions/leaveApplication'


const AllLeaveApplications = ({ history }) => {
//   const dispatch = useDispatch()

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   useEffect(() => {

//     if(!userInfo) {
//       history.push('/')
//     } 
//   }, [dispatch, history, userInfo])

const dispatch = useDispatch()

const userLogin = useSelector(state => state.userLogin)
const { userInfo } = userLogin

const getAllLeave = useSelector(state => state.getAllLeave)
const { loading, data, } = getAllLeave

const updateLeaveApp = useSelector(state => state.updateLeaveApp)
const {  error:errorUpdate, success:successUpdate } = updateLeaveApp




const [leaveStatus, setLeaveStatus] = useState('')



useEffect(() => {

  if(!userInfo) {
	  history.push('/')
  } else {
	dispatch(getAllEmployeeLeaveApplication())
	console.log(data)

}
}, [dispatch, history, data, successUpdate, userInfo])


const updateHandler = (e) => {
	e.preventDefault(e)
	dispatch(updateLeaveApp(
		leaveStatus,
	   ))
}


  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper all-leaves'>
				<Col md={2} className='d-none d-md-block'>
				<Col>
                </Col>
          <FixedNavbar />
        </Col>
		
        <Col className='col-xs-12 col-md-10'>
          <Header />
		  <Row>
			  <Col>
			  <h1 className='page-header'>Leave Applications</h1>
			  </Col>
			  <Col>
			  <SearchBox history={history} />
			  </Col>
		  </Row>
					
					<hr />
					<Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Date Applied</th>
						<th>Name - Agent.ID</th>
            <th>Leave Type</th>
            <th>Duration</th>
			
            <th>Reason</th>
            <th>Status</th>
						{/* <th>...</th> */}
			<th>Employee</th>
          </tr>
        </thead>
        <tbody>
		{data.map(user => (
                <tr key={user._id}>
					<td>{user.employee.email}</td>
                    <td>{user.leaveType}</td>
                    <td>{user.fromDate}</td>
                    <td>{user.toDate}</td>
                    <td>{user.reasonForLeave}</td>
                    <td>{user.leaveStatus}
					<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput' value={leaveStatus}>
					<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control></td>
					
						<td>
							<Button type="submit" onSubmit={updateHandler}>
								Post
							</Button>
						</td>
                </tr>
            ))}
    
         
			
	
        </tbody>
      </Table>
      	</Col>
      </Row>
    </>
  )
}

export default AllLeaveApplications;