import React from 'react'
import userImg from '../../assect/user.png';
import "./Avatar.scss"
function Avatar({src}) {
  return (
    <div>
        <div className="Avatar">
          
            <img src={src ? src : userImg} alt="User Image" />
        </div>
    </div>
  )
}

export default Avatar