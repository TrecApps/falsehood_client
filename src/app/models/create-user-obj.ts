export class CreateUserObj {

    constructor() {
        this.firstName = this.lastName = this.username = this.mainEmail = this.backupEmail = this.password = "";
        this.birthday = new Date();
        this.passwordMonthReset = this.timeForValidToken = this.validTimeFromActivity = this.maxLoginAttempts = this.lockTime = 0;
    }

    firstName: String;
    lastName: String;
    username: String;
    mainEmail: String;
    backupEmail:String;
    password: String;
    birthday: Date;

    passwordMonthReset: Number;
    timeForValidToken: Number;
    validTimeFromActivity: Number;
    maxLoginAttempts: Number;
    lockTime: Number;
}
