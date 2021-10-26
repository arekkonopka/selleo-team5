export interface Entry {
  id: string;
  name: string;
  startTime: string;
  tag: {
    name: string;
    tagBundle: {
      name: string;
    };
  };
}
