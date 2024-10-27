import { FileOBJ } from '../src/texteditor/fileobj';
import { expect, test } from 'vitest';
import Parser from 'tree-sitter';
import Cpp from 'tree-sitter-cpp';

import themes from '../themes/colors.json';

test('Treesitter Basic Parsing', () => {
    let file = new FileOBJ();

    // console.log(Cpp);

    let source_code = '#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n}';
    file.parse(source_code);

    const parser = new Parser();
    parser.setLanguage(Cpp);

    function offset(index: number, pos?: Parser.Point): string | null {
	index; // unused
	if (!pos) return null;

	let line = file.lines[pos.row];
	// console.log(`Row: ${pos.row} Col: ${pos.column}`);

	if (line) {
	    let sliced = line.dump().slice(pos.column) + '\n';
	    // console.log(sliced);
	    return sliced;
	}

	return null;
    }

    let aTree = parser.parse(offset);

    function DFS(node: Parser.SyntaxNode, depth: number = 0) : undefined {

	// console.log("  ".repeat(depth) + `${node.typeId} =) ${node.isNamed ? "Named" : "Unnamed"} ${node.type}`);
	// console.log("  ".repeat(depth) + node.type);

	for (let child of node.children) {
	    DFS(child, depth + 1);
	}

    }

    DFS(aTree.rootNode);
    // console.log(aTree.rootNode.child(0));
});
