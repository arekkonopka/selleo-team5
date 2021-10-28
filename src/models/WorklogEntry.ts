export interface WorklogEntry {
    _id: string;
    name: string;
    startTime: string;
    endTime: string;
    tag: {
        name: string;
        tagBundle: {
            name: string;
        };
    };
}
