const { SlashCommandBuilder, userMention } = require('discord.js');
const { handleError } = require('../helpers');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bind')
		.setDescription('Bind your discord account to nitiplink account!')
		.addStringOption(option =>
			option.setName('token')
				.setDescription('Enter token from your account.')),
	async execute(interaction) {
		const token = interaction.options.getString('token')
		if (token !== null) {
			await axios.post(process.env.API_BASE_URL + '/bind-account', {
				token: token,
				user_id: interaction.user.id,
			}, {
				headers: {
					'Bot-Key': process.env.NITIPLINK_KEY
				}
			})
				.then(async function (response) {
					await interaction.reply(`hey ${userMention(interaction.user.id)}, ${response.data.message}`);
					setTimeout(() => interaction.deleteReply(), 5000);
				})
				.catch(async (error) => await handleError(error, interaction))
		} else {
			// await interaction.reply('Hi! ' + interaction.user.username + '#' + interaction.user.discriminator + ', `ID: ' + interaction.user.id + '`');
			await interaction.reply(`hey ${userMention(interaction.user.id)}, please insert token!`);
			setTimeout(() => interaction.deleteReply(), 5000);
		}
	},
};