type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
};

const ProductCard = ({ title, price, image, isNew, inStock }: ProductCardProps) => {
  // Añadir clase condicionalmente
  const cardClassName = `card ${!inStock ? 'out-of-stock' : ''}`;

  return (
    <div className={cardClassName}>
      {isNew && <span className="badge-new">¡NUEVO!</span>}
      
      <img src={image} alt={title} className="card-img" />
      
      <h3 className="card-title">{title}</h3>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{price.toFixed(2)} €</p>
      
      <button className="btn btn-primary" disabled={!inStock}>
        {inStock ? 'Añadir al carrito' : 'Agotado'}
      </button>
    </div>
  );
};

export default ProductCard;