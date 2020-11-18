
export class Region {
    constructor() {
        this.id = -1;
        this.name = "";
    }
    id: Number;
    name: String;
}

export class RegionEntry {
    constructor() {
        this.contents = "";
        this.region = new Region();
    }
    region: Region;
    contents: String;
}