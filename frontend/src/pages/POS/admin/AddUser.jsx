import React from 'react'
import LinkButton from '../../../components/pos/ui/LinkButton'
import UserForm from '../../../components/pos/UserForm'

function AddUser() {
  return (
    <div>
        <LinkButton link={'/pos/users'}>Back</LinkButton>
        <h1 className="text-xl font-bold my-2">Add New Product</h1>
        <UserForm />
    </div>
  )
}

export default AddUser