import { PrimaryInput } from "./Element/primaryInput";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { BasicComboBox } from "./Element/PrimaryComboBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import { PERSONAL_DETAILS } from "@/mock/arraypersonaldetals";
import { ADDRESS_FIELDS } from "@/mock/arraypersonaldetals";
import { BILLING_FIELDS } from "@/mock/arraypersonaldetals";
import { personalDataschema } from "@/Schema/ConsigneeSchema";

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

  const personalDataForm = useForm({
    mode: "onChange",
    resolver: zodResolver(personalDataschema),
    defaultValues: {
      country: "",
      state: "",
      billing_Country: "",
      billing_State: "",
      billingCheck: true,
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

  // country call
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
  // state call
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
              {PERSONAL_DETAILS.map((item: any, index: number) => (
                <PrimaryInput
                  placeholder={item.placeholder}
                  label={item.label}
                  type={item.type}
                  name={item.name}
                  form={personalDataForm}
                  key={index}
                  isRequired={item.isRequired}
                />
              ))}
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
              <BasicComboBox
                label="State"
                list={state}
                fOption="Select State"
                name="state"
                valueKey="state_name"
                labelKey="state_name"
                form={personalDataForm}
              />
              {ADDRESS_FIELDS.map((item: any, index: number) => (
                <PrimaryInput
                  placeholder={item.placeholder}
                  label={item.label}
                  type={item.type}
                  name={item.name}
                  form={personalDataForm}
                  key={index}
                  isRequired={item.isRequired}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center *:cursor-pointer">
            <input
              type="checkbox"
              id="check"
              checked={billingCheck}
              // onChange={() => setBillingCheck((prev) => !prev)}
              onChange={() => {
                setBillingCheck(!billingCheck);
                personalDataForm.setValue("billingCheck", !billingCheck);
              }}
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
                  <BasicComboBox
                    label="State"
                    list={state}
                    fOption="Select State"
                    name="billing_State"
                    valueKey="state_name"
                    labelKey="state_name"
                    form={personalDataForm}
                  />
                  {BILLING_FIELDS.map((item: any, index: number) => (
                    <PrimaryInput
                      placeholder={item.placeholder}
                      label={item.label}
                      type={item.type}
                      name={item.name}
                      form={personalDataForm}
                      key={index}
                      isRequired={item.isRequired}
                    />
                  ))}
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
