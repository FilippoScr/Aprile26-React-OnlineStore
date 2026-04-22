import useWishlist from "../hooks/useWishlist";
import ItemCard from "../components/ItemCard";
import Remove from "../components/Remove";
import { QPriceMiniProvider } from "../components/QuantityPrice";
import AddToCart from "../components/AddToCart";

export default function Wishlist() {
  const { wishlist, remove } = useWishlist();

  return (
    <div>
      <h1>PREFERITI</h1>

      {wishlist.map(i => (
        <ItemCard
          key={i.id}
          className="productCard"
          {...i}
          rate={i.rating.rate}
          count={i.rating.count}
          limit={i.limit}>

          {{
            remove: (
              <Remove onClick={() => remove(i.id)} />
            ),
            choice: (
              i.limit === 0 ? (
                <p className="outOfStock">Articolo attualmente non disponibile.</p>
              ) : (
                <QPriceMiniProvider price={i.price} limit={i.limit}>
                  <AddToCart item={i} />
                </QPriceMiniProvider>
              )
            )
          }}
        </ItemCard>
      ))}
    </div>
  );
}
