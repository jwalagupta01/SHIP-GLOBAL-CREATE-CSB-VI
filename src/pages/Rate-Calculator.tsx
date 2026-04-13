import { PrimaryBtn } from "@/components/Element/PrimaryBtn";
import { BasicComboBox } from "@/components/Element/PrimaryComboBox";
import { PrimaryInput, SecondryInput } from "@/components/Element/primaryInput";
import ShippingPartner from "@/components/ShippingPartner";
import { SHIPMENT_SIZE } from "@/mock/arrayshipmentdetails";
import useCountryCall from "@/components/CustomHooks/CountryCall";
import { CalculatorSchema } from "@/Schema/calculatorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

export default function RateCalculator() {
  const token = useSelector((state: any) => state.auth.token);
  const [formData, setFormData] = useState<any>({});
  const [steper, setSteper] = useState<number>(4);
  const [alldata, setAllData] = useState<any>({});
  const [shiperRates, setShiperRates] = useState<any>({});
  const rateCalculatorform = useForm({
    mode: "onChange",
    resolver: zodResolver(CalculatorSchema),
    defaultValues: {
      country: "",
    },
  });
  const country = useCountryCall();

  function ratecalcFormSubmit(data: any): void {
    try {
      setFormData(data);
      shiperRatescall();
    } catch (error) {
      console.error(error);
    }
  }
  //   api call
  async function shiperRatescall() {
    const payLoad = {
      customer_shipping_postcode: formData.postCode,
      customer_shipping_country_code: formData.country,
      package_weight: formData.dead_weight,
      package_length: formData.pro_length,
      package_breadth: formData.pro_breadth,
      package_height: formData.pro_height,
    };

    try {
      const res = await axios.post(
        "https://qa3.franchise.backend.shipgl.in/api/v1/orders/get-shipper-rates",
        payLoad,
        {
          headers: { Authorization: `bearer ${token}` },
        },
      );
      console.log(res?.data?.data);
      setShiperRates(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="pt-16 w-full h-full px-2 flex flex-col bg-gray-100 ">
      <p className="text-3xl font-semibold mt-2 h-[6%]">Rate Calculator</p>
      <div className="h-[92%] overflow-scroll">
        <form
          onSubmit={rateCalculatorform.handleSubmit(ratecalcFormSubmit)}
          action=""
          className="w-2/3 min-h-full bg-white px-4 py-3 rounded-lg flex flex-col gap-y-4"
        >
          <div className="flex flex-row gap-x-4 *:w-[50%]">
            <BasicComboBox
              label="Country"
              list={country}
              fOption="Select Country"
              name="country"
              valueKey="country_iso2"
              labelKey="country_name"
              form={rateCalculatorform}
            />
            <div>
              <PrimaryInput
                placeholder="Enter Destination Pincode ..."
                label="Destination Pincode"
                type="tel"
                name="postCode"
                form={rateCalculatorform}
                isRequired={false}
              />
              <p className="text-xs text-gray-700">
                Add destination postcode for accurate pricing and shippers.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-3">
            {SHIPMENT_SIZE.map((items: any, index: number) => (
              <SecondryInput
                placeholder={items.placeholder}
                stxt={items.stxt}
                label={items.label}
                key={index}
                form={rateCalculatorform}
                name={items.name}
              />
            ))}
          </div>
          <div className="flex gap-x-3 items-center justify-end my-4">
            <PrimaryBtn
              text="Reset"
              variant="default"
              className="px-8 py-5 bg-transparent text-blue-800 border border-blue-600 hover:bg-blue-700 hover:text-white"
              onClick={(e: any) => {
                e.preventDefault();
                rateCalculatorform.reset();
              }}
            />
            <PrimaryBtn
              text="Calculate"
              variant="default"
              className="px-8 py-5 bg-blue-800 text-white border border-blue-600 hover:bg-blue-700 hover:text-white"
            />
          </div>
          {Object.keys(shiperRates || {}).length > 0 && (
            <div>
              <ShippingPartner
                steper={steper}
                setSteper={setSteper}
                alldata={alldata}
                setAllData={setAllData}
                shiperRates={shiperRates}
                calculator={true}
              />
            </div>
          )}
        </form>
        <div className="w-1/3"></div>
      </div>
    </div>
  );
}
