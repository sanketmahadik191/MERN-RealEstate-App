import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js";
// eslint-disable-next-line react-hooks/rules-of-hooks


function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const haddleSubmit =async(e)=>{
    e.preventDefault();
    
    const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method:'POST',
        headers:{
          'Content-Type':'applocation/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(data.sucess ===false){
        dispatch(updateUserFailure(data.message));
      }
        dispatch(updateUserSuccess(data));
    try{
      dispatch(updateUserStart());
    }catch(err){
       dispatch(updateUserFailure(err.message));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={haddleSubmit} className="flex flex-col gap-4">
        <h1>{currentUser.avatar}</h1>
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        ></img>
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover;opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 font-semibold cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 font-semibold cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
