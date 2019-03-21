
export const last 
    : <T>(arr: Array<T>) => T|void
    = (arr) => arr[arr.length - 1]

export const given
    : <T,R>(val: T|null|void, lam: (v: T) => R) => R|null|void
    = (val, lam) => val == null ? val : lam(val)

