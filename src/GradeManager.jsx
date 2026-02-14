import { useState } from "react";

function GradeManager({ initialNotes = [] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const value = parseFloat(input);

    if (isNaN(value)) {
      setError("Veuillez entrer un nombre valide.");
      return;
    }
    if (value < 0 || value > 20) {
      setError("La note doit être comprise entre 0 et 20.");
      return;
    }

    setNotes([...notes, value]);
    setInput("");
    setError("");
  };

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const moyenne =
    notes.length > 0
      ? (notes.reduce((sum, n) => sum + n, 0) / notes.length).toFixed(2)
      : null;

  const getMoyenneColor = () => {
    if (moyenne === null) return "text-secondary";
    if (moyenne >= 10) return "text-success";
    return "text-danger";
  };

  return (
    <div className="card shadow-sm p-4 my-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3 className="card-title mb-3 text-center">Gestionnaire de Notes</h3>

      {}
      <div className="input-group mb-2">
        <input
          type="number"
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder="Entrez une note (0 - 20)"
          value={input}
          min={0}
          max={20}
          step={0.5}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Ajouter
        </button>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>

      {}
      <div className="text-center mb-3">
        {moyenne !== null ? (
          <span className={`fw-bold fs-5 ${getMoyenneColor()}`}>
            Moyenne : {moyenne} / 20
          </span>
        ) : (
          <span className="text-muted fst-italic">Aucune note enregistrée</span>
        )}
      </div>

      {}
      {notes.length > 0 ? (
        <ul className="list-group">
          {notes.map((note, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                Note {index + 1} :{" "}
                <strong className={note >= 10 ? "text-success" : "text-danger"}>
                  {note} / 20
                </strong>
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(index)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted">La liste est vide.</p>
      )}
    </div>
  );
}

export default GradeManager;
