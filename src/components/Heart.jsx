export default function Heart({ active, onClick }) {
  return (
    <button className="heart" onClick={onClick}> {/* Per eventuale gestione con CSS: className={`heart ${active ? "active" : ""}`} onClick={onClick} */}
      {active ? "❤️" : "🤍"}
    </button>
  );
}