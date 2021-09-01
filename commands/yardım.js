const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
require('discord-reply')
exports.run = async(client, message, args) => {
 const prefix =  ayarlar.prefix

 message.lineReply(new Discord.MessageEmbed()
 .setTitle(`${client.user.username} Yardım Menüsü`)
 .setDescription(`!destek \n ${prefix}destek kanal #kanal **Destek Kanalını Ayarlar Talep Konusunun Yazılacağı Kanal** \n${prefix}destek kategori kategoriID **Belirtilen Kategoride Destek Taleplerini Açar** \n${prefix}destek yetkilirol @rol **Destek Kanalında Yetkiliyi Etiketlemesini Sağlar**`)
 .setFooter(`Yardım Menüsü - Bay İlbeycik & Lrows`)
 .setThumbnail(message.author.avatarURL())
 )
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['help'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'yardım'
  };
  