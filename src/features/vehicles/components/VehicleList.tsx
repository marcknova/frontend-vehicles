import type { Vehicle } from "../types/vehicle.types";

export function VehicleList(props: { vehicles: Vehicle[] }) {
  const { vehicles } = props;
  return (
    <div>
      <h2>Vehicle List</h2>
      {vehicles.map((v: Vehicle) => (
        <div key={v.id} className="cardContainer">
          <strong>
            {v.year} {v.make} {v.model}
          </strong>
          <p>
            ${v.price.toLocaleString()} — {v.status}
          </p>
        </div>
      ))}
    </div>
  );
}
