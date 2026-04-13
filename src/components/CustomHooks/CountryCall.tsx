import axios from "axios";
import { useEffect, useState } from "react";

const useCountryCall = () => {
  const [country, setCountry] = useState<any>([]);

  // country api call
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          "https://qa3.franchise.backend.shipgl.in/api/v1/location/countries",
        );
        setCountry(res?.data?.data?.countries || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountry();
  }, []);

  return country;
};

export default useCountryCall;
