import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // {email: 'vknwl0777@gmail.com', password: 'vknwl0777@gmail.com'}
  // email: 'vknwl0777@gmail.com';
  // password: 'vknwl0777@gmail.com';
  // the email id get from the form input that id store and send it to the backend
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError(false);
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      // setLoading(false);
      if (data.success === false) {
        // setError(true);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // the data of the user set in the currentUser signInsuccess action.payload contains that user data
      // now whenever i want that user data i just simply useSelector and get the data
      navigate('/');
    } catch (error) {
      console.log(error);
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-orange-400 text-3xl text-center font-semibold my-7">
        SIGNIN
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="font-bold text-orange-500 hover:text-black p-4 hover:bg-orange-400 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="font-bold text-orange-500 hover:text-black p-4 hover:bg-orange-400 rounded-lg "
        />
        <button
          disabled={loading}
          className="font-bold text-orange-500 hover:text-black p-4 hover:bg-orange-400 rounded-lg  hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'LOADING...' : 'SIGNIN'}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="bold">Don&apos;t have an account ?</p>
        <Link to="/signup">
          <span className="bold underline text-orange-400">SIGNUP</span>
        </Link>
      </div>
      <p className="text-red-500 mt-5">{error ? error.message : ''}</p>
    </div>
  );
};

export default SignIn;
