import { LispTerm } from "types";

export default class LinkedList {

    car: LispTerm = null;
    cdr: LinkedList|null = null;

    constructor(arr?: Array<LispTerm>) {
        if(arr != null) {

            // car
            let arr0 = arr[0];
            this.car = Array.isArray(arr0) 
                ? new LinkedList(arr0) 
                : arr0;

            // cdr
            if(arr.length > 1) {
                this.cdr = new LinkedList(arr.slice(1));
            } else {
                this.cdr = null;
            }
        }
    }

    clone = () => {
        let l = new LinkedList();
        l.car = this.car;
        l.cdr = this.cdr ? this.cdr.clone() : null;
        return l;
    }

    toArray = () =>
        this.cdr == null
            ? [ this.car ]
            : [ this.car ].concat(this.cdr.toArray())

    listLength = () => 
        1 + (this.cdr ? this.cdr.listLength() : 0)

    last = (length: number = 1) => 
        this.listLength() <= length
            ? this
            : (this.cdr as LinkedList).last(length - 1)

    cons = (other: LinkedList) => {
        let c = this.clone();
        let o = other.clone();
        c.last().cdr = o;
        return c;
    }
}