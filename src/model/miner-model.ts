import BlockchainModel from "./blockchain-model";
import { createHash } from "crypto";
import BlockModel from './block-model';
import { Subscription, interval, Subject, Observable } from "rxjs";

export default class MinerModel {

    private static readonly MINING_TIMEOUT = 500;

    private _proofOfWorkSubject: Subject<string> = new Subject();
    private _subscriptions: Array<Subscription> = [];
    private _top: BlockModel;
    private _proofOfWork = 0;

    constructor(private  _blockchain: BlockchainModel) {
        this._subscriptions.push(_blockchain.observeNewBlock()
            .subscribe((block: BlockModel) => {
                this._top = block;
                this._proofOfWork = 0;
            }));

        this._subscriptions.push(interval(MinerModel.MINING_TIMEOUT)
            .subscribe(() => this.mine()));
    }

    public observeProofOfWorkSearch(): Observable<string> {
        return this._proofOfWorkSubject.asObservable();
    }

    private mine(): void {
        this._proofOfWorkSubject.next(`Currently checking ${this._proofOfWork}`);

        const aHash: string = createHash('sha256')
            .update(`${this._top.proofOfWork}${this._proofOfWork}`)
            .digest('hex');
        if (aHash.startsWith('0')) {
            this._proofOfWorkSubject.next(`Wohoo! ${this._proofOfWork} worked. I am creating a new block.`);
            this._blockchain.addBlock(this._proofOfWork);
        } else {
            ++this._proofOfWork;
        }
    }

}