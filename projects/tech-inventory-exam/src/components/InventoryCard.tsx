import type { InventoryItem } from "../types";

type Props = {
  data: InventoryItem;
  onAñadir: (id: string) => void;
  onRestar: (id: string) => void;
};

const InventoryCard = ({ data, onAñadir, onRestar }: Props) => {
  return (
    <div className="card">
      <h3>
        {data.id}-{data.name}
      </h3>
      <h4>{data.category}</h4>
      <p>
        {data.isCritical === true ? (
          <span className="badge critical">Critico</span>
        ) : null}
      </p>
      {data.quantity !== 0 ? (
        <p>{data.quantity}</p>
      ) : (
        <div className="card out-of-stock">
          <p className="error">Agotado</p>
        </div>
      )}

      <div className="quantity-controls">
        <span>{data.quantity}</span>
        <button onClick={() => onAñadir(data.id)}> +</button>
        <button onClick={() => onRestar(data.id)}> -</button>
      </div>
    </div>
  );
};

export default InventoryCard;
