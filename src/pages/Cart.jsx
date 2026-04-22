import useWishlist from "../hooks/useWishlist";
import Heart from "../components/Heart";

import { useContext } from "react";
import ItemCard from "../components/ItemCard";
import Remove from "../components/Remove";
import { QPriceMiniProvider } from "../components/QuantityPrice";
import EmptyOrBuy from "../components/EmptyOrBuy";
import { CartContext } from "../contexts/CartContext";

export default function Cart() {
    const { isInWishlist, addRemoveFavorite } = useWishlist();

    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div>
            <h1>CARRELLO</h1>

            {cart.map(i => (
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
                    qnt={i.qnt}
                >
                    {{
                        remove: (
                            <Remove
                                onClick={() => removeFromCart(i.id)}
                            />
                        ),
                        heart: (
                            <Heart
                                active={isInWishlist(i.id)}
                                onClick={() => addRemoveFavorite(i)}
                            />
                        ),
                        choice: (
                            <QPriceMiniProvider price={i.price} limit={i.limit} qntFromCart={i.qnt} itemId={i.id} />
                        )
                    }}
                </ItemCard>
            ))}

            <EmptyOrBuy />
        </div>
    );
}