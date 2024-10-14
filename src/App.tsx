import './App.css';
import TextEditor from './components/texteditor.tsx';

function App() {
    return (
        <>
            <nav className="navbar">
                <ul className="menu">
                    <li className="menu-item">
                        File
                        <ul className="dropdown">
                            <li>New File</li>
                            <li>New Window</li>
                            <li>Open File</li>
                            <li>Save</li>
                            <li>Save As</li>
                            <li>Share</li>
                            <li>Exit</li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        Edit
                        <ul className="dropdown">
                            <li>Undo</li>
                            <li>Redo</li>
                            <li>Cut</li>
                            <li>Copy</li>
                            <li>Paste</li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        View
                        <ul className="dropdown">
                            <li>Preview</li>
                            <li>Full Screen</li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        Format
                        <ul className="dropdown">
                            <li>Bold</li>
                            <li>Italic</li>
                            <li>Underline</li>
                            <li>Font</li>
                            <li>Font Size</li>
                            <li>Align</li>
                            <li>Heading</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <TextEditor />
        </>
    );
}

export default App;
