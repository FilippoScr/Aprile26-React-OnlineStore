import { createContext, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const QPriceMiniContext = createContext();

export function QPriceMiniProvider({ price, limit, qntFromCart, itemId, children }) {
    const [qnt, setQnt] = useState(qntFromCart || 1);
    const { updateQnt } = useContext(CartContext);

    function updateQntLocal(newQnt) {
        const minQnt = Math.max(1, Number(newQnt) || 1);

        const finalQnt = limit === 0 ? 0 : typeof limit === "number" ? Math.min(minQnt, limit) : minQnt;
        setQnt(finalQnt)
        updateQnt(itemId, finalQnt);
    }

    const total = (qnt * price).toFixed(2);

    return (
        <div className="quantityRow">
            <input type="number" min="1" max={limit} value={qnt} onChange={(e) => updateQntLocal(e.target.value)} className="qntInput" />

            <span className="total">Totale: €{total}</span>

            {qnt === limit && (
                <p className="limitReached">Limite quantità raggiunto.</p>
            )}

            <QPriceMiniContext.Provider value={{ qnt }}>
                {children}
            </QPriceMiniContext.Provider>
        </div>
    )
}