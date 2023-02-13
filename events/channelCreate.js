const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = async (client, channel) => {

    const audit_channel_data = config.channel_settings.audit.audit_log, audit_channel = client.channels.cache.get(audit_channel_data)

    if (!audit_channel) return console.log("Audit log kanalını bulamadım.")

    var fetchedLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: Discord.AuditLogEvent.ChannelCreate,
    });

    var channelLog = fetchedLogs.entries.first();

    if (channelLog.executor?.bot) return;
    if (channel.guild.ownerId === channelLog.executor.id) return;

    let log_embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Sunucuda yeni bir kanal **oluşturuldu**: ${channel || "bulunamadı"}`)
        .addFields(
            { name: "Oluşturulduğu Zaman:", value: "<t:" + Math.floor(Date.now() / 1000) + ":F>" },
            { name: "Kullanıcı:", value: `${channelLog.executor} (${channelLog.executor.id})` },
        )
        .setThumbnail(channelLog.executor.avatarURL({ dynamic: true }))
        .setTimestamp()

    audit_channel.send({ embeds: [log_embed] })
}