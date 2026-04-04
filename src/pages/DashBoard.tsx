import axios from "axios";
import { useEffect } from "react";

export function DashBoard() {
  useEffect(() => {
    function fetchdashboardData() {
      try {

        

      } catch (error) {
        console.error(error);
      }
    }

    fetchdashboardData();
  }, []);

  return (
    <div className="py-20 w-full h-full">
      <p>fghjkfghjkl</p>
      <p>fghjkfghjkl</p>
      <p>fghjkfghjkl</p>
      <p>fghjkfghjkl</p>
      <p>fghjkfghjkl</p>
    </div>
  );
}
