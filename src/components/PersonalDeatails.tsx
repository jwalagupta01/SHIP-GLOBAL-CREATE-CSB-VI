import { PrimaryInput } from "./Element/primaryInput";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { BasicComboBox } from "./Element/PrimaryComboBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";

interface geetingsProps {
  consignor: boolean;
  setConsignor: any;
  setAllData: any;
  consignee: boolean;
}

const PersonalDeatails = ({
  consignor,
  setConsignor,
  setAllData,
  consignee,
}: geetingsProps) => {
  const [billingCheck, setBillingCheck] = useState<boolean>(true);
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [country, setCountry] = useState<any>([]);
  const [state, setState] = useState<any>([]);

  const personalDataschema = z.object({
    fname: z.string().nonempty("First name is required"),
    lname: z.string().nonempty("Last name is required"),
    mobile: z
      .string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number"),
    email: z.email().nonempty("Please enter a valid email address"),
    country: z.string().nonempty("Please select a country"),
    address1: z.string().nonempty("Address 1 is required"),
    address2: z.string().nonempty("Address 2 is required"),
    landMark: z.string().optional(),
    state: z.string().nonempty("Please select a state"),
    city: z.string().nonempty("City is required"),
    pinCode: z.string().nonempty("Pincode is required"),
    billing_Country: billingCheck
      ? z.string().optional()
      : z.string().nonempty("Country is required"),
    billing_Address1: billingCheck
      ? z.string().optional()
      : z.string().nonempty("Address 1 is required"),
    billing_Address2: billingCheck
      ? z.string().optional()
      : z.string().nonempty("Address 2 is required"),
    billing_Landmark: z.string().optional(),
    billing_State: billingCheck
      ? z.string().optional()
      : z.string().nonempty("State is required"),
    billing_City: billingCheck
      ? z.string().optional()
      : z.string().nonempty("City is required"),
    billing_Pincode: billingCheck
      ? z.string().optional()
      : z.string().nonempty("Pincode is required"),
  });

  const personalDataForm = useForm({
    mode: "onChange",
    resolver: zodResolver(personalDataschema),
    defaultValues: {
      country: "",
      state: "",
      billing_Country: "",
      billing_State: "",
    },
  });

  const watchvalue = personalDataForm.watch();

  function formOnSubmit(data: any): void {
    try {
      setAllData((prev: any) => ({ ...prev, personalData: data }));
      setConsignor(false);
      setFormSubmit(true);
    } catch (error) {
      console.error(error);
    }
  }

  function onchangeBtn() {
    setConsignor(true);
    setFormSubmit(false);
  }

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          "https://qa2.franchise.backend.shipgl.in/api/v1/location/countries",
        );
        setCountry(res?.data?.data?.countries || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    if (!watchvalue.country) return;

    const fetchState = async () => {
      try {
        const res = await axios.post(
          "https://qa2.franchise.backend.shipgl.in/api/v1/location/statesv2",
          { state_country_code: watchvalue.country },
        );
        setState(res?.data?.data?.states);
      } catch (error) {
        console.error(error);
      }
    };
    fetchState();
  }, [watchvalue.country]);

  return (
    <div className="border border-gray-400 rounded w-full h-auto *:px-4">
      <div className="flex items-center justify-between h-13 border-b border-gray-400">
        <div className="flex items-center gap-x-2">
          {!formSubmit ? (
            <p
              className={` px-2 rounded ${!consignor ? "bg-gray-300 text-black" : "bg-black text-white"}`}
            >
              2
            </p>
          ) : (
            <p className="bg-green-600 px-1 py-1 rounded text-white">
              <FaCheck />
            </p>
          )}
          <p className="font-semibold text-lg">Consignee Details</p>
        </div>
        {!consignor && !consignee ? (
          <p
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={onchangeBtn}
          >
            Change
          </p>
        ) : (
          ""
        )}
      </div>
      {consignor && (
        <form
          onSubmit={personalDataForm.handleSubmit(formOnSubmit)}
          className="bg-white py-2"
        >
          <div>
            <p className="font-semibold">Personal Details</p>
            <div className="grid grid-cols-3 *:w-70 mt-2 gap-y-3">
              <PrimaryInput
                placeholder="Enter First Name ..."
                label="First Name"
                type="text"
                name="fname"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter Last Name ..."
                label="Last Name"
                type="text"
                name="lname"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter Mobile Number ..."
                label="Mobile Number"
                type="tel"
                name="mobile"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter Email ..."
                label="Email Address"
                type="email"
                name="email"
                form={personalDataForm}
              />
            </div>
            <p className="font-semibold mt-3">Shipping Address</p>
            <div className="grid grid-cols-3 gap-y-3 *:w-70 mt-2">
              <BasicComboBox
                label="Country"
                list={country}
                fOption="Select Country"
                name="country"
                valueKey="country_iso2"
                labelKey="country_name"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter Address 1 ..."
                label="Address 1"
                type="text"
                name="address1"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter Address 2 ..."
                label="Address 2"
                type="text"
                name="address2"
                form={personalDataForm}
              />
              <PrimaryInput
                label="Landmark"
                placeholder="Enter Landmark ..."
                type="text"
                name="landMark"
                form={personalDataForm}
              />
              <BasicComboBox
                label="State"
                list={state}
                fOption="Select State"
                name="state"
                valueKey="state_name"
                labelKey="state_name"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter City ..."
                label="City"
                type="text"
                name="city"
                form={personalDataForm}
              />
              <PrimaryInput
                placeholder="Enter Pincode ..."
                label="Pincode"
                type="text"
                name="pinCode"
                form={personalDataForm}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center *:cursor-pointer">
            <input
              type="checkbox"
              id="check"
              checked={billingCheck}
              onChange={() => setBillingCheck((prev) => !prev)}
            />
            <label htmlFor="check" className="ms-2">
              Billing address is same as shipping address
            </label>
          </div>
          <div className="mt-3">
            {!billingCheck && (
              <div>
                <p className="font-semibold mt-3">Shipping Address</p>
                <div className="grid grid-cols-3 gap-y-3 *:w-70 mt-2">
                  <BasicComboBox
                    label="Country"
                    list={country}
                    fOption="Select Country"
                    name="billing_Country"
                    valueKey="country_iso2"
                    labelKey="country_name"
                    form={personalDataForm}
                  />
                  <PrimaryInput
                    placeholder="Enter Address 1 ..."
                    label="Address 1"
                    type="text"
                    name="billing_Address1"
                    form={personalDataForm}
                  />
                  <PrimaryInput
                    placeholder="Enter Address 2 ..."
                    label="Address 2"
                    type="text"
                    name="billing_Address2"
                    form={personalDataForm}
                  />
                  <PrimaryInput
                    label="Landmark"
                    placeholder="Enter Landmark ..."
                    type="text"
                    name="billing_Landmark"
                    form={personalDataForm}
                  />
                  <BasicComboBox
                    label="State"
                    list={state}
                    fOption="Select State"
                    name="billing_State"
                    valueKey="state_name"
                    labelKey="state_name"
                    form={personalDataForm}
                  />
                  <PrimaryInput
                    placeholder="Enter City ..."
                    label="City"
                    type="text"
                    name="billing_City"
                    form={personalDataForm}
                  />
                  <PrimaryInput
                    placeholder="Enter Pincode ..."
                    label="Pincode"
                    type="text"
                    name="billing_Pincode"
                    form={personalDataForm}
                  />
                </div>
              </div>
            )}
            <div className="my-3 flex justify-end mx-5">
              <PrimaryBtn
                text="Continue"
                variant="default"
                className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
              ></PrimaryBtn>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalDeatails;
