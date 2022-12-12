const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, userMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nitip')
		.setDescription('Nitip Link!')
		.addStringOption(option =>
			option.setName('community')
				.setDescription('Enter Community prefix.')),
	async execute(interaction) {
		const community = interaction.options.getString('community')
		if (community !== null) {
			// Create the modal
			const modal = new ModalBuilder()
				.setCustomId('nitiplinkModal')
				.setTitle('Create Link');

			// Add components to modal

			// Create the text input components
			const linkInput = new TextInputBuilder()
				.setCustomId('linkInput')
				// The label is the prompt the user sees for this input
				.setLabel("Link")
				// Short means only a single line of text
				.setStyle(TextInputStyle.Short)
				.setPlaceholder('https://nitiplink.app');

			const noteInput = new TextInputBuilder()
				.setCustomId('noteInput')
				.setLabel("Note")
				// Paragraph means multiple lines of text.
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(false)
				.setPlaceholder('Enter some note here!');

			const tagsInput = new TextInputBuilder()
				.setCustomId('tagsInput')
				// The label is the prompt the user sees for this input
				.setLabel("Tags")
				// Short means only a single line of text
				.setStyle(TextInputStyle.Short)
				.setRequired(false)
				.setPlaceholder('Ex: hacklife,web,frontend');

			// An action row only holds one text input,
			// so you need one action row per text input.
			const firstActionRow = new ActionRowBuilder().addComponents(linkInput);
			const secondActionRow = new ActionRowBuilder().addComponents(noteInput);
			const thirdActionRow = new ActionRowBuilder().addComponents(tagsInput);

			// Add inputs to the modal
			modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

			// Show the modal to the user
			await interaction.showModal(modal);
		} else {
			await interaction.reply(`hey ${userMention(interaction.user.id)} community parameter must be filled!`);
			setTimeout(() => interaction.deleteReply(), 5000);
		}
	},
};