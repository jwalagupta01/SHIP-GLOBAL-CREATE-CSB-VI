import { SideMesureBoxSVG } from "../Assest/sideMesureBoxSVG";

export default function MesureSideDetails() {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="font-semibold text-center">Quick Tips</p>
      <div className="flex items-center justify-center">
      <SideMesureBoxSVG />
      </div>
      <p className="font-semibold text-sm">Dead Weight:</p>
      <p className="text-xs">
        Dead weight (or dry weight) refers to the actual weight of the package
        in kilograms.
      </p>
      <p className="font-semibold text-sm">
        Volumetric Weight:(L x W x H / 5000)
      </p>
      <p className="text-xs">
        Volumetric Weight (or DIM weight) is calculated based on the dimensions
        of the package.
      </p>
      <p className="text-xs">
        The formula for calculating volumetric weight involves multiplying the
        length, width, and height of the package and then dividing by 5000.
      </p>
      <p className="font-semibold text-sm">Additionally:</p>
      <p className="text-xs">
        The higher value between volumetric weight and dead weight will be used
        for freight rate calculation.
      </p>
      <p className="text-xs">
        Prices are subject to change based on fuel surcharges and courier
        company base rates.
      </p>
      <p className="text-xs">The above prices exclude GST.</p>
    </div>
  );
}
