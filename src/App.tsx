import "./App.css";
import EditorSceen from "./components/mainscreen.tsx";

/*
import {Routes, Route} from 'react-router-dom';
import GoogleSignInButton from "./components/authpage.tsx";
*/
function App() {
    return (
	    <EditorSceen />
	/*<Routes>
	<Route path="/Twill" element={<GoogleSignInButton />} />
	<Route path="/Twill/editor" element={<EditorSceen />} />
	</Routes>*/
    );
}

export default App;
