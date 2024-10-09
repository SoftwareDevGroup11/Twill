import { FileOBJ } from '../src/texteditor/fileobj';
import { GBuffer}  from '../src/texteditor/gbuffer';
import { expect, test } from 'vitest';

test('Checks FileOBJ initialization', () => {
    let file = new FileOBJ();

    expect(file.name).toBe('');
    expect(file.lines.length).toBe(0);
});

test('Checks FileOBJ gbuffer list construction', () => {
    let file = new FileOBJ();
    file.parse("#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n}");
    expect(file.lines.length).toBe(5);

    for (let i = 0; i < file.lines.length; i++) {
	let gBuff : GBuffer = file.lines[i];
	gBuff.print();
    }
});
