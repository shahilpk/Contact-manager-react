import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
function AddContact() {

    let navigate=useNavigate()

    let [state,setState] =useState({
       loading:false,
       contact:{
          name:'',
          photo:'',
          mobile:'',
          email:'',
          company:'',
          title:'',
          groupId:''
       },
       groups:[],
       errormessage:''
    })

    let updateInput=()=>{
         setState({
            ...state,
            contact:{
                ...state.contact,
                // eslint-disable-next-line no-restricted-globals
                [event.target.name]:event.target.value
            }
         })
    }

    const getGroup = async () => {
        try {
            setState({...state,loading:true})
            const  response  = await ContactService.getGroups()
            setState({
                ...state,
                loading:false,
                groups:response.data
    
            })
        } catch (err) {
            // setState({
            //     ...state,
            //     loading:false,
            //     contacts:errorMessage
            // })
        }
    }

    useEffect(()=>{
      getGroup()
    },[])

    let submitForm=async (e)=>{
    e.preventDefault()
      try{
        let response=await ContactService.createContact(state.contact)
        if (response) {
            navigate('/contacts/list',{replace:true})
            
        }
      }catch(err){
        state({...state,errormessage:errormessage})
        navigate('/contacts/add',{replace:false})

      }
    }

    let {loading,contact,groups,errormessage,group}=state
  return (
    <React.Fragment>
        <section className='add-contact p-3'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h4 text-success fw-bold">Create Contact</p>
                        <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto tempora temporibus voluptatem porro aut velit placeat et nesciunt maiores praesentium dolorem quibusdam provident, natus minima voluptatibus molestiae. Voluptatibus, fuga aperiam.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <input name='name' value={contact.name}  onChange={updateInput} 
                                type="text"  className='form-control' placeholder='Name' required={true}/>
                            </div>
                            <div className="mb-2">
                                <input
                                 name='photo' value={contact.photo}  onChange={updateInput} required 
                                type="text"  className='form-control' placeholder='Photo url'/>
                            </div>
                            <div className="mb-2">
                                <input
                                name='mobile' value={contact.mobile}  onChange={updateInput} required
                                type="number"  className='form-control' placeholder='Mobile'/>
                            </div>
                            <div className="mb-2">
                                <input 
                                name='email' value={contact.email}  onChange={updateInput} required
                                type="email"  className='form-control' placeholder='Email'/>
                            </div>
                            <div className="mb-2">
                                <input 
                                name='company' value={contact.company}  onChange={updateInput} required
                                type="text"  className='form-control' placeholder='Company Name'/>
                            </div>
                            <div className="mb-2">
                                <input
                                name='title' value={contact.title}  onChange={updateInput} required
                                type="text"  className='form-control' placeholder='Title'/>
                            </div>
                            <div className="mb-2">
                                <select name='groupId' value={contact.groupId}  onChange={updateInput} required className='form-control'>
                                    <option value="">select a Group</option>
                                     {
                                        groups.length > 0 &&
                                        groups.map(group=>{
                                            return(
                                                 
                                                 <option key={group.id}>{group.name}</option>
                                            )
                                        })
                                     }
                                </select>
                                </div>
                            <div className="mb-2">
                                <input type="submit"  className='btn btn-success' value='Create'/>
                                <Link to={'/contacts/list'} className='btn btn-dark ms-2'>cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </React.Fragment>
  )
}

export default AddContact
