import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../spinner/Spinner'

function ViewContact() {

  let {contactId}=useParams()

  let[state,setState]=useState({
    loading:false,
    contact:{},
    errorMessage:'',
    group:{}
  })

  const getContact = async () => {
    try {
      setState({...state,loading:true})
        let  response  = await ContactService.getContact(contactId)
        let groupResponse = await ContactService.getGroup(response.data)
        setState({
          ...state,
          loading:false,
          contact:response.data,
          group:groupResponse.data
        })
    } catch (err) {
      setState({
        ...state,
        loading:false,
        // eslint-disable-next-line no-undef
        contacts:errorMessage
      })
    }
}
  useEffect(()=>{
    getContact()
  },[contactId])

  let {loading,contact,errorMessage,group}=state
  
  return (
    <React.Fragment>

      <section className='view-contact-intro p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sequi recusandae labore consequatur fuga, exercitationem voluptates aut id distinctio perferendis molestias quibusdam illum dolores suscipit nemo error esse praesentium. Minima!</p>
            </div>
          </div>
        </div>

      </section>
      {
        loading ? <Spinner/>:<React.Fragment>
                {
                  Object.keys(contact).length > 0 && Object.keys(group).length>0 &&
                  <section className='view-contact mt-3'>
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <img src={contact.photo} alt="" className='contact-img' />
                      </div>
                      <div className="col-md-8">
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
                          <li className='list-group-item lidt-group-item-action'>
                            Company : <span className='fw-bold'>{contact.company}</span>
                          </li>
                          <li className='list-group-item lidt-group-item-action'>
                            Title : <span className='fw-bold'>{contact.title}</span>
                          </li>
                          <li className='list-group-item lidt-group-item-action'>
                            Group : <span className='fw-bold'>{group.name}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                        </div>
                      </div>
                    </div>
                  </div>
          
                </section>
                }
        </React.Fragment>
      }
     
    </React.Fragment>
  )
}

export default ViewContact