import LinkedList from "utils/LinkedList";

export type LispTerm = LinkedList|string|number|null;

export type LispToken = LispTokenList|string;
export interface LispTokenList extends Array<LispToken> { }