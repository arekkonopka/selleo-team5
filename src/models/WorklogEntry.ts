export interface WorklogEntry {
    _id: string;
    name: string;
    startTime: string;
    endTime: string;
    date: string;
    tag: {
        _id: string;
        name: string;
        tagBundle: {
            _id: string;
            name: string;
        };
    };
}
