import "./App.css";
import {Routes, Route} from 'react-router-dom';
import EditorSceen from "./components/mainscreen.tsx";
import GoogleSignInButton from "./components/authpage.tsx";

function App() {
    return (
	<Routes>
	<Route path="/Twill" element={<GoogleSignInButton />} />
	<Route path="/Twill/editor" element={<EditorSceen />} />
	</Routes>
    );
}

export default App;
