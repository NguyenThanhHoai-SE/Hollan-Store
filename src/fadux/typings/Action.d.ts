export declare interface FaduxAction {
    payload: string[];
    succeed?: (state: any, payload: any) => void;
    failed?: (state: any, payload: any) => void;
    timeout?: (state: any) => void;
    networkError?: (state: any) => void;
}
