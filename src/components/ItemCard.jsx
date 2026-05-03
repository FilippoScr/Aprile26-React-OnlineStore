export default function ItemCard({ className, children, image, title, description, price, rate, count }) {
    return (
        <div className={`itemCard ${className}`}>
            <div className="imageBox">
                <img src={image} alt={title} />
            {children.remove}
            {children.heart}
            </div>
            <h3>{title}</h3>
            <p className="description">{description}</p>
            <p>€<strong>{price}</strong></p>
            <p>{rate}⭐ - {count}👫</p>
            
            {children.choice}
        </div>
    );
}