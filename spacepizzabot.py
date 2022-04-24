from os import environ
import json
import discord
from discord_slash.utils.manage_components import create_button, create_actionrow
from discord_slash.model import ButtonStyle

# CONFIG
try:
    with open('config.json') as json_file:
        config = json.load(json_file)
        token = config['token']
except:
    print('no config.json found, will try to continue by using ')

if environ.get('TOKEN') is not None:
    token = environ.get('TOKEN')

if token is None:
    raise RuntimeError('no Token set, exiting script')

# INTENTS
intents = discord.Intents.default()
intents.members = True
intents.reactions = True

bot = discord.Client(intents=intents)

# CONST
gRuleMessageID = int(environ.get('RULE_MSG_ID'))
gSubcommunityMessageID = int(environ.get('SUBCOMMUNITY_MSG_ID'))
gSubCommunityEmoji_cerbion = '🐙'
gSubCommunityEmoji_nettgemeint = '🤖'
gSubCommunityEmoji_thorstenselbst = '🎵'
gSubCommunityEmoji_litanoela = '🐱'
gSubCommunityEmoji_dapandaraw = '🦊'

@bot.event
async def on_ready():
    print('We have logged in as {0.user}'.format(bot))
    await log("Ich wurde neugestartet und bin wieder einsatzbereit!")

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    if message.content.startswith('!ping'):
        await message.channel.send('Pong!')

    if message.content.startswith('!embed'):
        buttons = [
            create_button(
                style=ButtonStyle.green,
                label="TEST"
            ),
        ]
        action_row = create_actionrow(*buttons)
        embed = discord.Embed()
        embed.title = "Test Titel"
        embed.color = discord.Color.from_rgb(255,127,63)
        embed.description = "Die geile Beschreibung"
        embed.add_field(name="Titel1", value="Test test 123", inline=False)
        await message.channel.send(embed=embed, components=[action_row])

@bot.event
async def on_raw_reaction_add(payload):
    guild = bot.get_guild(payload.guild_id)
    user = guild.get_member(payload.user_id)
    # RULE CONFIRMATION ADDED
    if payload.message_id == gRuleMessageID:
        if(payload.emoji == discord.PartialEmoji(name='✅')):
            role = discord.utils.get(guild.roles, id=964057151758811166)
            await user.add_roles(role)
            await log("<@%s> hat die Regeln bestätigt!" % (user.id))

    # SUBCOMMUNITY CHOICE ADDED
    if payload.message_id == gSubcommunityMessageID:
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_cerbion)):
            role = discord.utils.get(guild.roles, id=964446993168617492)
            await user.add_roles(role)
            await log("<@%s> ist jetzt in der Subcommunity von ttv/cerbion!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_nettgemeint)):
            role = discord.utils.get(guild.roles, id=964446828781260810)
            await user.add_roles(role)
            await log("<@%s> ist jetzt in der Subcommunity von ttv/nettgemeint!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_thorstenselbst)):
            role = discord.utils.get(guild.roles, id=964447584716476476)
            await user.add_roles(role)
            await log("<@%s> ist jetzt in der Subcommunity von ttv/thorstenselbst!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_litanoela)):
            role = discord.utils.get(guild.roles, id=964447234936696852)
            await user.add_roles(role)
            await log("<@%s> ist jetzt in der Subcommunity von ttv/litanoela!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_dapandaraw)):
            role = discord.utils.get(guild.roles, id=964447421834854471)
            await user.add_roles(role)
            await log("<@%s> ist jetzt in der Subcommunity von ttv/dapandaraw!" % (user.id))


@bot.event
async def on_raw_reaction_remove(payload):
    guild = bot.get_guild(payload.guild_id)
    user = guild.get_member(payload.user_id)
    # RULE CONFIRMATION REMOVED
    if payload.message_id == gRuleMessageID:
        if(payload.emoji == discord.PartialEmoji(name='✅')):
            role = discord.utils.get(guild.roles, id=964057151758811166)
            await user.remove_roles(role)
            await log("<@%s> hat die Bestätigung der Regeln zurückgezogen!" % (user.id))

    # SUBCOMMUNITY CHOICE REMOVED
    if payload.message_id == gSubcommunityMessageID:
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_cerbion)):
            role = discord.utils.get(guild.roles, id=964446993168617492)
            await user.remove_roles(role)
            await log("<@%s> ist nicht mehr in der Subcommunity von ttv/cerbion!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_nettgemeint)):
            role = discord.utils.get(guild.roles, id=964446828781260810)
            await user.remove_roles(role)
            await log("<@%s> ist nicht mehr in der Subcommunity von ttv/nettgemeint!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_thorstenselbst)):
            role = discord.utils.get(guild.roles, id=964447584716476476)
            await user.remove_roles(role)
            await log("<@%s> ist nicht mehr in der Subcommunity von ttv/thorstenselbst!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_litanoela)):
            role = discord.utils.get(guild.roles, id=964447234936696852)
            await user.remove_roles(role)
            await log("<@%s> ist nicht mehr in der Subcommunity von ttv/litanoela!" % (user.id))
        if(payload.emoji == discord.PartialEmoji(name=gSubCommunityEmoji_dapandaraw)):
            role = discord.utils.get(guild.roles, id=964447421834854471)
            await user.remove_roles(role)
            await log("<@%s> ist nicht mehr in der Subcommunity von ttv/dapandaraw!" % (user.id))

# LOGGING
async def log(message):
    channel = bot.get_channel(int(environ.get('LOGGING_CHANNEL_ID')))
    await channel.send(message)


# EXECUTE LOGIC
bot.run(token)
