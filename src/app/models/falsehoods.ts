import { Severity } from './Severity';
import { MediaOutlet } from './mediaOutlet';
import { CommonLie } from './commonLie';
import { PublicFigure } from './publicFigure';

export class FalsehoodSearchObject
{
    terms: String;
    to: Date;
    from: Date;
    outlet: MediaOutlet;
    minimum: Severity;
    maximum: Severity;
    author: PublicFigure;
    numberOfEntries:number;
    page: number;
};

export class Falsehood {
    id: Number;
    outlet: MediaOutlet;
    commonLie: CommonLie;
    status: Number;
    mediaType: Number;
    severity: Number;
    author1: PublicFigure;
    author2: PublicFigure;
    dateMade: Date;
    contentId: String;
};

export class FullFalsehood {
    contents: String;
    metadata: Falsehood;
    keywords: String;
};