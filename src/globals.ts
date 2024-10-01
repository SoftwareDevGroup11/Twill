export const MAX_GBUFFER_LENGTH = 1024;

export function assert(condition : boolean, msg? : string) : asserts condition is true {
    if (!condition) {
	throw new Error(msg);
    }
}
