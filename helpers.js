const {hyperlink, userMention} = require('discord.js')
const axios = require('axios').default;

const handleError = async (err, interaction = null) => {
    if (err.response.data !== undefined && typeof err.response.data.message === 'string') {
        await simpleTagMsg(interaction, err.response.data.message)
    } else {
        console.log(err.response);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}

const simpleTagMsg = async (interaction, msg, duration = 5000) => {
    await interaction.reply(`hey ${userMention(interaction.user.id)}, ${msg}`);
    setTimeout(() => interaction.deleteReply(), duration);
}

module.exports = { handleError,  }