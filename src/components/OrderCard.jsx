export default function OrderCard({ order }) {
    return (
        <div className="orderCard">
            <h2>Order #{order.numberOrder}</h2>
            <p><strong>Date:</strong> {order.date}</p>

            <table className="orderTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {order.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.price}</td>
                            <td>{item.qnt}</td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Total Order: {order.totalCart}</h3>
        </div>
    );
}