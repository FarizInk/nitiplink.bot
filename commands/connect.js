const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('Bind your discord account to nitiplink account!')
		.addStringOption(option =>
			option.setName('token')
				.setDescription('Enter token from your account.')),
	async execute(interaction) {
		const token = interaction.options.getString('token')
		if (community !== null) {
			console.log('connect here');
		} else {
			// await interaction.reply('Hi! ' + interaction.user.username + '#' + interaction.user.discriminator + ', `ID: ' + interaction.user.id + '`');

			await interaction.reply(`hey ${userMention(interaction.user.id)} please insert token!`);
			setTimeout(() => interaction.deleteReply(), 5000);
		}
	},
};