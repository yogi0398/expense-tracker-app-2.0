import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../Utils/uploadImage';
import axiosInstance from '../../Utils/axiosInstance';

const SIgnUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //handle signup for submit 
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name.");
      return;
    }

    if(!validateEmail){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //SignUp API call
    try{
      
      //Upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.ATUH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      // console.log(response);

      const {token, user} = response.data;

      if(token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch(err){
      // console.log(err)
      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="mb-5">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className='btn-primary'>SIGN UP</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SIgnUp