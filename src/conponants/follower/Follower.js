import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
function Follower({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isfollowing, setIsFollowing] = useState("");
  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);
  function handleUserfollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: user._id,
      })
    );
  }
  return (
    <div className="follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>

      <h5
        onClick={handleUserfollow}
        className={isfollowing ? "hover-link follow-link" : "btn-primary"}
      >
        {isfollowing ? "unfollow" : "follow"}
      </h5>
    </div>
  );
}

export default Follower;
