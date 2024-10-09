export const MAX_GBUFFER_LENGTH = 1024;
export const MAX_ACTIONS_RECORDED = 100;
export const GBUFFER_DUMMY_CHAR = '*';


export type CursorPos = [number, number];

export function assert(condition : boolean, msg? : string) : asserts condition is true {
    if (!condition) {
	throw new Error(msg);
    }
}
