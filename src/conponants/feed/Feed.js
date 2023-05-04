import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch,useSelector } from 'react-redux'
import { getfeedData } from '../../redux/slices/feedSlice'
function Feed() {

const dispatch=useDispatch();
const feedData=useSelector(state=>state.feedDataReducer.feedData)

 useEffect(()=>{
  dispatch(getfeedData());
 },[dispatch])
  return (
    <div className='Feed'>
      <div className="container">
         <div className="left-part">
            {feedData?.posts?.map(post=><Post key={post._id} post={post}/>)}
         </div>
         <div className="right-part">
          <div className="following">
            <h3 className="title">Your Following</h3>
           {feedData?.followings?.map(user => <Follower key={user._id}user={user}/>)}
          </div>
          <div className="suggestion">
          <h3 className="title">Your suggestion</h3>
          {feedData?.suggestions?.map(user => <Follower key={user._id}user={user}/>)}
          </div>
         </div>
      </div>
    </div>
  )
}

export default Feed