import { useState, useEffect } from "react";

export default function useItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorType, setErrorType] = useState(null);

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");

                //Gestione risposte negative (403/404/500):
                if (!response.ok) {
                    setErrorType("http");
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                const itemsWithLimit = data.map(item => ({
                    ...item,
                    limit: Math.floor(Math.random() * 11)
                }));

                setItems(itemsWithLimit);

            } catch (error) {

                if (error instanceof TypeError) {
                    setErrorType("network");
                    setError(`Impossibile contattare il server, prova a controllare la connessione. ${error.name}: ${error.message}`);
                }
                else if (errorType === "http") {
                    setError(`${error.name}: ${error.message}`);
                }
                else {
                    setErrorType("generic");
                    setError("Si è verificato un errore imprevisto.");
                }

            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, []);

    return { items, loading, errorType, error };
}