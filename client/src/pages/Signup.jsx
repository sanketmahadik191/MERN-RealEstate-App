import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="username..."
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="email"
          id="email"
          placeholder="email...."
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="text"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="password..."
        ></input>
        <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:bg-slate-600 disabled:opacity-80">Sign Up</button>
      </form>
       <div className="flex gap-3 mt-5">
         <p>Have an account ?</p>
         <Link to='/sign-in'>
            <span className="text-blue-400">Sign In</span>
         </Link>
       </div>
    </div>
  );
}

export default Signup;
