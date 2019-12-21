import { Subject, BehaviorSubject, Observable } from 'rxjs';
import '@gossie/array-pipe';
import BlockModel from './block-model';
import TransactionModel from './transaction-model';
import { Operator, TerminalOperator, OperatorResult } from '@gossie/array-pipe/operators';
import { createHash } from 'crypto';

export default class BlockchainModel {

    public static readonly PROOF_OF_WORK_CONSTRAINT = '00';

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
        console.debug('blockchain received a new proof of work', proofOfWork);
        const newBlock = new BlockModel(this._openTransactions.splice(0, 10), this.top.hash, proofOfWork);
        console.debug('blockchain created a new block', newBlock);
        this._blocks.push(newBlock);

        const blockchainConsistent: boolean = this._blocks.pipe(
            everyReduce((b1: BlockModel, b2: BlockModel) => this.checkBlocks(b1, b2))
        )
        console.debug('blockchain was checked for consistency', blockchainConsistent);

        if (blockchainConsistent) {
            console.debug('blockchain propagates block');
            this._blockSubject.next(newBlock);
        } else {
            console.debug('blockchain removes block');
            this._blocks.pop();
        }
    }

    private checkBlocks(block1: BlockModel, block2: BlockModel): boolean {
        return createHash('sha256')
            .update(`${block1.proofOfWork}${block2.proofOfWork}${block1.hash}`)
            .digest('hex')
            .startsWith(BlockchainModel.PROOF_OF_WORK_CONSTRAINT);
    }
}


interface BiFunction<A, B, C> {
    (a: A, b: B): C;
};


class EveryReduceOperator extends TerminalOperator<BlockModel, boolean> {

    private _lastBlock: BlockModel;

    constructor(private reducer: BiFunction<BlockModel, BlockModel, boolean>) {
        super();
    }

    public getFallbackValue(): boolean {
        return true;
    }

    public perform(from: BlockModel): OperatorResult<boolean> {
        if (this._lastBlock) {
            const reducerResult: boolean = this.reducer(this._lastBlock, from);
            const operatorResult: OperatorResult<boolean> =  {
                value: reducerResult,
                done: !reducerResult
            };
            this._lastBlock = from;
            return operatorResult;
        } else {
            this._lastBlock = from;
            return {
                value: false,
                done: false
            };
        }
    }

}


function everyReduce(reducer: BiFunction<BlockModel, BlockModel, boolean>): Operator<BlockModel, boolean> {
    return new EveryReduceOperator(reducer);
}