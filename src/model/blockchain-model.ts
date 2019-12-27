import { Subject, BehaviorSubject, Observable } from 'rxjs';
import '@gossie/array-pipe';
import BlockModel from './block-model';
import TransactionModel from './transaction-model';
import { Operator, TerminalOperator, OperatorResult } from '@gossie/array-pipe/operators';
import { createHash } from 'crypto';

export default class BlockchainModel {

    public static readonly PROOF_OF_WORK_CONSTRAINT = '00';
    private static readonly MAX_BLOCK_SIZE = 5;

    private _blockSubject: Subject<BlockModel>;
    private _blocks: Array<BlockModel> = [];
    private _openTransactions: Array<TransactionModel> = [];

    constructor() {
        const genesis = new BlockModel([], '', 123);
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
        const newBlock = new BlockModel(this._openTransactions.splice(0, BlockchainModel.MAX_BLOCK_SIZE), this.top.hash, proofOfWork);
        this._blocks.push(newBlock);

        const blockchainConsistent: boolean = this._blocks.pipe(
            everyReduce((b1: BlockModel, b2: BlockModel) => this.checkBlocks(b1, b2))
        )

        if (blockchainConsistent) {
            window.setTimeout(() => this._blockSubject.next(newBlock), 5000);
        } else {
            const falseBlock = this._blocks.pop();
            if (falseBlock) {
                this._openTransactions.unshift(falseBlock.transactions[0], falseBlock.transactions[1], falseBlock.transactions[2], falseBlock.transactions[3], falseBlock.transactions[4])
                throw new Error(`Block was not added. Proof of work ${proofOfWork} does not fullfill constraint.`);
            }
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

    private _lastBlock: BlockModel | undefined = undefined;

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
