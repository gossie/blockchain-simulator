import BlockchainModel from "./blockchain-model";
import { createHash } from "crypto";
import BlockModel from './block-model';
import { Subscription, interval, timer, Subject, Observable } from "rxjs";
import { delayWhen } from 'rxjs/operators';

export default class MinerModel {

    private static readonly MINING_TIMEOUT = 50;

    private _proofOfWorkSubject: Subject<string> = new Subject();
    private _miningSubscription: Subscription | undefined = undefined;
    private _blockSubscription: Subscription;
    private _top: BlockModel;
    private _proofOfWork = 0;

    constructor(private  _blockchain: BlockchainModel) {
        this._top = _blockchain.top;
        this._blockSubscription = _blockchain.observeNewBlock()
            .subscribe((block: BlockModel) => {
                this._top = block;
                this._proofOfWork = 0;
            });
    }

    public observeProofOfWorkSearch(): Observable<string> {
        return this._proofOfWorkSubject.asObservable();
    }

    public startMining(): void {
        this._miningSubscription = interval(MinerModel.MINING_TIMEOUT)
            .pipe(
                delayWhen(() => {
                    if (this._proofOfWork === 0) {
                        return timer(3000);
                    } else {
                        return timer(0);
                    }
                })
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
        this._proofOfWorkSubject.next(`Currently checking ${this._proofOfWork}`);

        const aHash: string = createHash('sha256')
            .update(`${this._top.proofOfWork}${this._proofOfWork}${this._top.hash}`)
            .digest('hex');
        if (aHash.startsWith(BlockchainModel.PROOF_OF_WORK_CONSTRAINT)) {
            this._proofOfWorkSubject.next(`Wohoo! ${this._proofOfWork} worked. I am creating a new block.`);
            this._blockchain.addBlock(this._proofOfWork);
        } else {
            ++this._proofOfWork;
        }
    }

}