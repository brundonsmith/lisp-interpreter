
import LinkedList from './utils/LinkedList';
import { parse } from './parse';
import { LispTerm } from 'types';

const baseEnvironment = {

    '+': (...nums: Array<number>) => nums.reduce((total, n) => total + n, 0),
    '*': (...nums: Array<number>) => nums.reduce((total, n) => total * n, 1),

    '-': (...nums: Array<number>) => 
        nums.length === 0 ? 
            0
        : nums.length === 1 ?
            -1 * nums[0]
        : 
            nums.slice(1).reduce((total, n) => total - n, nums[0]),

    '/': (...nums: Array<number>) => 
        nums.length === 0 ?
            1
        : nums.length === 1 ?
            1 / nums[0]
        :
            nums.slice(1).reduce((total, n) => total / n, nums[0]),


    'list': (...args: Array<LispTerm>) => new LinkedList(args),
    'car': (l: LinkedList) => l.car,
    'cdr': (l: LinkedList) => l.cdr,
    'cons': (a: LinkedList, b: LinkedList) => a.cons(b),

    'if': (test: LispTerm, then: LispTerm, el?: LispTerm) =>
        baseEnvironment['eval'](test)
            ? baseEnvironment['eval'](then)
            : el == null ? null : baseEnvironment['eval'](then),

    'eval': (exp: LispTerm): LispTerm => {
        if(exp instanceof LinkedList) {
            if(typeof exp.car !== 'string') {
                throw `${exp.car} is not a function name; try using a symbol instead`
            } else {
                return baseEnvironment[exp.car](...exp.toArray().slice(1));
            }
        } else {
            return exp;
        }
    },
}

function read(lisp: string) {
    return baseEnvironment['eval'](parse(lisp));
}

/*

const parseAtom
    : (atom: string) => LispAtom
    = (atom) => {
        if(!isNaN(Number(atom))) {
            return Number(atom);
        } else if(atom.match(/^".*"$/)) {
            return atom //JSON.parse(atom) as string;
        } else if(atom.toUpperCase() === 'NIL') {
            return null;
        } else {
            return atom;
        }
    }

*/

console.log('--- OUTPUT ---')

// @ts-ignore
console.log(read(`(list 1 2 3)`).toArray())