export class Institution {

    constructor() {
        this.id = -1;
        this.name = "";
    }

    id: Number;
    name: String;
}

export class InstitutionEntry {

    constructor() {
        this.contents = "";
        this.institution = new Institution();
    }

    institution: Institution;
    contents: String;
}