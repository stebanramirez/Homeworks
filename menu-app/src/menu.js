import { NaryTree } from "./classes/NaryTree";
import { NaryNode } from "./classes/NaryNode";
import * as P from "./pages/Paginas";

const menu = new NaryTree();
const raiz = menu.root;

raiz.addChild(new NaryNode("Profile", "/profile", P.Profile));
raiz.addChild(new NaryNode("Messages", "/messages", P.Messages));

const settings = raiz.addChild(new NaryNode("Settings", "/settings", P.Settings));
settings.addChild(new NaryNode("Account", "/settings/account", P.Account));
settings.addChild(new NaryNode("Profile", "/settings/profile", P.SettingsProfile));
settings.addChild(new NaryNode("Security & Privacy", "/settings/security", P.Security));
settings.addChild(new NaryNode("Password", "/settings/password", P.Password));
settings.addChild(new NaryNode("Notification", "/settings/notification", P.Notification));

const help = raiz.addChild(new NaryNode("Help", "/help", P.Help));
help.addChild(new NaryNode("FAQs", "/help/faqs", P.Faqs));
help.addChild(new NaryNode("Submit a Ticket", "/help/ticket", P.Ticket));
help.addChild(new NaryNode("Network Status", "/help/network", P.Network));

raiz.addChild(new NaryNode("Logout", "/logout", P.Logout));

export default menu;
