import ReactDOM from "react-dom/client";
import { APP } from "./App";
import "./sass/main.scss";

const rootElement = document.querySelector("#root");

const root = ReactDOM.createRoot(rootElement);

root.render (
<APP/>
)

