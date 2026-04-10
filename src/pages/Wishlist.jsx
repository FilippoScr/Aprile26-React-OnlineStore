import useWishlist from "../hooks/useWishlist";
import RemoveButton from "../components/RemoveButton";

export default function Wishlist() {
  const { wishlist, remove } = useWishlist();

  return (
    <div>
      <h1>PREFERITI</h1>

      {wishlist.map(i => (
        <ItemCard
          key={i.id}
          {...i}
          rate={i.rating.rate}
          count={i.rating.count}>
          <RemoveButton onClick={() => remove(i.id)} />
        </ItemCard>
      ))}
    </div>
  );
}
