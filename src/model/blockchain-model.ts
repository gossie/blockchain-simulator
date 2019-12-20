import { Subject, BehaviorSubject, Observable } from 'rxjs';
import BlockModel from './block-model';
import TransactionModel from './transaction-model';

export default class BlockchainModel {

    private _blockSubject: Subject<BlockModel>;
    private _blocks: Array<BlockModel> = [];
    private _openTransactions: Array<TransactionModel> = [];

    constructor() {
        const genesis: BlockModel = new BlockModel([], '', 123);
        this._blocks.push(genesis);
        this._blockSubject = new BehaviorSubject(genesis);
    }

    public observeNewBlock(): Observable<BlockModel> {
        return this._blockSubject.asObservable();
    }

    public get top(): BlockModel {
        return this._blocks[this._blocks.length - 1];
    }

    public get blocks(): Array<BlockModel> {
        return this._blocks;
    }

    public get openTransactions(): Array<TransactionModel> {
        return this._openTransactions;
    }

    public addOpenTransaction(transaction: TransactionModel): void {
        this._openTransactions.push(transaction);
    }

    public addBlock(proofOfWork: number): void {
        const newBlock = new BlockModel(this._openTransactions, this.top.hash, proofOfWork);
        // TODO: check the blockchain
        this._blocks.push(newBlock);
        this._openTransactions = [];
        this._blockSubject.next(newBlock);
    }
}