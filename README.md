# 🛒 React E‑Commerce — Documentazione Tecnica Completa

Questo file descrive l’intera architettura dell’app, il funzionamento dei context, il flusso dei dati tra i componenti e le funzionalità implementate. È pensato per mantenere chiara la struttura del progetto e facilitare lo sviluppo delle funzionalità future.

---

# 📦 Struttura generale dell’app

L’app è montata tramite:

BrowserRouter  
 └── App  
      ├── Header  
      ├── Nav  
      ├── WishlistProvider  
      │     └── CartProvider  
      │           └── Routes (Home, AboutUs, Products, Wishlist, Cart, Error)  
      └── Footer  

Tutte le pagine dentro `<Routes>` hanno accesso a:

- WishlistContext  
- CartContext  

---

# ❤️ Wishlist — Funzionamento

## WishlistContext

Gestisce la lista dei preferiti.

### Stato:
wishlist = []

### Funzioni esposte:
- isInWishlist(id) → verifica se un item è nei preferiti  
- add(item) → aggiunge un item  
- remove(id) → rimuove un item  
- addRemoveFavorite(item) → toggle preferito/non preferito  

### Provider:
Il provider espone:  
{ wishlist, add, remove, addRemoveFavorite, isInWishlist }

## Utilizzo nei componenti

### Products
- Mostra il cuore attivo/inattivo  
- Permette di aggiungere/rimuovere dai preferiti  

### Wishlist
- Mostra solo gli item preferiti  
- Permette di rimuoverli  

### Cart
- Permette di aggiungere/rimuovere dai preferiti anche dal carrello  

---

# 🛒 Cart — Funzionamento

## CartContext

Gestisce il carrello e le quantità.

### Stato:
cart = [ { ...item, qnt } ]

### Funzioni esposte:
- fillCart(item, qnt)  
  Aggiunge un item o incrementa la quantità se già presente.  
- removeFromCart(id)  
  Rimuove un item dal carrello.  
- updateQnt(id, newQnt)  
  Aggiorna la quantità di un item già presente.  

### Provider:
Il provider espone:  
{ cart, fillCart, removeFromCart, updateQnt }

---

# 🔢 Gestione quantità e totale — QPriceMiniProvider

QPriceMiniProvider gestisce:

- quantità locale (qnt)  
- totale (qnt * price)  
- sincronizzazione con il carrello tramite updateQnt  

### Props:
- price  
- limit  
- qntFromCart → quantità iniziale (solo nel carrello)  
- itemId → necessario per aggiornare il carrello  
- children  

### Funzionamento:

1. Imposta la quantità iniziale:  
   qnt = qntFromCart || 1  

2. Ogni modifica dell’input:
   - normalizza il valore (min 1, max limit)  
   - aggiorna lo stato locale  
   - aggiorna il carrello tramite updateQnt(itemId, finalQnt)  

3. Calcola il totale:  
   total = (qnt * price).toFixed(2)

4. Espone qnt ai children tramite QPriceMiniContext.

---

# 🧩 Products — Flusso completo

Per ogni item:

ItemCard  
 ├── Heart (wishlist)  
 └── QPriceMiniProvider (gestione quantità)  
       └── AddToCart (usa qnt e chiama fillCart)  

### AddToCart:
- legge qnt dal QPriceMiniContext  
- chiama fillCart(item, qnt)  

---

# 🧩 Wishlist — Flusso completo

Per ogni item preferito:

ItemCard  
 └── RemoveButton (rimuove dai preferiti)  

### Da implementare:
Aggiungere QPriceMiniProvider + AddToCart anche qui, come in Products.

---

# 🧩 Cart — Flusso completo

Per ogni item nel carrello:

ItemCard  
 ├── Heart (wishlist)  
 ├── RemoveButton (removeFromCart)  
 └── QPriceMiniProvider  
       - qntFromCart = i.qnt  
       - itemId = i.id  

### Comportamento:
- l’input mostra la quantità salvata nel carrello  
- modificandola:
  - aggiorna lo stato locale  
  - aggiorna il carrello tramite updateQnt  
- il totale si aggiorna automaticamente  

---

# 🧱 ItemCard

Componente contenitore che mostra:

- immagine  
- titolo  
- descrizione  
- prezzo  
- rating  
- children (Heart, RemoveButton, QPriceMiniProvider, AddToCart)  

---

# 🚀 Migliorie future previste

## 1️⃣ Wishlist → aggiungere “Aggiungi al carrello”
- Replicare la struttura di Products  
- Inserire QPriceMiniProvider anche nella wishlist  
- Permettere l’aggiunta al carrello direttamente dai preferiti  

## 2️⃣ Limit
- Verificare che sia rispettato in Products e Cart  
- Preparare il codice per quando l’API lo fornirà  

## 3️⃣ Pulsante “Acquista”
- Da inserire in fondo al carrello  
- Nessuna logica, solo UI  

## 4️⃣ Pagina Error
- Mostrare messaggio quando l’API non risponde  
- Collegarla a useItems quando error !== null  

## 5️⃣ Pulizia struttura componenti
- Spostare componenti dove più logico  
- Ridurre import inutili  
- Migliorare leggibilità  

## 6️⃣ Altre migliorie future
- Totale generale del carrello  
- Persistenza in localStorage  
- Animazioni  
- Messaggi di limite raggiunto  

---

# 📌 Conclusione

Questo file descrive in modo completo l’architettura attuale dell’app e i flussi di dati tra i vari componenti.  
È pensato per facilitare lo sviluppo delle prossime funzionalità e mantenere il progetto chiaro e scalabile.