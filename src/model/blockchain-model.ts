import TransactionModel from './transaction-model';

class BlockModel {
    constructor(private _proofOfWork: number,
                private _transactions: Array<TransactionModel>) {}
}

export default class BlockchainModel {

    private _blockchain: Array<BlockModel> = [];

    constructor() {
        this._blockchain.push(new BlockModel(123, []));
    }
}