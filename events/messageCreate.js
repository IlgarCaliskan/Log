const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const Discord = require('discord.js')
const config = require("../config.json")

module.exports = async (client, message) => {

    if (message.author?.bot) return;

    const chat_channel_data = config.channel_settings.chat.chat_channel, log_channel_data = config.channel_settings.chat.log_channel
    const chat_channel = client.channels.cache.get(chat_channel_data), log_channel = client.channels.cache.get(log_channel_data)

    const image_logchannel_data = config.channel_settings.image.image_log, image_log = client.channels.cache.get(image_logchannel_data)

    if (!chat_channel) return console.log("Chat kanalını bulamadım.")
    if (!log_channel) return console.log("Chat log kanalını bulamadım.")

    if (message.channel.id === chat_channel.id) {
        log_channel.send({ content: `${message.content || "mesaj yazılmamış"} **|** ${message.author} (**${message.author.tag}**)` })
    }

    if (!image_log) return console.log("Fotoğraf log kanalınu bulamadım.")

    const guild = config.MAİN_GUİLD_İD

    if (message.guild.id === guild) {
        image_log.send({ content: `${message.author} (**${message.author.tag}**) - ${message.channel}`, files: [message.attachments.first()] })
    }
}