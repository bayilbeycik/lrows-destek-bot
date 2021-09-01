const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
require('discord-reply')
exports.run = async(client, message, args) => {
 const prefix =  ayarlar.prefix
    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(`Lütfen Seçeneklerden Birini Seçiniz!`)
        .addField(`
        ${prefix}destek kanal #kanal
        ${prefix}destek kategori kategoriID
        ${prefix}destek yetkili @rol 
        `)
        message.lineReply(embed)
    }
    const menu = args[0]
    // kanal ayarla
    if(menu =="kanal" || menu=="channel"){
        
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.MessageEmbed()
      .setDescription('Bu Komutu Kullana Bilmek İçin **Yönetici** Yetkin Olması Lazım.')
      .setColor('RANDOM'));


           
          
  

        let destekkanal = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.name === args.slice(0).join(' '));
        if(!destekkanal) return message.channel.send(`<@!${message.author.id}>`, new Discord.MessageEmbed()
        .setTitle(`¤ Bir Hata Belirdi! ¤`)
        .setColor('RED')
        .setDescription(`■ Lütfen Destek Kanalını Seçin. **Etiketleyin**!`)
        .setFooter(`${client.user.username} Her Zaman Yanınızda! |`)
        .setTimestamp()
        )
        let ayarlanmis = new Discord.MessageEmbed()
        .setTitle(`¤ İşlem Başarılı! ¤`)
        .setColor('GREEN')
        .setDescription(`■ Başarıyla Ayarladım! Kanalınız ${destekkanal} Olarak Ayarlandı Ve Otomatik Mesajı Gönderdim!`)
        .setFooter(`${client.user.username} Her Zaman Yanınızda! |`)
        .setTimestamp()
        
        
        destekkanal.send(new Discord.MessageEmbed()
        .setTitle(`¤  ${message.guild.name} ¤ `)
        .setColor('RANDOM')
        .setDescription(`
        
        Destek Açmak İçin ${destekkanal} Kanalına Mesaj Yazmanız Yeterlidir!
        
        > Destek Talebi oluşturmak için bu kanala konu hakkında kısa bir bilgi yazısı yazmanız yeterlidir.
        
        > Sadece yetkililerin ve sizin gördüğünüz bir kanal oluşacaktır ve en kısa zamanda yetkililer dönüş sağlayacaktır.
        
        > Lütfen konu dışında (gereksiz) rahatsız etmeyiniz.
        
        > Destek talebini yetkiliyi etiketleyerek açmak veya "sa, merhaba vb." gibi konular ile açmak ceza almanıza sebep olacaktır.
        
        > Destek sonunda talep kapat yazarak kanalı kapatabilirsiniz. 
        
        
        > Etiketler :pushpin: ---:arrow_right:   @everyone & @here 
        `)
        .setFooter(`${client.user.username} Her Zaman Yanınızda! |`)
        .setTimestamp()
        )

db.add(`destekkanal_`, 1)
db.set(`destekkanal_${message.guild.id}`, destekkanal.id)
    }
if(menu =="kategori" || menu=="category"){
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.MessageEmbed()
    .setDescription('Bu Komutu Kullana Bilmek İçin **Yönetici** Yetkin Olması Lazım.')
    .setColor('RANDOM'));

    let katagori = args[1]
    if(!katagori) return message.channel.send(`<@!${message.author.id}>`, new Discord.MessageEmbed()
    .setDescription(`Yanlış Kullanım! | Doğru Kullanım : ${prefix}destek katagori katagoriID`)
    .setColor('RED')
    .setFoother(`Komutu Kullanan ${message.author.tag}`)
    )
    let basarili = new Discord.MessageEmbed()
    .setTitle(`İşlem Başarılı`)
    .setDescription(`Destek Taleplerinin Açılacağı Katagori **<#${katagori}>** Olarak Ayarlandı!`)
    .setFooter(`Bu Bot Gökkuşağı Bilişim Ve İnternet Hizmetleri Tarafından Tasarlanmıştır! | ${prefix}sponsor |`)
.setTimestamp()
message.channel.send(basarili)
db.set(`destekkategori_${message.guild.id}`, katagori)

  }

if(menu =="yetkilirol" || menu=="roles" || menu=="yetkili"){
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.MessageEmbed()
    .setDescription('Bu Komutu Kullana Bilmek İçin **Yönetici** Yetkin Olması Lazım.')
    .setColor('RANDOM'));

  let rol = message.mentions.roles.first()
  if(!rol) return message.channel.send(`<@!${message.author.id}>`, new Discord.MessageEmbed()
  .setTitle(`¤ Bir Hata Belirdi! ¤`)
  .setColor('RED')
  .setDescription(`■ Lütfen Destek Yetkili Rolünü Seçin. **Etiketleyin**!`)
  .setFooter(`${client.user.username} Her Zaman Yanınızda! |`)
  .setTimestamp()
  )
  let basarili = new Discord.MessageEmbed()
  .setTitle(`İşlem Başarılı`)
  .setDescription(`Destek Taleplerinin Açıldığında Etiketlenicek Yetkili Rolü **${rol}** Olarak Ayarlandı!`)
  .setFooter(`Bu Bot Bay İlbeycik Tarafından Lrows\'a Yapmıştır!`)
.setTimestamp()
message.channel.send(basarili)
db.set(`destekyetkilirol_${message.guild.id}`, rol.id)

}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ticket'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'destek'
  };
  