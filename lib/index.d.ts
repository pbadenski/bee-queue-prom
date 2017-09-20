export interface Options {
    queue: any;
    promClient?: any;
    labels?: string[];
    interval?: number;
}
export declare function init(opts: Options): {
    run: () => void;
    stop: () => void;
};
