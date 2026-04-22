import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { OrdersContext } from "../contexts/OrdersContext";

export default function EmptyOrBuy() {
    const navigate = useNavigate();
    const { cart, qntTotalProducts, totalCart, setCart } = useContext(CartContext);
    const { addOrder } = useContext(OrdersContext);

    function handlePurchase() {
        const date = new Date().toLocaleString('it-IT').replace(',', '');

        const order = {
            numberOrder: `${date.split(' ')[0].replace(/\//g, '')} - ${qntTotalProducts} - ${totalCart.toString().replace(/[\., €]/g, '')}`,
            date,
            items: cart.map(item => ({
                id: item.id,
                price: "€" + item.price.toFixed(2),
                qnt: item.qnt,
                total: "€" + (item.price * item.qnt).toFixed(2)
            })),
            totalCart
        };

        addOrder(order);
        setCart([]);
        navigate("/purchased");
    }

    return (
        <div className="emptyOrBuyBox">
            <span className="emptyOrBuy">Totale Carrello: {totalCart}</span>

            <button className="purchaseBtn" onClick={handlePurchase}>
                Acquista
            </button>
            <button className="emptyBtn" onClick={() => setCart([])}>
                Svuota
            </button>
        </div>
    );
}