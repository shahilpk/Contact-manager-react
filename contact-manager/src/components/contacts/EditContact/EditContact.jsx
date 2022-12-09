import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../spinner/Spinner'

function EditContact() {

    let { contactId } = useParams()
    let navigate = useNavigate()

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errormessage: ''
    })

    const editContact = async () => {
        try {
            setState({ ...state, loading: true })
            const response = await ContactService.getContact(contactId)
            let groupResponse = await ContactService.getGroups()
            setState({
                ...state,
                loading: false,
                contact: response.data,
                groups: groupResponse.data

            })
        } catch (err) {
            setState({
                ...state,
                loading: false,
                // eslint-disable-next-line no-undef
                errormessage: errorMessage
            })
        }
    }

    useEffect(() => {
        editContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactId])

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                // eslint-disable-next-line no-restricted-globals
                [event.target.name]: event.target.value
            }
        })
    }

    let submitForm = async (event) => {
        event.preventDefault()
        try {
            let response = await ContactService.updateContact(state.contact, contactId)
            if (response) {
                navigate('/contacts/list', { replace: true })

            }
        } catch (err) {
            state({ ...state, errormessage: errormessage })
            navigate(`/contacts/edit/${contactId}`, { replace: false })

        }
    }

    let { loading, contact, groups, errormessage } = state

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> : <React.Fragment>

<section className='add-contact p-3'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-primary fw-bold">Edit Contact</p>
                            <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto tempora temporibus voluptatem porro aut velit placeat et nesciunt maiores praesentium dolorem quibusdam provident, natus minima voluptatibus molestiae. Voluptatibus, fuga aperiam.</p>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <form action="" onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input type="text" name='name' onChange={updateInput} value={contact.name} required className='form-control' placeholder='Name' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name='photo' onChange={updateInput} value={contact.photo} required className='form-control' placeholder='Photo url' />
                                </div>
                                <div className="mb-2">
                                    <input type="number" name='mobile' onChange={updateInput} value={contact.mobile} required className='form-control' placeholder='Mobile' />
                                </div>
                                <div className="mb-2">
                                    <input type="email" name='email' onChange={updateInput} value={contact.email} required className='form-control' placeholder='Email' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name='company' onChange={updateInput} value={contact.company} required className='form-control' placeholder='Company Name' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name='title' onChange={updateInput} value={contact.title} required className='form-control' placeholder='Title' />
                                </div>
                                <div className="mb-2">
                                    <select className='form-control' name='groupId' onChange={updateInput} value={contact.groupId} required>
                                        <option value="">select a Group</option>
                                        {
                                            groups.length > 0 &&
                                            groups.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className='btn btn-primary' value='Update' />
                                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={contact.photo} alt="" className='contact-img' />
                        </div>
                    </div>
                </div>
            </section>
                </React.Fragment>
            }
            
        </React.Fragment>
    )
}

export default EditContact
