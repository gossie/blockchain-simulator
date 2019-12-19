export default class TransactionModel {

    public get from(): string {
        return this._from;
    }

    public get to(): string {
        return this._to;
    }

    public get amount(): string {
        return this._to;
    }

    constructor(private _from: string,
                private _to: string,
                private _amount: number) {}

}
