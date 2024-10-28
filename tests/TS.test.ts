import { FileOBJ } from '../src/texteditor/fileobj';
import { expect, test } from 'vitest';

import Parser from 'web-tree-sitter';

import themes from '../themes/colors.json';

test('Treesitter Basic Parsing', () => {
    let file = new FileOBJ();

    // console.log(Cpp);

    let source_code = '#include <iostream>\n\nint main() {\n    std::cout << \"Hello World\" << std::endl;\n}';
    file.parse(source_code);

    console.log(10);

    Parser.init().then(async () => {
	console.log(10);
	const parser = new Parser();

	const Cpp = await Parser.Language.load('./tree-sitter-cpp.wasm');

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
	let theme = themes["gruvbox_dark"];
	let colors_count = Object.keys(theme).length - 2;
	console.log(colors_count);

	function DFS(node: Parser.SyntaxNode, depth: number = 0) : undefined {

	    let color : string;
	    if (node.isNamed) {
		let colorIndex = node.typeId % colors_count ;
		let color_key = Object.keys(theme)[colorIndex];

		color = theme[color_key];
	    } else {
		color = theme[theme["fg"]];
	    }

	    console.log("  ".repeat(depth) + `${node.type} + ${color} ++ ${node.text}`);

	    // console.log("  ".repeat(depth) + `${node.typeId} =) ${node.isNamed ? "Named" : "Unnamed"} ${node.type}`);
	    // console.log("  ".repeat(depth) + node.type);


	    for (let child of node.children) {
		DFS(child, depth + 1);
	    }

	}

	DFS(aTree.rootNode);
	expect(0).toBe(1);
	// console.log(aTree.rootNode.child(0));
	//
    }).catch((e) => {
	console.error("Failed to initialize parser:", e);
    });
});
