'use strict';
const { MessageEmbed } = require('discord.js');

function getUserFromMention(client, mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if(message.content===null || message.content===undefined) return;
        const content = message.content.toLowerCase().split(/\s+/);
        if ((content[0] === `<@!${message.client.user.id}>` || content[0] === `<@${message.client.user.id}>`) && content[1].toLowerCase()==='help') {
            let commands = '';
            for(const [key, value] of message.client.commands.entries()) {
                commands += `${'`'}${key}${'`'}, `;
            }
            const embed = new MessageEmbed()
                    .setColor('#00FFFF')
                    .setTitle('Help')
                    .setDescription('This is a list of commands that I can do. To invite me to your server you need to have atleast 100 members.\n'+`\n${commands.slice(0, -2)}\n`+'\nJoin Support Server:  [AniFarm Help](https://discord.gg/7ZDqbSSe2k) | [AniFarm](https://discord.gg/wR8uJkT9NT)')
                    .setThumbnail(message.client.user.displayAvatarURL())
                    .setFooter('Made by Bartick#6552')
                    .setTimestamp();
            await message.channel.send({embeds: [embed]});
        }
    }
}