import { useContext } from "react";
import { QPriceMiniContext } from "./QuantityPrice";
import { CartContext } from "../contexts/CartContext";

export default function AddToCart({ item }) {
    const { qnt } = useContext(QPriceMiniContext);
    const { fillCart } = useContext(CartContext);

    return (
        <button onClick={() => fillCart(item, qnt)}>
            Aggiungi al Carrello
        </button>
    );
}
