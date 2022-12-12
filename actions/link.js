const {hyperlink} = require('discord.js')

const createLink = async (interaction) => {
    // Get the data entered by the user
	const link = interaction.fields.getTextInputValue('linkInput');
	const note = interaction.fields.getTextInputValue('noteInput');
	const tags = interaction.fields.getTextInputValue('tagsInput');
    const tagsToArray = tags !== '' ? tags.split(',') : [];
	console.log({ link, note, tags, tagsToArray });

    await interaction.reply(`Your ${hyperlink('link', 'https://discord.js.org/')} has been submited!`);
}

module.exports = { createLink }