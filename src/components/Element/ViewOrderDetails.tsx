import { PiMapPinFill } from "react-icons/pi";
import { LuBox, LuWeight } from "react-icons/lu";
import { BsTruck } from "react-icons/bs";

interface proDetacardprops {
  icon: React.ReactNode;
  weight: string;
  label: string;
  className?: string;
}

function ProDetacard({ icon, weight, label, className }: proDetacardprops) {
  return (
    <div className="flex border rounded p-4 gap-x-2">
      <span className={`p-4 text-lg rounded-lg ${className}`}>{icon}</span>

      <div className="flex flex-col gap-y-1">
        <p className="font-semibold text-md">{weight}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  );
}

interface geetingsProps {
  orderDetails: any;
}

export default function ViewOrderDetails({ orderDetails }: geetingsProps) {
  return (
    <div className="bg-white px-4 py-5 rounded-lg">
      <div className="flex">
        <div className="flex">
          <span className="text-xl">
            <PiMapPinFill />
          </span>
          <div className="flex flex-col gap-y-1">
            <p className="text-md font-semibold">Pickup Address</p>
            <p className="text-gray-500 text-sm">
              {orderDetails.pickup_firstname} {orderDetails.pickup_lastname} |
              +91 {orderDetails.pickup_mobile}
            </p>
            <p className="text-sm">
              {orderDetails.pickup_address_nickname},{" "}
              {orderDetails.pickup_address}, {orderDetails.pickup_city},{" "}
              {orderDetails.pickup_state_name}({orderDetails.pickup_postcode})
            </p>
          </div>
        </div>
        <div className="flex">
          <span className="text-xl">
            <PiMapPinFill />
          </span>
          <div className="flex flex-col gap-y-1">
            <p className="text-md font-semibold">Delivery Address</p>
            <p className="text-gray-500 text-sm">
              {orderDetails.customer_shipping_firstname}{" "}
              {orderDetails.customer_shipping_lastname} |{" "}
              {orderDetails.customer_shipping_mobile}
            </p>
            <p className="text-sm">
              {orderDetails.customer_shipping_address},
              {orderDetails.customer_shipping_address_2},
              {orderDetails.customer_shipping_city},
              {orderDetails.customer_shipping_state},{""}
              {orderDetails.customer_shipping_country} (
              {orderDetails.customer_shipping_postcode})
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <ProDetacard
          icon={<LuWeight />}
          weight={`${orderDetails.package_weight / 1000} kg`}
          label="Dead Weight"
          className="bg-blue-300/30 text-blue-600"
        />
        <ProDetacard
          icon={<LuWeight />}
          weight={`${orderDetails.package_volume_weight / 1000} kg`}
          label="Volumetric Weight"
          className="bg-green-300/30 text-green-700"
        />
        <ProDetacard
          icon={<LuWeight />}
          weight={`${orderDetails.package_bill_weight / 1000}`}
          label="Billed Weight"
          className="bg-yellow-300/30 text-yellow-500"
        />
        <ProDetacard
          icon={<LuBox />}
          weight={`${orderDetails.package_length} x ${orderDetails.package_breadth} x ${orderDetails.package_height}`}
          label="Dimension (L x B x H)"
          className="bg-red-300/50 text-red-500"
        />
        <ProDetacard
          icon={<BsTruck />}
          weight={orderDetails.shipper}
          label="Shipping Partner"
          className="bg-orange-300/30 text-orange-700"
        />
        <ProDetacard
          icon={<BsTruck />}
          weight={orderDetails.estimated_delivery_time}
          label="Estimated Delivery Time"
          className="bg-orange-300/30 text-orange-700"
        />
      </div>
    </div>
  );
}
