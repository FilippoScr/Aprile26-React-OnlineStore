import { createContext, useState } from "react";

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
    const [orders, setOrders] = useState([]);

    function addOrder(order) {
        setOrders(prev => [...prev, order]);
    }

    return (
        <OrdersContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}