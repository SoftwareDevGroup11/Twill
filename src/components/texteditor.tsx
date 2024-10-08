import { GBuffer } from '../texteditor/gbuffer';
import './texteditor.css';
import React, { useEffect, useRef, useState } from 'react';

const TextEditor: React.FC = () => {
    const gBuff = new GBuffer();
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [cursorPosition, setCursorPosition] = useState<number>(0);

    useEffect(() => {
        gBuff.insertText("Hello World");
        updateEditor();
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    function handleInput(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Backspace") {
            gBuff.backspace(); 
        } else if (event.key.length === 1) {
            gBuff.insertText(event.key); 
        } else if (event.key === "ArrowLeft") {
            gBuff.moveCursorLeftBy(1); 
            setCursorPosition(prev => Math.max(prev - 1, 0)); 
        } else if (event.key === "ArrowRight") {
            gBuff.moveCursorRightBy(1); 
            setCursorPosition(prev => Math.min(prev + 1, gBuff.right)); 
        }

        
        event.preventDefault();
        updateEditor();
    }

    const updateEditor = () => {
        if (editorRef.current) {
            editorRef.current.innerHTML = gBuff.dump();
        }
    }

    return (
        <div 
            id="editor" 
            tabIndex={0} 
            onKeyDown={handleInput} 
            ref={editorRef} 
            style={{ position: 'relative' }} 
        >
            <p>{gBuff.dump()}</p>
            <div 
                id="editor-cursor" 
                style={{ 
                    position: 'absolute', 
                    left: `${cursorPosition * 10}px`, 
                    top: '0',
                    height: '1em', 
                    width: '2px', 
                    backgroundColor: 'black'
                }} 
            />
        </div>
    );
}

export default TextEditor;
