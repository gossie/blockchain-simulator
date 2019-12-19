import TransactionModel from "./transaction-model";
import { createHash } from "crypto";

export default class BlockModel {

    private _hash: string;

    constructor(private _transactions: Array<TransactionModel>,
                private _previousHash: string,
                private _proofOfWork: number) {

        const transactionsAsString: string = _transactions
            .map((transaction: TransactionModel) => `${transaction.from}${transaction.to}${transaction.amount}`)
            .join();

        this._hash = createHash('sha256')
            .update(transactionsAsString)
            .update(`${_previousHash}`)
            .update(`${_proofOfWork}`)
            .digest('hex');
    }


    
    public get transactions(): Array<TransactionModel> {
        return this._transactions;
    }

    public get previousHash(): string {
        return this._previousHash;
    }

    public get hash(): string {
        return this._hash;
    }

    public get proofOfWork(): number {
        return this._proofOfWork;
    }
}
