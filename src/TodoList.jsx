import { useState } from "react";

const PRIORITIES = ["Haute", "Moyenne", "Basse"];

const PRIORITY_STYLES = {
  Haute:   { badge: "danger",  icon: "🔴" },
  Moyenne: { badge: "warning", icon: "🟡" },
  Basse:   { badge: "success", icon: "🟢" },
};

function TodoList({ initialTasks = [] }) {
  const [tasks, setTasks] = useState(
    initialTasks.map((t, i) => ({ id: i + 1, name: t.name, priority: t.priority, done: false }))
  );
  const [taskName, setTaskName]     = useState("");
  const [priority, setPriority]     = useState("Moyenne");
  const [search, setSearch]         = useState("");
  const [error, setError]           = useState("");
  const [filterPriority, setFilterPriority] = useState("Toutes");

  const handleAdd = () => {
    if (!taskName.trim()) {
      setError("Le nom de la tâche ne peut pas être vide.");
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      priority,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setError("");
  };

  const handleToggle = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === "Toutes" || t.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  const total    = tasks.length;
  const done     = tasks.filter((t) => t.done).length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="card shadow-sm p-4 my-4" style={{ maxWidth: "620px", margin: "0 auto" }}>
      <h3 className="card-title text-center mb-1">📝 Todo List avec Priorités</h3>

      {/* Statistiques */}
      <div className="d-flex justify-content-around text-center mb-2">
        <div>
          <div className="fw-bold fs-5">{total}</div>
          <small className="text-muted">Total</small>
        </div>
        <div>
          <div className="fw-bold fs-5 text-success">{done}</div>
          <small className="text-muted">Terminées</small>
        </div>
        <div>
          <div className="fw-bold fs-5 text-warning">{total - done}</div>
          <small className="text-muted">Restantes</small>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="progress mb-3" style={{ height: "10px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Formulaire d'ajout */}
      <div className="row g-2 mb-2">
        <div className="col-6">
          <input
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder="Nom de la tâche..."
            value={taskName}
            onChange={(e) => { setTaskName(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <div className="col-3">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <button className="btn btn-primary w-100" onClick={handleAdd}>
            + Ajouter
          </button>
        </div>
      </div>

      {/* Barre de recherche + filtre priorité */}
      <div className="row g-2 mb-3">
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Rechercher une tâche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-4">
          <select
            className="form-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="Toutes">Toutes</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des tâches */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted fst-italic">Aucune tâche trouvée.</p>
      ) : (
        <ul className="list-group">
          {filtered.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${task.done ? "list-group-item-light" : ""}`}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input mt-0"
                  checked={task.done}
                  onChange={() => handleToggle(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "#aaa" : "inherit",
                  }}
                >
                  {task.name}
                </span>
                <span className={`badge bg-${PRIORITY_STYLES[task.priority].badge}`}>
                  {PRIORITY_STYLES[task.priority].icon} {task.priority}
                </span>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(task.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
