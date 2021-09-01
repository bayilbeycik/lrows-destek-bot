const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const db = require('quick.db')
const ayarlar = require('./ayarlar.json');
const data = require('quick.db')
require('discord-reply')

const app = express();
app.get("/", (request, response) => {
  console.log();
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === ayarlar.sahip2) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

 
  client.on("message", async message => {
   
    let kanal = db.fetch(`destekkanal_${message.guild.id}`) // Talep Sebebinin Yazılacağı Kanal - Bay İlbeycik
    if(message.channel.id == kanal){
    let yetkilirol1 = data.fetch(`destekyetkilirol_${message.guild.id}`) // Yetkili Rolü
    let kategori = data.fetch(`destekkategori_${message.guild.id}`) // Destek Taleplerinin Açılacağı Katagori
    const sorunlukisi = message.author
    const author = message.author
    const user = message.user
    let everyone = message.guild.roles.cache.find(r => r.name === `@everyone`)
    
      message.guild.channels.create(`destek-${author.username}`).then(channel =>
        {
          data.set(`destek_${message.author.id}`, channel.id)
         const category = message.guild.channels.cache.get(kategori) 
         channel.setParent(category.id) 
         
         channel.createOverwrite(author, {
          'SEND_MESSAGES': true,
          'READ_MESSAGE_HISTORY': true,
          'VIEW_CHANNEL': true,
          'ATTACH_FILES': true  })
        
         channel.createOverwrite(author, {
          'SEND_MESSAGES': true,
          'READ_MESSAGE_HISTORY': true,
          'VIEW_CHANNEL': true,
          'ATTACH_FILES': true  })
        
          channel.createOverwrite(everyone, {
          'VIEW_CHANNEL': false})
         
          channel.createOverwrite(yetkilirol1, {
          'SEND_MESSAGES': true,
          'READ_MESSAGE_HISTORY': true,  
          'VIEW_CHANNEL': true,
          'ATTACH_FILES': true })
        

        
       
      channel.send(`<@!${message.member.id}> <@&${yetkilirol1}>`, new Discord.MessageEmbed()
      .setColor('RANDOM')
      .addField(`**» Kullanıcı:**`, `<@!${message.member.id}>`, true)
      .addField(`**» Talep Konusu**`, `${message.content}`, true)
     // .addField(`Gökkuşağı Bilişim`, `Her Zaman Yanınızda!`, true)
      .setDescription(`Şuanda Aktif Yetkililerimiz Sizinle İlgileneceklerdir! \n**${message.guild.name}**`)
      .setThumbnail(message.author.avatarURL())
      .setFooter(`${message.guild.name}`, client.user.avatarURL())).then(x => x.pin())
        
data.add('talepsayisi_', 1)

    })
    message.delete()
    }
    })
   

//-----------------------DESTEK KAPATMA-----------------------\\
client.on("message", message => {
  if (message.content.toLowerCase() === "talep kapat" && "destek kapat") {
  if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`Bu komut ile sadece talep kapatabilirsin.`)
  .setColor('RED')
  .setThumbnail(client.user.avatarURL())
  )
  message.lineReply(new Discord.MessageEmbed()
  .setTitle(`Talep Kapatma İşlemi!`)
  .setColor('RANDOM')
  .setDescription(`Bu Talep **3** Saniye Sonra Kapatılıcak!`)
  .setFooter(`${client.user.username} ${client.user.avatarURL()}`)
  .setThumbnail(`${message.author.avatarURL()}`)
  )
  setTimeout(async () => {
    message.channel.delete()
    data.delete(`destek_${message.guild.id}.${message.channel.id}`)
    }, 3000)
        }
      })
//-----------------------DESTEK KAPATMA-----------------------\\
client.login(ayarlar.token);

client.on('ready', async () => {
client.user.setActivity(`Youtube Lrows - Altyapıyı Yapan Bay İlbeycik!`)
client.user.setStatus('online')
})
