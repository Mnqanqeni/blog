import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import PagesContainer from "../components/containers/PagesContainer"
import PostCard from "../components/PostCard"


function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  //TODO: add case for array length 0
  return (
    <div className='w-full py-8'>
      <PagesContainer>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </PagesContainer>
    </div>
  )
}

export default AllPosts