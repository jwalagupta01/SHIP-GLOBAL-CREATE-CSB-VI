import { useForm } from "react-hook-form";
import { PassInput, PrimaryInput } from "../components/Element/primaryInput";
import { PrimaryBtn } from "../components/Element/PrimaryBtn";
import { loginSchema } from "@/Schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToken } from "@/Redux/HomeData.ts/TokenSlice";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const loginForm = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  function onFormSubmit(data: any): void {
    const formsubmitApi = async () => {
      try {
        const res = await axios.post(
          "https://qa3.franchise.backend.shipgl.in/api/v1/auth/login",
          { email: data.email, password: data.password },
        );
        setMessage("Login SuccessFully");

        if (res?.data?.message == "Access token created") {
          dispatch(addToken(res?.data?.data?.token_details?.token));
          navigate("/dashboard");
        } else {
          setMessage("Wrong email or password. Try again");
        }
      } catch (error) {
        setMessage("Wrong email or password. Try again");
        console.error(error);
      }
    };
    formsubmitApi();
  }

  return (
    <div className="w-full h-full flex items-center justify-center overflow-scroll bg-[url(https://qa2.franchise.shipgl.in/background.jpg)] bg-cover bg-center">
      <div>
        <img
          src="https://qa2.franchise.shipgl.in/logo.png"
          alt=""
          className="w-50 absolute top-8 left-20"
        />
      </div>
      <form
        className="w-2/5 h-auto flex flex-col gap-y-5 px-5 py-15 bg-white rounded-lg"
        onSubmit={loginForm.handleSubmit(onFormSubmit)}
      >
        <p className="font-bold text-xl text-center">Login</p>
        <PrimaryInput
          placeholder="Enter Email ID ..."
          label="Email"
          type="email"
          name="email"
          form={loginForm}
          isRequired={false}
        />
        <PassInput
          type={showPass ? "password" : "text"}
          label="Password"
          form={loginForm}
          name="password"
          showPass={showPass}
          setShowPass={setShowPass}
        />
        <p className="text-start text-blue-500 font-semibold cursor-pointer">
          Forgot Password
        </p>
        <p className="-mt-2 text-red-500 font-medium">{message}</p>
        <div className="flex justify-center">
          <PrimaryBtn
            className="py-6 bg-blue-800 hover:bg-blue-700 w-50"
            variant="default"
            text="Submit"
          />
        </div>
      </form>
    </div>
  );
}
