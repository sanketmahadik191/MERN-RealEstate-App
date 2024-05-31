import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";

function Signup() {
  const [ formData , setFormData] = useState({});
  const [error ,setError] = useState(null);
  const [loading , setLoading]= useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
     setFormData({
       ...formData,[e.target.id]:e.target.value,
     })
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    setLoading(true);
  try{
    //send data to api 
    const res = await fetch('/api/auth/signup',
     {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
     }  
  );
  const data = await res.json();

  if(data.success == false){
     setError(data.message);
     setLoading(false);
     return;
  }
  setLoading(false);
  console.log(data);
  setError(null);
  navigate('/sign-in');
} 
catch(error){
  setLoading(false);
  setError(error.message);
}
  }
 
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="username..."
          className="border p-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          id="email"
          placeholder="email...."
          className="border p-3 rounded-lg"onChange={handleChange}
        ></input>
        <input
          type="text"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="password..."onChange={handleChange}
        ></input>
        <button disabled={loading} type="submit" className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:bg-slate-600 disabled:opacity-80">{loading ? 'Loading...':'Sign Up'}</button>
      </form>
       <div className="flex gap-3 mt-5">
         <p>Have an account ?</p>
         <Link to='/sign-in'>
            <span className="text-blue-400">Sign In</span>
         </Link>
       </div>
       {error && <p className="text-red-400 mt-5">{error}</p>}
    </div>
  );
}

export default Signup;
