import { useForm } from "react-hook-form";
import { PrimaryInput } from "./Element/primaryInput";

export function Login() {
  const loginForm = useForm({
    mode: "onChange",
  });

  return (
    <div className="w-full h-full flex items-center justify-center overflow-scroll bg-gradient-to-b from-blue-200  via-fuchsia-300 to-white">
      <div>
        <img
          src="https://qa2.franchise.shipgl.in/logo.png"
          alt=""
          className="w-50 absolute top-8 left-20"
        />
      </div>
      {/* <div className="w-full h-full flex flex-col items-center justify-center"> */}
      <form className="w-2/5 h-auto flex flex-col items-center justify-center px-5 py-15 bg-white rounded-lg">
        <p className="font-bold text-xl">Login</p>
        <PrimaryInput
          placeholder="Enter Email ID ..."
          label="Email"
          type="email"
          name="email"
          form={loginForm}
          isRequired={false}
        />
        <label htmlFor="" className="">Password</label>
        
      </form>
    </div>
    // </div>
  );
}
