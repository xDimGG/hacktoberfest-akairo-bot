const { Command } = require('discord-akairo');
const { Attachment } = require('discord.js');

class PersonCommand extends Command {
	constructor() {
		super('person', {
			aliases: ['person'],
			category: 'misc',
		});
	}

	exec(message) {
		return message.channel.send(`https://thispersondoesnotexist.com/image?${Date.now()}`);
	}
}

module.exports = PersonCommand;
