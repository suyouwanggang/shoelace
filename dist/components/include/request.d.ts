interface IncludeFile {
    ok: boolean;
    status: number;
    html: string;
}
export declare const requestInclude: (src: string, mode?: 'cors' | 'no-cors' | 'same-origin') => Promise<IncludeFile>;
export {};
//# sourceMappingURL=request.d.ts.map