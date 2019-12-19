class Transaction {
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

class Block {
    constructor(private _proofOfWork: number,
                private _transactions: Array<Transaction>) {}
}

export default class BlockchainModel {

    private _blockchain: Array<Block> = [];

    constructor() {
        this._blockchain.push(new Block(123, []));
    }
}