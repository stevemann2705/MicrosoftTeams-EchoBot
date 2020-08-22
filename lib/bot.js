"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoBot = void 0;
const botbuilder_1 = require("botbuilder");
class EchoBot extends botbuilder_1.ActivityHandler {
    constructor(conversationReferences) {
        super();
        this.conversationReferences = conversationReferences;
        this.onConversationUpdate((context, next) => __awaiter(this, void 0, void 0, function* () {
            this.addConversationReference(context.activity);
            yield next();
        }));
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            const replyText = `Echo: ${context.activity.text}`;
            yield context.sendActivity(botbuilder_1.MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            yield next();
        }));
        this.onMembersAdded((context, next) => __awaiter(this, void 0, void 0, function* () {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    yield context.sendActivity(botbuilder_1.MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            yield next();
        }));
    }
    addConversationReference(activity) {
        const conversationReference = botbuilder_1.TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
}
exports.EchoBot = EchoBot;
//# sourceMappingURL=bot.js.map