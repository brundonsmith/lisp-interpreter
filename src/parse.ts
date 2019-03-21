
import { LispToken, LispTerm } from './types';
import { last } from './utils/functions';
import LinkedList from 'utils/LinkedList';

export const parse = (lisp: string): LispTerm => {
    return reify(tokenize(lisp));
}

const reify = (token: LispToken): LispTerm => 
    Array.isArray(token) 
        ? new LinkedList(token.map(reify))
        : token

const tokenize = (lisp: string): LispToken => {
    lisp = lisp.trim();

    if(lisp[0] !== '(') {
        return lisp;
    } else {
        let stack: Array<LispToken> = [];
        let quoting = false;

        for(let i = 0; i < lisp.length; i++) {
            let char = lisp[i];

            if(quoting) {
                if(char === '"') {
                    quoting = false;
                }
                stack[stack.length - 1] += char;
            } else if(!char.match(/[\s()]/)) {
                if(char === '"') {
                    quoting = true;
                }
                if(typeof last(stack) !== 'string') {
                    stack.push('');
                }
                stack[stack.length - 1] += char;
            } else if(char === '(') {
                if(typeof last(stack) === 'string') {
                    let completedTerm = stack.pop() as string;
                    let parent = last(stack);
                    if(Array.isArray(parent)) {
                        parent.push(completedTerm);
                    }
                }

                stack.push([]);
            } else {
                let completedTerm = stack.pop();
                if(completedTerm != null) {
                    let parent = last(stack);
                    if(Array.isArray(parent)) {
                        parent.push(completedTerm);
                    }
                }
            }

            //console.log(stack)
        }

        return stack[0];
    }
}
