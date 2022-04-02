const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with a nice help message!'),
    
	async execute(interaction) { 
        interaction.client.on('interactionCreate', interaction => { 
            
        })
    }
} 