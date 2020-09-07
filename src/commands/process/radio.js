const { owners_id } = require('../../config.json');
const stations = require('../../stations.json')
const { MessageEmbed } = require('discord.js')
exports.run = async(client, message, args) => {
    owners_id.forEach(async function(owner) {
    if(message.author.id !== owner) return

                let bicon = client.user.displayAvatarURL;
                let list = new MessageEmbed()
                .setAuthor(client.user.username)
                .setThumbnail(bicon)
                .setColor('RANDOM')
                .setTitle(':notes:**RADIO LIST**')
                .setDescription(`**1-[Sega Radio](${stations.n1})\n2-[RnB](${stations.n2})\n3-[Dance/Techno](${stations.n3})\n4-[Oldie](${stations.n4})\n5-[Rock/Roll](${stations.n5})\n6-[Anime](${stations.n6})\n7-[Country](${stations.n7})\n8-[Dubstep](${stations.n8})\n9-[Electro](${stations.n9})\n10-[Gospel](${stations.n10})\n11-[Chillstep](${stations.n11})\n12-[RAP](${stations.n12})\n13-[HipHop](${stations.n13})\n14-[Gothic](${stations.n14})\n15-[Death Metal](${stations.n15})\n16-[Slamic](${stations.n16})\n17-[Bollywood](${stations.n17})\n18-[Hindi](${stations.n18})\n19-[Heavy Metal](${stations.n19})\n20-[Alternative](${stations.n20})\n21-[Punkrock](${stations.n21})\n22-[Reggae](${stations.n22})\n23-[Panda Radio](${stations.n23})\n24-[Latin Radio](${stations.n24})\n25-[Pop Radio](${stations.n25})\n26-[BigRadio](${stations.n26})\n27-[Sakura17 Radio](${stations.n27})\n28-[Romantic Radio](${stations.n28})\n29-[Opera Radio](${stations.n29})\n30-[America Radio](${stations.n30})**`)
                .setFooter(`Please choose a number between 1-30 to play radio`);
              const s = message.channel.send(list);//Honestly no clue at this point.


     //country radio
      message.channel.awaitMessages(response => response.content === '1', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://content.radiosega.net:8006/live')

                })
                let bicon = client.user.displayAvatarURL;
                let support = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Sega Radio**')
                    .addField('Sega Radio','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support);
                s.delete()

        })

        .catch(() => {

        });

           message.channel.awaitMessages(response => response.content === '2', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://listen.181fm.com/181-rnb_128k.mp3')

                })
                let bicon = client.user.displayAvatarURL;
                let support = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing RnB Radio**')
                    .addField('RnB','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support);
s.delete()
        })
              .catch(() => {

        });

                message.channel.awaitMessages(response => response.content === '3', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://listen.181fm.com/181-energy93_128k.mp3')

                })
                let bicon = client.user.displayAvatarURL;
                let support = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Dance/Techno Radio**')
                    .addField('Dance/Techno','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support);
s.delete()
        })
             .catch(() => {

        });

                message.channel.awaitMessages(response => response.content === '4', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://listen.181fm.com/181-oldies_128k.mp3')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Oldies Radio**')
                    .addField('Oldies','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })
             .catch(() => {

        });

                     message.channel.awaitMessages(response => response.content === '5', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://listen.181fm.com/181-rock_128k.mp3')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Rock Radio**')
                    .addField('Rock','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                  message.channel.awaitMessages(response => response.content === '6', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('https://listen.moe/opus')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Anime Radio**')
                 .addField('Anime','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });

                       message.channel.awaitMessages(response => response.content === '7', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://listen.181fm.com/181-realcountry_128k.mp3')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Country Radio**')
                    .addField('Country','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                       message.channel.awaitMessages(response => response.content === '8', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://radio.promodj.com/dubstep-192')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Dubstep Radio**')
                    .addField('Dubstep','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });

                       message.channel.awaitMessages(response => response.content === '9', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('https://streamer.radio.co/s2c3cc784b/listen')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Electro Radio**')
                    .addField('Electro','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });

                       message.channel.awaitMessages(response => response.content === '10', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://stream.tgrn.org:8000/live.mp3')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Gospel Radio**')
                    .addField('Gospel','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                       message.channel.awaitMessages(response => response.content === '11', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://chillstep.info:1984/listen.mp3')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Chillstep Radio**')
                    .addField('Chillstep','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });

                             message.channel.awaitMessages(response => response.content === '12', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://stream.laut.fm/synexitfmrap')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Rap Radio**')
                    .addField('Rap','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });

                                   message.channel.awaitMessages(response => response.content === '13', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://listen.hot108.com/hot108')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing HipHop Radio**')
                    .addField('Hip Hop','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                                         message.channel.awaitMessages(response => response.content === '14', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://janus.cdnstream.com:5200/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Gothic Radio**')
                    .addField('Gothic','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                                         message.channel.awaitMessages(response => response.content === '15', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://hi5.death.fm')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Death Metal Radio**')
                    .addField('Death Metal','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                                         message.channel.awaitMessages(response => response.content === '16', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://66.45.232.131:9994/')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Islamic Radio**')
                    .addField('Islamic','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                                               message.channel.awaitMessages(response => response.content === '17', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://94.23.252.14:8104/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Bollywood Radio**')
                    .addField('Bollywood','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                message.channel.awaitMessages(response => response.content === '18', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://s5.voscast.com:8216/')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Hindi Radio**')
                    .addField('Hindi','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                    message.channel.awaitMessages(response => response.content === '19', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://mp3channels.webradio.rockantenne.de/heavy-metal')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Heavy Metal Radio**')
                    .addField('Heavy Metal','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                          message.channel.awaitMessages(response => response.content === '20', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://mp3channels.webradio.rockantenne.de/alternative')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Alternative Radio**')
                    .addField('Alternative','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                                message.channel.awaitMessages(response => response.content === '21', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://mp3channels.webradio.rockantenne.de/punkrock')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Punkrock Radio**')
                    .addField('Punkrock','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
             message.channel.awaitMessages(response => response.content === '22', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://163.172.96.134:8142/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Reggae Radio**')
                    .addField('Reggae','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
          message.channel.awaitMessages(response => response.content === '23', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://192.99.8.192:2032/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Panda Radio**')
                    .addField('Panda','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
          message.channel.awaitMessages(response => response.content === '24', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://188.40.135.197:8307/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Latin Radio**')
                    .addField('Latin','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                message.channel.awaitMessages(response => response.content === '25', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://uk7.internet-radio.com:8226/')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Pop Radio**')
                    .addField('Pop','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                message.channel.awaitMessages(response => response.content === '26', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://64.71.79.181:8018/')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing BigRadio Radio**')
                    .addField('BigRadio','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                message.channel.awaitMessages(response => response.content === '27', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://66.70.187.44:9033/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Sakura17 Radio**')
                    .addField('Sakura17','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                      message.channel.awaitMessages(response => response.content === '28', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://172.82.144.10:8280/;')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Romantic Radio**')
                    .addField('Romantic','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                            message.channel.awaitMessages(response => response.content === '29', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://uk3.internet-radio.com:8060/')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing Opera Radio**')
                    .addField('Opera','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });
                            message.channel.awaitMessages(response => response.content === '30', {

        max: 1,

        time: 10000,

        errors: ['time'],

      })

      .then((collected) => {
        var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const errorconnect = new MessageEmbed()
            .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
      return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
    }
    if (!permissions.has('SPEAK')) {
      const errorspeak = new MessageEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
      return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
    }
                voiceChannel.join()
                .then(connection => {
                        connection.playStream('http://192.95.46.220:20182/stream')

                })
                             let bicon = client.user.displayAvatarURL;
                let support4 = new MessageEmbed()
                    .setAuthor(client.user.username)
                    .setThumbnail(bicon)
                    .setColor('RANDOM')
                    .setTitle(':notes:**Playing America Radio**')
                    .addField('America','Radio Stream 24/7')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`);
                message.channel.send(support4);
                s.delete()
        })

             .catch(() => {

        });



      })
}


exports.conf = {
   aliases: ['radio', 'rb'],
   cooldown: ''
}

exports.help = {
  name: 'radio',
  description: 'Let you listen the radio',
  usage: 'radio'
};
