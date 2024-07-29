import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import logo from "../assets/paskr-logo.png";
import background from "../assets/gradient-background.jpg"; // Import the background image

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const submitHandler = async (data) => {
    try{
      const result = await login(data).unwrap();
      dispatch(setCredentials(result))
      navigate("/");
    }
    catch(err){
      console.log(err)
      toast.error(err?.data?.message || err.error);
      
    }
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-3/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="flex justify-center">
              <img src={logo} alt="logo" className="w-40" />
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Enter Email Address"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="Enter Password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <Button
                type="submit"
                label="Submit"
                className="w-full h-10 bg-emerald-500 text-white rounded-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login