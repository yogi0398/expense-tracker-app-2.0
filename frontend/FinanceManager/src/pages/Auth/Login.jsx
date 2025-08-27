import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = ({theme}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const {updateUser} = useContext(UserContext);

  // const theme = "dark";

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address !!");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API CALL

    try{
      const response = await axiosInstance.post(API_PATHS.ATUH.LOGIN, {
        email, 
        password
      });
      const {token, user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        console.log(user);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch(err){
      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      }
      else{

        setError(`Something went wrong. Please try again.${err}`);
      }
    }
  }

  return (
    <AuthLayout theme={theme}>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className={`text-xl font-semibold  ${theme === "dark" ? "text-white" : "text-black"}`}>Welcome Back</h3>
        <p className={`text-xs mt-[5px] mb-6 ${theme === "dark" ? "text-gray-200" : "text-slate-500"}`}>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            theme = {theme}
          />

          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 Characters"
            type="password"
            theme = {theme}
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className={`${theme === "dark" ? "btn-primary-dark" : "btn-primary"}`}>LOGIN</button>

          <p className={`text-[13px] mt-3 ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login