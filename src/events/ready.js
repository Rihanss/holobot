module.exports = async client => {
  var clientonmessage = `-----------------Bot's commands logs------------------`
  console.log(clientonmessage);
  
  const activities = require('../../src/assets/json/status');
  //client.user.setActivity(`Initializing Shard ${client.shard.id}/${client.shard.count}`)
  
  client.setInterval(() => {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(`z-help | ${activity.text}`, {type: activity.type});
  }, 10000);

      /*  client.setInterval(() => {
  	for(const guild of client.guilds.array()){
	  	const channel = guild.channels.filter(x => x.name === 'neko-present' || x.name === 'bot-spam').first();
	  	if(!channel) continue;
		client.commands.get('neko').getNeko(channel, 'Hourly Neko Present');
  	}
  }, 3600000); */
};