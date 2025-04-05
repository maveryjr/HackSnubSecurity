import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./custom.css"; // Import custom CSS to hide Replit branding

createRoot(document.getElementById("root")!).render(<App />);
