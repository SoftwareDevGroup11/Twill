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

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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

  return (
    <>
      <nav className="navbar">
        <ul className="menu">
          <li className="menu-item">
            File
            <ul className="dropdown">
              <li onClick={addNewFile}>New File</li>

              <li>New Window</li>

              <li onClick={handleRenameClick}>Rename</li>

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
                  if (e.key === "Enter") {
                    handleRenameSubmit();
                  }
                }}
              />
            ) : (
              <span onClick={() => startEditing(index)}>{file.name}</span>
            )}
            <span
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(index);
              }}
            >
              x
            </span>
          </div>
        ))}
      </div>
      {files.length > 0 ? (
        <TextEditor
          file={files[currentFileIndex]}
          updateFileContent={(content: string) => {
            const updatedFiles = [...files];
            updatedFiles[currentFileIndex].content = content;
            setFiles(updatedFiles);
          }}
        />
      ) : (
        <div className="no-file">No files open</div>
      )}
    </>
  );
}

export default App;
