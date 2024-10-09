import { FileOBJ } from '../src/texteditor/fileobj';
import { UndoRedoStack } from '../src/texteditor/undoredo';
import { CursorMoveAction } from '../src/texteditor/actions';
import { expect, test } from 'vitest';

test('Checks FileOBJ initialization', () => {
    let file = new FileOBJ();
    file.parse("#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n}");
    expect(file.lines.length).toBe(5);
});

