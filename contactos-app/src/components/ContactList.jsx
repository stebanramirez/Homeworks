function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return <p className="empty">No tienes contactos guardados.</p>;
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => {
        return (
          <li key={contact.id}>
            <div>
              <strong>{contact.name}</strong>
              <span className="phone">{contact.phone}</span>
            </div>
            <button onClick={(evt) => onDelete(evt, contact.id)}>
              Eliminar
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ContactList;