import "./App.css";

/*
import {Routes, Route} from 'react-router-dom';
import GoogleSignInButton from "./components/authpage.tsx";
*/

import EditorScreen from "./components/mainscreen.tsx";

function App() {
    return (
	<EditorScreen />
	/*
	<Routes>
	<Route path="/Twill" element={<GoogleSignInButton />} />
	<Route path="/Twill/editor" element={<EditorSceen />} />
	</Routes>
	*/
    );
}

export default App;
