import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { OrdersContext } from "../contexts/OrdersContext";

export default function EmptyOrBuy() {
    const navigate = useNavigate();
    const { cart, qntTotalProducts, totalCart, setCart } = useContext(CartContext);
    const { addOrder } = useContext(OrdersContext);

    function handleBuy() {
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

        addOrder(order);   // <-- salva l’ordine nel context
        setCart([]);       // <-- svuota il carrello
        navigate("/purchased"); // <-- vai alla pagina ordini
    }

    return (
        <div className="emptyOrBuyBox">
            <span className="emptyOrBuy">Totale Carrello: {totalCart}</span>

            <button className="buyBtn" onClick={handleBuy}>
                Acquista
            </button>
            <button className="emptyBtn" onClick={() => setCart([])}>
                Svuota
            </button>
        </div>
    );
}