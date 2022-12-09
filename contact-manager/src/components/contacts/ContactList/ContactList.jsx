import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../spinner/Spinner'

let ContactList=()=> {

    let [query,setQuery]=useState({
        text:''
    })

 let [state,setState]=useState({
    loading:false,
    contacts:[],
    filteredContacts:[],
    errorMessage:''
 })
 
 const getTasks = async () => {
    try {
        setState({...state,loading:true})
        const  response  = await ContactService.getAllContacts()
        setState({
            ...state,
            loading:false,
            contacts:response.data,
            filteredContacts:response.data

        })
    } catch (err) {
        setState({
            ...state,
            loading:false,
            contacts:errorMessage
        })
    }
}

  useEffect(() => {
    getTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// delete contact
  let clickDelete=async(contactId)=>{
   try {
    let response=await ContactService.deleteContact(contactId)
    if (response) {
        setState({...state,loading:true})
        const  response  = await ContactService.getAllContacts()
        setState({
            ...state,
            loading:false,
            contacts:response.data,
            filteredContacts:response.data

        })
    }
   } catch (error) {
    setState({
        ...state,
        loading:false,
        contacts:errorMessage
    })
   }
  }
// search contats
  let searchContacts=(event)=>{
   setQuery({...query,text:event.target.value})
   let theContacts=state.contacts.filter(contact=>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
   })
   setState({
    ...state,
    filteredContacts:theContacts
   })
}
 
  let {loading,contacts,errorMessage,filteredContacts}=state

    return (
        <React.Fragment>
            <section className='contact-search p-3'>
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className='h3 fw-bold'>Contact Manager
                                    <Link to={'/contacts/add'} className={'btn btn-primary ms-2'}> <i className='fa fa-plus-circle me-2'></i> New</Link>
                                </p>
                                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero odit doloribus nihil consequatur facilis ipsam, similique in dolorum nemo ea eaque quae facere repellat mollitia quos, animi at dolor. Repudiandae!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className='row'>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input 
                                            name='text'
                                            value={query.text}
                                            onChange={searchContacts}
                                            type="text" className='form-control' placeholder='Search Names' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className='btn btn-outline-dark' value="search" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {
                loading ? <Spinner/>:<React.Fragment>
            <section className='contact-list'>
                <div className="container">
                    <div className="row">
                        {
                            filteredContacts.length>0 &&
                            filteredContacts.map(contact=>{
                                return(
                                    <div className="col-md-6" key={contact.id}>
                                    <div className="card my-2">
                                        <div className="card-body">
                                            <div className="row align-items-center d-flex justify-content-around ">
                                                <div className="col-md-4">
                                                    <img src={contact.photo}alt="" className='img-fluid ' />
                                                </div>
                                                <div className="col-md-7">
                                                    <ul className='list-group'>
                                                        <li className='list-group-item lidt-group-item-action'>
                                                            Name : <span className='fw-bold'>{contact.name}</span>
                                                        </li>
                                                        <li className='list-group-item lidt-group-item-action'>
                                                            Mobile : <span className='fw-bold'>{contact.mobile}</span>
                                                        </li>
                                                        <li className='list-group-item lidt-group-item-action'>
                                                            Email : <span className='fw-bold'>{contact.email}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-1 p-1 align-items-center">
                                                     <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                                        <i className='fa fa-eye'></i>
                                                     </Link>
                                                     <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                                        <i className='fa fa-pen'></i>
                                                     </Link>
                                                     <button className='btn btn-danger my-1' onClick={()=>clickDelete(contact.id)}>
                                                        <i className='fa fa-trash'></i>
                                                     </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </section>
                </React.Fragment>
            }
           
        </React.Fragment>
    )
}

export default ContactList
