module.exports = ({ env }) => ({
  // Transform data
  transformer: {
    enabled: true,
    config: {
      prefix: "/api/",
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },

  // Socket IO config
  io: {
    enabled: true,
    config: {
      /**@type {import('socket.io').ServerOptions} */
      IOServerOptions: {
        cors: { origin: env("CLIENT_URLS", "http://localhost:3000") },
      },
      contentTypes: {},
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
            socket.on("say hi", (data) => {
              console.log(data);
              // send response to everyone connected to the server
              strapi.$io.raw(
                "hi was sent",
                `Someone sent a HI with ID ${socket.id}`
              );

              // send to this person only that sent the message
              strapi.$io.raw("thank you", `Thanks for reaching out ✨.`, {
                room: socket.id,
              });
            });
          },
        },
      ],
    },
  },
  // Fuzzy Search
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
            limit: 10,
            keys: [
              {
                name: "message",
                weight: 100,
              },
            ],
          },
        },
      ],
    },
  },
});
