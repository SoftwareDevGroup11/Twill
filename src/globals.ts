import Parser from 'web-tree-sitter';

export const MAX_GBUFFER_LENGTH = 1024;
export const MAX_ACTIONS_RECORDED = 100;
export const GBUFFER_DUMMY_CHAR = '*';
export const FONT_SIZE = 20;

export type CursorPos = [number, number];

export const LanguagesPath : Record<string, string> = {
    cpp: "tree-sitter-cpp.wasm",
    c: "tree-sitter-c.wasm",
    js: "tree-sitter-javascript.wasm",
    json: "tree-sitter-json.wasm",
    py: "tree-sitter-python.wasm"
};

export let Languages : Record<string, Parser.Language> = {};

export const Colors : Record<string, string> = {
    "red": "#FB4934",
    "green": "#B8BB26",
    "yellow": "#FABD2F",
    "blue": "#83A598",
    "purple": "#D3869B",
    "gray": "#A89984",

    "fg": "#EBDBB2", 
    "bg": "#1D2021"
};

export function assert(condition : boolean, msg? : string) : asserts condition is true {
    if (!condition) {
	throw new Error(msg);
    }
}
