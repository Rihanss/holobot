const kitsu = require("node-kitsu");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, msg, args, color) => {
  if(!args.length) return msg.channel.send('You need to tell me what anime to look for.');
  const embed = new MessageEmbed();
  const result = await kitsu.searchAnime(args.join(' ').replace(/ ,/g, ' '), 0);
  if(!result.length) return msg.channel.send('No result found!');
	embed.setTitle('Multiple Manga Found!');
	embed.setDescription(`${result.map((x, i) => `**${i+1}.** ${x.attributes.canonicalTitle}`).join('\n')}\n\n**Please enter the number of the Anime you want to view**\n**Or type** \`cancel\` **to cancel the command**`);
	embed.setColor('RANDOM');
	const messToDel = await msg.channel.send(embed);
	try {
		const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 30000 });
		messToDel.delete();
		if(!response.size) return undefined;
		let choice = response.first().content.toLowerCase();
		if(choice === 'cancel') return msg.channel.send('Command canceled.');
		if(isNaN(choice)) return msg.channel.send('This is not a valid number, please try again.');
		choice = parseInt(choice, 10) -1;
		const atts = result[choice].attributes;
		embed.setTitle(atts.canonicalTitle);
    	embed.setURL(`https://kitsu.io/anime/${result[choice].id}`)
		embed.setDescription(atts.synopsis)
		if (atts.posterImage) embed.setThumbnail(atts.posterImage.medium);
		if (atts.coverImage) embed.setImage(atts.coverImage.large);
		if (atts.titles.en) embed.addField("**__English title__**", atts.titles.en, true);
		if(atts.titles.ja_jp) embed.addField("**__Japanese Title__**", atts.titles.ja_jp, true);
		if(atts.abbreviatedTitles && atts.abbreviatedTitles.length > 0) embed.addField("**__Synonyms__**", atts.abbreviatedTitles, true);
		if(atts.episodeCount && atts.episodeLength) embed.addField("**__Episodes__**", atts.episodeCount + " @ " + atts.episodeLength + " minutes", true);
		else if(atts.episodeCount) embed.addField("Episodes", atts.episodeCount, true)
		embed.addField("**__Type__**", atts.showType, true);
		embed.addField("**__Status__**", toPlural(atts.status), true);
		if(atts.ageRating) embed.addField("Age Restrictions", atts.ageRating + " " + atts.ageRatingGuide, true);
		embed.addField("**__Popularity Rank__**", "#"+atts.popularityRank, true);
		if(atts.averageRating){
			embed.addField("**__Rating Rank__**", "#"+atts.ratingRank, true);
			embed.addField("**__Rating__**", atts.averageRating, true);
		}
      // embed.addField("External Link", `[${atts.canonicalTitle}]()`, true)
		if(atts.startDate && atts.endDate) embed.setFooter(atts.startDate + " to " + atts.endDate)
		else if(atts.startDate && !atts.endDate) embed.setFooter(atts.startDate)
		else embed.setFooter(atts.tba);
		return msg.channel.send(embed);
	} catch(e){
		console.error(e);
	}
}

function toPlural (str){
    let arr = str.toLowerCase().split('');
    arr[0] = arr[0].toUpperCase();
      return arr.join('');
  }

  exports.conf = {
    aliases: [],
    cooldown: 1
  };
  
  exports.help = {
    name: "anime",
    description: "Search anime information",
    usage: "anime <search>",
  };

