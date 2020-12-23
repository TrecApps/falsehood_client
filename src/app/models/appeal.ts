import { Falsehood } from "./falsehoods";
import { PublicFalsehood } from "./publicFalsehood";

export class FalsehoodAppeal {
    id: number;
    falsehood: Falsehood;
    pFalsehood: PublicFalsehood;
    desiredState: String;
}

export class FalsehoodAppealSignature {
    id: number;
    appeal: FalsehoodAppeal;
    verificationString: String;
    grantAnon: number;
}

export class FalsehoodAppealEntry {
    appeal: FalsehoodAppeal;
    reason: String;
}