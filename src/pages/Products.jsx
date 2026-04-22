import useItems from "../hooks/useItems";
import useWishlist from "../hooks/useWishlist";
import ItemCard from "../components/ItemCard";
import Heart from "../components/Heart";
import { QPriceMiniProvider } from "../components/QuantityPrice";
import AddToCart from "../components/AddToCart";
import Error from "./Error";

export default function Products() {
  const { items, loading, errorType, error } = useItems();
  const { isInWishlist, addRemoveFavorite } = useWishlist();

  if (loading) return (<div>
    <h1>ARTICOLI</h1><p>Caricamento...</p>
  </div>);
  if (error) return <Error errorType={errorType} error={error} />
  console.log(items.map(i => i.id));

  return (
    <div>
      <h1>TUTTI GLI ARTICOLI DI CUI HAI BISOGNO SONO QUI!</h1>

      {items.map(i => (
        <ItemCard
          key={i.id}
          className="productCard"
          id={i.id}
          title={i.title}
          price={i.price}
          description={i.description}
          category={i.category}
          image={i.image}
          rate={i.rating.rate}
          count={i.rating.count}
          limit={i.limit}
        >

          {{
            heart: (
              <Heart
                active={isInWishlist(i.id)}
                onClick={() => addRemoveFavorite(i)} //toggleWishlist
              />
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

/* 
Formato dell'API:
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack",
  "price": 109.95,
  "description": "Your perfect pack for everyday use...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
*/