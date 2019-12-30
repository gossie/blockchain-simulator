import BlockchainModel from "./blockchain-model";
import { createHash } from "crypto";
import BlockModel from './block-model';
import { Subscription, interval, timer, Subject, Observable } from "rxjs";
import { delayWhen } from 'rxjs/operators';
import { MinerEvent, EventType } from "./miner-event";

export default class MinerModel {

    private static readonly MINING_TIMEOUT = 50;

    private _proofOfWorkSubject: Subject<MinerEvent> = new Subject();
    private _miningSubscription: Subscription | undefined = undefined;
    private _blockSubscription: Subscription;
    private _top: BlockModel;
    private _proofOfWork = 0;
    private _miningIncrementor = 1;
    private _delay = false;
    private _amount = 0;

    constructor(private  _blockchain: BlockchainModel) {
        console.debug('Miner is created');
        this._top = _blockchain.top;
        this._blockSubscription = _blockchain.observeNewBlock()
            .subscribe((block: BlockModel) => {
                this._top = block;
            });
    }

    public get amount(): number {
        return this._amount;
    }

    public observeProofOfWorkSearch(): Observable<MinerEvent> {
        return this._proofOfWorkSubject.asObservable();
    }

    public startMining(): void {
        this._miningSubscription = interval(MinerModel.MINING_TIMEOUT)
            .pipe(
                delayWhen(() => this._delay ? timer(3000) : timer(0))
            )
            .subscribe(() => this.mine());
    }

    public pauseMining(): void {
        this._miningSubscription?.unsubscribe();
    }

    public tearDown(): void {
        if (this._miningSubscription) {
            this._miningSubscription.unsubscribe();
        }
        this._blockSubscription.unsubscribe();
    }

    private mine(): void {
        this._delay = false;
        this._proofOfWorkSubject.next(new MinerEvent(EventType.CheckingBlock, this._proofOfWork));

        const aHash: string = createHash('sha256')
            .update(`${this._top.proofOfWork}${this._proofOfWork}${this._top.hash}`)
            .digest('hex');
        if (aHash.startsWith(BlockchainModel.PROOF_OF_WORK_CONSTRAINT)) {
            try {
                this._blockchain.addBlock(this._proofOfWork);
                this._proofOfWorkSubject.next(new MinerEvent(EventType.BlockCreated));
                this._proofOfWork = 0;
                this._miningIncrementor *= -1;
                ++this._amount;
            } catch (e) {
                this._proofOfWorkSubject.next(new MinerEvent(EventType.BlockRejected));
                this._proofOfWork += this._miningIncrementor;
            }
            this._delay = true;
        } else {
            this._proofOfWork += this._miningIncrementor;
        }
    }

}