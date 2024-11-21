import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleSignOut = async (req, res) => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-1">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-2">
        <Link to="/">
          <span className="flex item-center align-middle">
            <img src="logo2.gif" className="h-40 -mt-1" />
            {/* <h1 className="font-bold  text-orange-500 hover:text-black p-1 hover:bg-orange-500 rounded-lg cursor-pointer">
              Bookiew
            </h1> */}
          </span>
          {/* <span>AUTH-APP</span> */}
        </Link>
        <Link to="/search" className="text-orange-400 font-bold text-2xl">
          search
        </Link>
        <ul className="flex justify-between mr-10">
          {currentUser ? (
            <Link
              to="/"
              onClick={handleSignOut}
              className=" mr-10 mt-7 font-bold  text-orange-500 hover:text-black p-1 hover:bg-orange-500 rounded-lg cursor-pointer"
            >
              Sign out
            </Link>
          ) : (
            ''
          )}

          <Link to="/profile">
            {currentUser ? (
              <>
                <img
                  src={'/favicon.png'}
                  alt="profile"
                  className="h-20 rounded-full object-cover"
                />
              </>
            ) : (
              <li className="font-bold  text-orange-500 hover:text-black p-1 hover:bg-orange-500 rounded-lg cursor-pointer">
                SIGNIN
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
