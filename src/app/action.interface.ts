import { BehaviorSubject } from "rxjs";

export interface ChartAction {
    type: string;
    payload?: any;
}

export declare class Dispatcher extends BehaviorSubject<ChartAction> {
    static INIT: string;
    constructor();
    dispatch(action: ChartAction): void;
    complete(): void;
}