import { createContext, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const QPriceMiniContext = createContext();

export function QPriceMiniProvider({ price, limit, qntFromCart, itemId, children }) {
    const [qnt, setQnt] = useState(qntFromCart || 1);
    const { updateQnt } = useContext(CartContext);

    function updateQntLocal(newQnt) {
        // Imposta come quantità il numero massimo tra 1(minimo) e quello inserito dall'utente convertito in numero, se vuoto o NaN sarà 1(||1).
        const minQnt = Math.max(1, Number(newQnt) || 1);

        // Primo operatore ternario: Necessario perché lo 0 è considerato Falsy, avrebbe impostato 1+ anche se in realtà il valore minore da impostare fosse 0.
        // Secondo operatore ternario partendo da typeof: Se c'è un limite di tipo numerico (non 0), imposta come quantità il limite o il valore inserito dall'utente se minore. Mantiene il minore tra i 2 valori. Senza limite accetta qualsiasi quantità valida.
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