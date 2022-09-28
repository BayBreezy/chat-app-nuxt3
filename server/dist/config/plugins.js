"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = ({ env }) => ({
    transformer: {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        },
    },
    // Socket io config
    io: {
        enabled: true,
        config: {
            IOServerOptions: {
                cors: { origin: "http://localhost:5000", methods: ["GET"] },
            },
            contentTypes: {},
            events: [
                {
                    name: "connection",
                    handler: ({ strapi }, socket) => {
                        strapi.log.info(`[io] new connection with id ${socket.id}`);
                        //Listen for say hi
                        socket.on("say hi", (data) => {
                            console.log("Hey");
                            console.log(data);
                            strapi.$io.raw("send hi", "Love from Strapi");
                        });
                    },
                },
            ],
        },
    },
    //fuzzy search
    "fuzzy-search": {
        enabled: true,
        config: {
            contentTypes: [
                {
                    uid: "api::message.message",
                    modelName: "message",
                    fuzzysortOptions: {
                        characterLimit: 300,
                        threshold: -600,
                        limit: 20,
                        keys: [
                            {
                                name: "message",
                                weight: 100,
                            },
                        ],
                    },
                },
                {
                    uid: "api::chatroom.chatroom",
                    modelName: "chatroom",
                    fuzzysortOptions: {
                        characterLimit: 500,
                        keys: [
                            {
                                name: "name",
                                weight: 100,
                            },
                        ],
                    },
                },
            ],
        },
    },
});
