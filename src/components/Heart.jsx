export default function Heart({ active, onClick }) {
  return (
    <button className="heart" onClick={onClick}>
      {active ? "❤️" : "🤍"}
    </button>
  );
}