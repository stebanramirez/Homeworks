import { useState } from "react";
import { Container, Form, Button, ListGroup, Alert, Spinner } from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";

function Tasks() {
  const { tasks, isPending, error, addTask, editTask, toggleTask, removeTask } =
    useTasks();

  const [titulo, setTitulo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");

  const agregar = async (evt) => {
    evt.preventDefault();
    if (!titulo.trim()) return;

    await addTask(titulo.trim());
    setTitulo("");
  };

  const empezarEdicion = (evt, tarea) => {
    setEditandoId(tarea.id);
    setTituloEditado(tarea.title);
  };

  const guardarEdicion = async (evt, id) => {
    if (!tituloEditado.trim()) return;

    await editTask(id, tituloEditado.trim());
    setEditandoId(null);
  };

  const pendientes = tasks.filter((t) => !t.done).length;

  return (
    <Container className="tasks-page">
      <h1>Tareas</h1>
      <p className="subtitle">
        {pendientes} pendiente{pendientes !== 1 ? "s" : ""} de {tasks.length}
      </p>

      <Form className="task-form" onSubmit={agregar}>
        <Form.Control
          placeholder="Nueva tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Button type="submit">Agregar</Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {isPending && tasks.length === 0 ? (
        <div className="centered-inline">
          <Spinner animation="border" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="empty">No tienes tareas todavia.</p>
      ) : (
        <ListGroup className="task-list">
          {tasks.map((tarea) => (
            <ListGroup.Item key={tarea.id} className={tarea.done ? "done" : ""}>
              <Form.Check
                type="checkbox"
                checked={tarea.done}
                onChange={() => toggleTask(tarea.id, tarea.done)}
                aria-label="Marcar como hecha"
              />

              {editandoId === tarea.id ? (
                <Form.Control
                  size="sm"
                  value={tituloEditado}
                  onChange={(e) => setTituloEditado(e.target.value)}
                  autoFocus
                />
              ) : (
                <span className="task-title">{tarea.title}</span>
              )}

              <div className="task-actions">
                {editandoId === tarea.id ? (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={(evt) => guardarEdicion(evt, tarea.id)}
                    >
                      Guardar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => setEditandoId(null)}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={(evt) => empezarEdicion(evt, tarea)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => removeTask(tarea.id)}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default Tasks;
