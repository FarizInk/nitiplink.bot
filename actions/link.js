const {hyperlink, userMention} = require('discord.js')
const axios = require('axios').default;

const createLink = async (interaction) => {
    // Get the data entered by the user
	const link = interaction.fields.getTextInputValue('linkInput');
	const note = interaction.fields.getTextInputValue('noteInput');
	const tags = interaction.fields.getTextInputValue('tagsInput');
    const tagsToArray = tags !== '' ? tags.split(',') : [];
	const community = interaction.customId.split('|')[1];
	console.log({ community, link, note, tags, tagsToArray });

	await axios.post(process.env.API_BASE_URL + '/create-link', {
		url: link,
		note: note,
		tags: tagsToArray,
		prefix: community,
		user_id: interaction.user.id,
	}, {
		headers: {
			'Bot-Key': process.env.NITIPLINK_KEY
		}
	})
		.then(async function (response) {
			await interaction.reply(`hey ${userMention(interaction.user.id)}, Your ${hyperlink('link', response.data.payload)} has been submited!`);
			setTimeout(() => interaction.deleteReply(), 5000);
		})
		.catch(async () => await handleError(error, interaction))
}

module.exports = { createLink }