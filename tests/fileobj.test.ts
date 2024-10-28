import { FileOBJ } from '../src/texteditor/fileobj';
import { expect, test } from 'vitest';

test('Checks FileOBJ initialization', () => {
    let file = new FileOBJ();

    expect(file.name).toBe('');
    expect(file.lines.length).toBe(1);
});

test('Checks FileOBJ gbuffer list construction', () => {
    let file = new FileOBJ();
    file.parse("#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n}");
    expect(file.lines.length).toBe(5);

    // for (let i = 0; i < file.lines.length; i++) {
    //     let gBuff : GBuffer = file.lines[i];
    //     gBuff.print();
    // }
});

test('Checks FileOBJ cursor movement', () => {
    let file = new FileOBJ();
    file.parse("#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n}");
    expect(file.lines.length).toBe(5);

    file.setCursor(2, 5);
    expect(file.getCursor()).toStrictEqual([2, 5]);

    file.moveCursorDownBy(1);
    expect(file.getCursor()).toStrictEqual([3, 5]);

    file.moveCursorUpBy(1);
    expect(file.getCursor()).toStrictEqual([2, 5]);

    file.moveCursorRightBy(3);
    expect(file.getCursor()).toStrictEqual([2, 8]);

    file.moveCursorLeftBy(3);
    expect(file.getCursor()).toStrictEqual([2, 5]);
});
