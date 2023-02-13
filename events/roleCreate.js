const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = async (client, role) => {

    const audit_channel_data = config.channel_settings.audit.audit_log, audit_channel = client.channels.cache.get(audit_channel_data)

    if (!audit_channel) return console.log("Audit log kanalını bulamadım.")

    var fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: Discord.AuditLogEvent.RoleCreate,
    });

    var roleLog = fetchedLogs.entries.first();

    if (roleLog.executor?.bot) return;
    if (role.guild.ownerId === roleLog.executor.id) return;

    let log_embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Sunucuda yeni bir rol **oluşturuldu**: ${role.name || "bulunamadı"}`)
        .addFields(
            { name: "Oluşturulduğu Zaman:", value: "<t:" + Math.floor(Date.now() / 1000) + ":F>" },
            { name: "Kullanıcı:", value: `${roleLog.executor} (${roleLog.executor.id})` },
        )
        .setThumbnail(roleLog.executor.avatarURL({ dynamic: true }))
        .setTimestamp()

    audit_channel.send({ embeds: [log_embed] })
}