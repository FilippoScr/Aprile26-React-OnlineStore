import { useNavigate } from "react-router-dom";

export default function Error({ errorType, error }) {
  const navigate = useNavigate();

  const isFakeError = !(errorType && error);

  return (
    <div className="errorBox">
      <h1>Pagina di Errore</h1>

      {isFakeError ? (
        <>
          <p>Avete cliccato il pulsante "Visualizza Pagina Errore" nella Home; serve soltanto per mettere al corrente i visitatori dell'esistenza di questa pagina, quindi in questo caso non è presente alcun errore, ma: <strong>La pagina Error vi ringrazia per essere passati a salutarla.</strong></p>
        </>
      ) : (
        <>
          {errorType === "http" && (
            <h2 className="apiErrorTitle">Problema derivante dall'API</h2>
          )}

          {errorType === "network" && (
            <h2 className="networkErrorTitle">Errore di Rete</h2>
          )}

          {errorType === "generic" && (
            <h2 className="genericErrorTitle">Errore Imprevisto</h2>
          )}

          <p className="errorMessage">{error}</p>
        </>
      )}

      <button onClick={() => window.location.reload()}>
        Riprova
      </button>

      <button onClick={() => navigate("/")}>
        Torna alla Home
      </button>
    </div>
  );
}