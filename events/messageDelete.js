const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const Discord = require('discord.js')
const config = require("../config.json")

module.exports = async (client, message) => {

    if (message.author?.bot) return;

    const deleted_log = config.channel_settings.deleted.deleted_channel, log_channel = client.channels.cache.get(deleted_log)

    if (!log_channel) return console.log("Silinen log kanalını bulamadım.")

    log_channel.send({ content: `${message.content || "mesaj yazılmamış"} **|** ${message.author} (**${message.author.tag}**)` })
}