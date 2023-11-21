module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [{
                name: "When a bot get mental breakdown"
            }],
            status: "dnd"
        });
        console.log(`Sikeresen elindult ${client.user.tag}!`);
        },
};