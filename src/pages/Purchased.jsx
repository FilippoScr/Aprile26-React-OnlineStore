// Acquistati.jsx
import { useContext } from "react";
import { OrdersContext } from "../contexts/OrdersContext";
import OrderCard from "../components/OrderCard";

export default function Purchased() {
    const { orders } = useContext(OrdersContext);

    if (orders.length === 0) {
        return <h1>Nessun ordine effettuato.</h1>;
    }

    return (
        <div>
            <h1>Ordini Effettuati</h1>

            {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
            ))}
        </div>
    );
}