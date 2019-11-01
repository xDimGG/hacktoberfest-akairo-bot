const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class UrlSafeCommand extends Command {
	constructor () {
		super('urlsafe', {
			aliases: ['urlsafe'],
			cooldown: 60000,
			ratelimit: 2,
			args: [
				{
					id: 'url',
					type: 'url',
					prompt: {
						start: 'Enter the url: ',
						retry: 'Hmm, this doesnt seem to be a valid url try again.'
					}
				}
			],
			category: 'util'
		});
	}

	exec (msg, { url }) {
		try {
			const res = await fetch(`https://www.virustotal.com/vtapi/v2/url/report?apikey=${process.env.VIRUSTOTAL_APIKEY}&resource=${url}`);
			const { positive, total } = await res.json();
			msg.reply(positive > 0 ? `${url} is malicious! Detected in ${positive}/${total} scans.` : `${url} is safe!`);
		} catch (err) {
			msg.reply('Could not verify this url. Please try again.');
			this.client.logger.error(err);
		}
	}
}

module.exports = UrlSafeCommand;
