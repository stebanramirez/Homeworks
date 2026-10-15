import { useContext } from "react";
import { FilesContext } from "../context/FilesContext";

export const useFiles = () => useContext(FilesContext);
