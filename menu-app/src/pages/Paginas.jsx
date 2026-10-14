const Pagina = ({ titulo, texto }) => (
  <div className="pagina">
    <h1>{titulo}</h1>
    <p>{texto}</p>
  </div>
);

export const Profile = () => <Pagina titulo="Profile" texto="Datos de tu perfil." />;
export const Messages = () => <Pagina titulo="Messages" texto="Tus mensajes." />;
export const Settings = () => <Pagina titulo="Settings" texto="Elige una opcion del submenu." />;
export const Account = () => <Pagina titulo="Account" texto="Configuracion de la cuenta." />;
export const SettingsProfile = () => <Pagina titulo="Settings / Profile" texto="Edita tu perfil." />;
export const Security = () => <Pagina titulo="Security & Privacy" texto="Seguridad y privacidad." />;
export const Password = () => <Pagina titulo="Password" texto="Cambia tu contrasena." />;
export const Notification = () => <Pagina titulo="Notification" texto="Preferencias de notificaciones." />;
export const Help = () => <Pagina titulo="Help" texto="Elige una opcion del submenu." />;
export const Faqs = () => <Pagina titulo="FAQs" texto="Preguntas frecuentes." />;
export const Ticket = () => <Pagina titulo="Submit a Ticket" texto="Envia un ticket de soporte." />;
export const Network = () => <Pagina titulo="Network Status" texto="Estado de la red." />;
export const Logout = () => <Pagina titulo="Logout" texto="Sesion cerrada." />;
