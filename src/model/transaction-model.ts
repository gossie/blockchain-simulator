export default class TransactionModel {

    public get from(): string {
        return this._from;
    }

    public get to(): string {
        return this._to;
    }

    public get amount(): number {
        return this._amount;
    }

    constructor(private _from: string,
                private _to: string,
                private _amount: number) {}

}
