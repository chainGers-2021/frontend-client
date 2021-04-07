import sampleCard from "../assets/sampleCard.jpg";

const ProductCard = (props) => {
  return (
    <div className="card-body">
      <div className="card-thumbnail-container">
        <img src={sampleCard} className="card-thumbnail" alt="Thumbnail" />
      </div>

      <div className="card-author">{props.address}</div>
      <div className="card-name">{props.pair}</div>
      <div className="card-price">{props.locked}</div>
      <div className="card-price">{props.NGO}</div>
    </div>
  );
};

export default ProductCard;
