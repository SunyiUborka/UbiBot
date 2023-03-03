import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } from 'discord.js'
import  Canvas from 'canvas'

export default {
    data: new SlashCommandBuilder()
        .setName('license')
        .setDescription('Horny license.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption(option => option
            .setName('sex')
            .setDescription('Sex')
            .setRequired(true))
        .addStringOption(option => option
            .setName('class')
            .setDescription('Class')
            .setRequired(true))
        .addStringOption(option => option
            .setName('type')
            .setDescription('Type')
            .setRequired(true))
        .addUserOption(option => option
            .setName('user')
            .setDescription('User')
            .setRequired(false)),
        async execute(interaction) {
            const userName = interaction.options.getUser('user') || interaction.user;
            const userSex = interaction.options.getString('sex');
            const userClass = interaction.options.getString('class');
            const userType = interaction.options.getString('type');

            const canvas = Canvas.createCanvas(1024, 647);
            const context = canvas.getContext('2d');

            context.strokeRect(0, 0, canvas.width, canvas.height);

            const avatar = await Canvas.loadImage(userName.displayAvatarURL({ extension: 'jpg' }));

            const background = await Canvas.loadImage('./commands/background.png');

            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            context.drawImage(avatar, 27, 73, 322, 322);

            context.font = '32px arial';
            context.fillStyle = '#000000';
            context.fillText(userName.username, 487, 322);

            context.font = '32px arial';
            context.fillStyle = '#000000';
            context.fillText(userSex, 456, 384);

            context.font = '32px arial';
            context.fillStyle = '#000000';
            context.fillText(userClass, 496, 445);

            context.font = '32px arial';
            context.fillStyle = '#000000';
            context.fillText(userType, 474, 506);

            const attachment = await new AttachmentBuilder(canvas.toBuffer(), { name: 'horny-license.png' });

            const embed = new EmbedBuilder()
            .setTitle(`Horny license`)
            .setImage('attachment://horny-license.png')
            .setColor('Random');

            await interaction.reply({embeds: [embed], files: [attachment]});
        },
};