import { CommonLie } from './commonLie';
import { Institution } from './institution';
import { PublicFigure } from './publicFigure';
import { Region } from './region';
import { Severity } from './Severity';

export class SearchPublicFalsehood {
    terms: String;
    
    to: Date;
    from: Date;
    regions: Region[];
    institutions: Institution[];
    minimum: Severity;
    maximum: Severity;

    authors: PublicFigure[];
}

export class PublicFalsehood {
    id: Number;
    commonLie: CommonLie;
    status:Number;
    official: PublicFigure;
    officialType: Number;
    region:Region;
    institution: Institution;
    severity: Number;
    dateMade: Date;
}

export class FullPublicFalsehood {
    contents: String;
    metadata: PublicFalsehood;
    keywords: String;
}