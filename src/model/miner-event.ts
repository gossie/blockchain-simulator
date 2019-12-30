export enum EventType {
    CheckingBlock,
    BlockCreated,
    BlockRejected
}

export class MinerEvent {

    constructor(private _eventType: EventType,
                private _payload?: any) {}

    public get eventType(): EventType {
        return this._eventType;
    }

    public get payload(): any {
        return this._payload;
    }

}