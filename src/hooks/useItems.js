import { useState, useEffect } from "react";

export default function useItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await fetch("https://fakestoreapi.com/products"); //fakestoreapi.com/products

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setItems(data);
            } catch (error) {
                setError(`${error.name}: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, []);

    return { items, loading, error };
}