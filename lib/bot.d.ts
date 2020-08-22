import { ActivityHandler } from 'botbuilder';
export declare class EchoBot extends ActivityHandler {
    conversationReferences: any;
    constructor(conversationReferences: any);
    addConversationReference(activity: any): void;
}
