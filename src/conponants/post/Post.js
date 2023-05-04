import React from "react";
import "./Post.scss";
import Avatar from "../avatar/Avatar";
import { AiFillHeart,AiOutlineHeart} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import{useNavigate} from "react-router"
import { showToast } from "../../redux/slices/appConfigSlice";
import {  TOAST_SUCCESS } from "../../App";
function Post({ post }) {
  const dispatch = useDispatch();

  const navigate=useNavigate()
  async function handlePostLiked() {
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:'💖'
    }));

    dispatch(  
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }
  return (
    <div className="Post">
      <div className="heading"onClick={()=>navigate(`/profile/${post.owner._id}`)}>
        <Avatar src={post?.owner?.avatar?.url} />
        <h2>{post?.owner?.name}</h2>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="Post" />
      </div>
      <div className="footer">
        <div className="likes" onClick={handlePostLiked}>
        {/* {post.isLiked ? <AiFillHeart style={{color:'red'}} className='icon'/>: <AiOutlineHeart className='icon' />} */}
        
        {post.isLiked ? <AiFillHeart style={{color:'red'}} className='icon'/> : <AiOutlineHeart className='icon' />}
          <h4>{`${post.likesCount} likes`}</h4>
        </div>
        
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;






