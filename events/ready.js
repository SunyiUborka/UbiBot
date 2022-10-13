module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Sikeresen elindult ${client.user.tag}!`);
        },
};