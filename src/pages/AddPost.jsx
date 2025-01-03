import React from 'react'
import PagesContainer from "../components/containers/PagesContainer"
import PostForm from '../components/PostForm/PostForm'

function AddPost() {
  return (
    <div className='py-6'>
      <PagesContainer>
        <PostForm />
      </PagesContainer>
    </div>
  )
}

export default AddPost