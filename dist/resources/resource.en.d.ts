declare const resouce: {
    pageBtn: {
        total: (total: number) => string;
        first: string;
        last: string;
        prev: string;
        next: string;
    };
    transferSelectedFun: (selected: number, filterSize: number, _total: number) => string;
    transferSourceTitle: string;
    transferTargetTitle: string;
    seachTransfer: string;
    noData: string;
    date: {
        showHeaderStr: (date: Date, mode: 'year' | 'month' | 'date') => string;
        months: string[];
        weekDays: string[];
    };
};
export default resouce;
//# sourceMappingURL=resource.en.d.ts.map