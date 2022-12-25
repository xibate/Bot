const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === '!poll') {
    // Create the poll
    const poll = new Discord.MessageEmbed()
      .setTitle('Poll')
      .setDescription('This is a poll')
      .addField('Option 1', '1️⃣')
      .addField('Option 2', '2️⃣')
      .addField('Option 3', '3️⃣');

    // Send the poll
    message.channel.send(poll).then(sentMessage => {
      // Add the reaction collector
      const filter = (reaction, user) => {
        return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id !== client.user.id;
      };
      const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
      collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
      collector.on('end', collected => console.log(`Collected ${collected.size} items`));

      // Add the reactions
      ['1️⃣', '2️⃣', '3️⃣'].forEach(emoji => sentMessage.react(emoji));
    });
  }
});

client.login('MTA1NjY2MTU5MTU3MzE0MzYwMw.G4UsBh.wPyY-wIbO0zMQZX3E1WSE77HOrlgNncyFVBfZ4');
