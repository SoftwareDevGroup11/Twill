import "./App.css";
import TextEditor from "./components/texteditor.tsx";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState([
    { id: 1, name: "Untitled", content: "" },
  ]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [clipboard, setClipboard] = useState(""); // For cut/copy/paste
  const [isFullScreen, setIsFullScreen] = useState(false); // For full-screen mode

  const addNewFile = () => {
    const newFile = {
      id: files.length + 1,
      name: `Untitled-${files.length + 1}`,
      content: "",
    };
    setFiles([...files, newFile]);
    setCurrentFileIndex(files.length);
  };

  const handleTabClick = (index: number) => {
    setCurrentFileIndex(index);
    setIsRenaming(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedFiles = [...files];
    updatedFiles[index].name = e.target.value;
    setFiles(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (index === currentFileIndex) {
      setCurrentFileIndex(index > 0 ? index - 1 : 0);
    } else if (index < currentFileIndex) {
      setCurrentFileIndex(currentFileIndex - 1);
    }
    setIsRenaming(false);
  };

  const startEditing = (index: number) => {
    setIsRenaming(true);
    setNewFileName(files[index].name);
  };

  const handleRenameClick = () => {
    startEditing(currentFileIndex);
  };

  const handleRenameSubmit = () => {
    const updatedFiles = [...files];
    updatedFiles[currentFileIndex].name = newFileName;
    setFiles(updatedFiles);
    setIsRenaming(false);
  };

  // Open File Dialog
  const handleOpenFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const inputFiles = event.target.files;
    if (!inputFiles) return;
    const file = inputFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e){
        const content = e?.target?.result as string;
        const newFile = {
          id: files.length + 1,
          name: file.name,
          content: content,
        };
        setFiles([...files, newFile]);
        setCurrentFileIndex(files.length);
        }
        else{
          console.log("Object empty")
          return ;
        }
      };
      reader.readAsText(file);
    }
  };

  // Save File
  const handleSaveFile = () => {
    const currentFile = files[currentFileIndex];
    const blob = new Blob([currentFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = currentFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Save As
  const handleSaveAs = () => {
    const newName = prompt("Enter a new name for the file:");
    if (newName) {
      const currentFile = files[currentFileIndex];
      const blob = new Blob([currentFile.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = newName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Share
  const handleShare = () => {
    navigator.clipboard.writeText(files[currentFileIndex].content).then(() => {
      alert("File content copied to clipboard!");
    });
  };

  // Exit
  const handleExit = () => {
    alert("Exiting the application...");
  };

  // Undo
  const handleUndo = () => {
    alert("Undo action is not implemented yet.");
  };

  // Redo
  const handleRedo = () => {
    alert("Redo action is not implemented yet.");
  };

  // Cut
  const handleCut = () => {
    const content = files[currentFileIndex].content;
    setClipboard(content);
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles[currentFileIndex].content = "";
      return updatedFiles;
    });
    alert("Cut action performed.");
  };

  // Copy
  const handleCopy = () => {
    const content = files[currentFileIndex].content;
    setClipboard(content);
    alert("Content copied to clipboard.");
  };

  // Paste
  const handlePaste = () => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles[currentFileIndex].content += clipboard;
      return updatedFiles;
    });
    alert("Pasted from clipboard.");
  };

  // Toggle Full Screen
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  // Preview
  const handlePreview = () => {
    alert(`Preview of "${files[currentFileIndex].name}":\n\n${files[currentFileIndex].content}`);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="menu">
          <li className="menu-item">
            File
            <ul className="dropdown">
              <li onClick={addNewFile}>New File</li>
              <li>
                <input type="file" onChange={handleOpenFile} style={{ display: "none" }} id="file-input" />
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>Open File</label>
              </li>
              <li onClick={handleSaveFile}>Save</li>
              <li onClick={handleSaveAs}>Save As</li>
              <li onClick={handleShare}>Share</li>
              <li onClick={handleExit}>Exit</li>
              <li onClick={handleRenameClick}>Rename</li>
              <li onClick={() => window.open(window.location.href)}>New Window</li>
            </ul>
          </li>
          <li className="menu-item">
            Edit
            <ul className="dropdown">
              <li onClick={handleUndo}>Undo</li>
              <li onClick={handleRedo}>Redo</li>
              <li onClick={handleCut}>Cut</li>
              <li onClick={handleCopy}>Copy</li>
              <li onClick={handlePaste}>Paste</li>
            </ul>
          </li>
          <li className="menu-item">
            View
            <ul className="dropdown">
              <li onClick={handlePreview}>Preview</li>
              <li onClick={toggleFullScreen}>{isFullScreen ? "Exit Full Screen" : "Full Screen"}</li>
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
      <div className="file-tab-bar">
        {files.map((file, index) => (
          <div
            key={file.id}
            className={`file-tab ${index === currentFileIndex ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {isRenaming && index === currentFileIndex ? (
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit();
                }}
                autoFocus
              />
            ) : (
              <span>{file.name}</span>
            )}
            <button  style={{
    background: 'transparent',
    border: '0px',
    marginBottom: '2px',
    color: '#fff',
    cursor: 'pointer' // Added cursor style to indicate the button is clickable
  }} onClick={() => removeFile(index)}>x</button>
          </div>
        ))}
      </div>
      <TextEditor
      // ... other props and state
        content={files[currentFileIndex]?.content}
        onChange={(newContent) => {
          const updatedFiles = [...files];
          updatedFiles[currentFileIndex].content = newContent;
          setFiles(updatedFiles);
        }}
      />
    </>
  );
}

export default App;
