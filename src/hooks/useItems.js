import { useState, useEffect } from "react";

export default function useItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorType, setErrorType] = useState(null); //network/http/generic

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await fetch("https://fakestoreapi.com/products"); //fakestoreapi.com/products

                //Gestione risposte negative (403/404/500):
                if (!response.ok) {
                    setErrorType("http");
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                // Aggiungiamo un limit a tutti gli oggetti dell'API (simuliamo quantità limitate di magazzino).
                const itemsWithLimit = data.map(item => ({
                    ...item,
                    limit: Math.floor(Math.random() * 11)
                }));

                setItems(itemsWithLimit);

            } catch (error) {

                // Caso: errore di rete (API non risponde proprio).
                if (error instanceof TypeError) {
                    setErrorType("network");
                    setError(`Impossibile contattare il server, prova a controllare la connessione. ${error.name}: ${error.message}`);
                }
                // Caso: errore HTTP (quello lanciato da noi).
                else if (errorType === "http") {
                    setError(`${error.name}: ${error.message}`);
                }
                // Caso: errore generico
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

/* Vecchia sintassi .then/.catch:
useEffect(() => {
        fetch("https://")
            .then(r => r.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });
    }, []); */