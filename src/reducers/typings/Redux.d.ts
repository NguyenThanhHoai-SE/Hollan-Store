export interface Action<T = any> {
    type: T;
    payload: any
}