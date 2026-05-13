import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
  const cmd = args[0] || 'list';
  let type = (args[0] || '').toLowerCase()
  let _menu = global.db.data.settings[conn.user.jid]
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  const tagCount = {};
  const tagHelpMapping = {};
  Object.keys(global.plugins)
    .filter(plugin => !plugin.disabled)
    .forEach(plugin => {
      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help];

        tagsArray.forEach(tag => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });
           let isiMenu = []
          let objekk = Object.keys(tagCount)
          Object.entries(tagCount).map(([key, value]) => isiMenu.push({
          header: ` list cmd ${key}  `,
                    title: `📌 Show command list [ ${key} ]`,
                    description: `number ${value} Features`,
                    id: ".menu " + key,
                    })
          ).join();
          const datas = {
    title: "CLICK HERE",
    sections: [{
            title: "ALL BOT-RELATED SERVICES",
            highlight_label: "SHOW ALL FEATURES",
            rows: [{
                    header: " ALL MENU",
                    title: "ALL BOT COMMANDS",
                    description: "",
                    id: ".menu all",
                }],
        },
        {
            title: 'ORDER LIST',
            highlight_label: "THE LIST",
            rows: [...isiMenu]
        },
        {
            title: 'BOT INFORMATION',
            highlight_label: "INFORMATION",
            rows: [
            {
                    header: "BOT SCRIPT",
                    title: "Bot script information",
                    description: "",
                    id: ".sc",
                },
            {
                    header: "OWNER",
                    title: "bot owner information",
                    description: "",
                    id: ".owner",
                },
            {
                    header: "FEATURES",
                    title: " bot features information",
                    description: "",
                    id: ".totalfitur",
                },
            {
                    header: "SPEED",
                    title: "bot speed information",
                    description: "",
                    id: ".os",
                }
                ]
        }
    ]
};

  let objek = Object.values(db.data.stats).map(v => v.success)
  let totalHit = 0
   for (let b of objek) {
    totalHit += b
    }
  let docUrl = 'https://telegra.ph/file/e601537d315cbc69b856b.jpg'
  let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  });
    
   let data = db.data.users[m.sender];
   let fitur = Object.values(plugins).filter(v => v.help).map(v => v.help).flat(1);
   let tUser = Object.keys(db.data.users).length;
   let userReg = Object.values(global.db.data.users).filter(user => user.registered == true).length
   
let headers = `_~👋🏻 I'M EMK, YOUR SMART WHATSAPP BOT~_\n`

  if (cmd === 'list') {
    const daftarTag = Object.keys(tagCount)
      .sort()
      .join('\n│※ ' + usedPrefix + command + '  ');
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let name = m.pushName || conn.getName(m.sender)
    let list = `${headers}${readMore}\n╭──「 LIST MENU 」\n│※ ${usedPrefix + command} all\n│※ ${daftarTag}\n╰──────────•`
 const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
if (_menu.image) {

conn.sendMessage(m.chat, {
      text: list,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      
      } else if (_menu.gif) {

conn.sendMessage(m.chat, {
      video: {url: "https://telegra.ph/file/ca2d038b71ff86e2c70d3.mp4"},
      gifPlayback: true,
      caption: list,
      jpegThumbnail: await conn.resize((await conn.getFile(docUrl)).data, 180, 72),
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})

} else if (_menu.teks) {

conn.reply(m.chat, list, m)

} else if (_menu.doc) {

conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: namebot,
            fileLength: new Date(),
            pageCount: "2024",
            caption: list,
            jpegThumbnail: await conn.resize((await conn.getFile(docUrl)).data, 180, 72),
            contextInfo: {
              externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: sgc,
                thumbnailUrl: thumbnail,
                title: `${date}`,
                body: '',
              },
            },
          }, {quoted: m});
          } else if (_menu.button) {
          
 conn.sendListImageButton(m.chat, `${headers}`, datas, '_BY KIM SUN OO_', thumbnail)
          }
  } else if (tagCount[cmd]) {
    const daftarHelp = tagHelpMapping[cmd].map((helpItem, index) => {
        
      const premiumSign = help[index].premium ? '🅟' : '';
      const limitSign = help[index].limit ? 'Ⓛ' : '';
      return `.${helpItem} ${premiumSign}${limitSign}`;
    }).join('\n│※'  + ' ');
        const more = String.fromCharCode(8206)
        const readMore = more.repeat(4001)
        
    const list2 =  `${headers}${readMore}╭──「 MENU ${cmd.toUpperCase()} 」\n├──────────────\n│※ ${daftarHelp}\n╰──────────•\n\n*Total menu ${cmd}: ${tagHelpMapping[cmd].length}*`
     const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
if (_menu.image) {

conn.sendMessage(m.chat, {
      
      text: list2,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      
      } else if (_menu.gif) {

conn.sendMessage(m.chat, {
      video: {url: "https://telegra.ph/file/ca2d038b71ff86e2c70d3.mp4"},
      gifPlayback: true,
      caption: list2,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})

} else if (_menu.teks) {

conn.reply(m.chat, list2, m)

} else if (_menu.doc) {

conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: namebot,
            fileLength: new Date(),
            pageCount: "2024",
            jpegThumbnail: await conn.resize((await conn.getFile(docUrl)).data, 180, 72),
            caption: list2,
            contextInfo: {
              externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: sgc,
                thumbnailUrl: thumbnail,
                title: `${date}`,
                body: '',
              },
            },
          }, {quoted: m});
          } else if (_menu.button) {
          conn.sendListImageButton(m.chat, `EMK BOT\n${list2}`, datas, wm, thumbnail)
          }
          } else if (cmd === 'all') {
    let name = m.pushName || conn.getName(m.sender)
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    const allTagsAndHelp = Object.keys(tagCount).map(tag => {
      const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
        const premiumSign = help[index].premium ? '🅟' : '';
        const limitSign = help[index].limit ? 'Ⓛ' : '';
        return `.${helpItem} ${premiumSign}${limitSign}`;
      }).join('\n│※' + ' ');
      return`╭──「 MENU ${tag.toUpperCase()} 」\n├──────────────\n│※ ${daftarHelp}\n╰──────────•`;
    }).join('\n');
    let all =  `${headers}${readMore}\n${allTagsAndHelp}\n${wm}`
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
    if (_menu.image) {

conn.sendMessage(m.chat, {
      text: all,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      
      } else if (_menu.gif) {

conn.sendMessage(m.chat, {
      video: {url: "https://telegra.ph/file/ca2d038b71ff86e2c70d3.mp4"},
      gifPlayback: true,
      caption: all,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})

} else if (_menu.teks) {

conn.reply(m.chat, all, m)

} else if (_menu.doc) {

conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: namebot,
            fileLength: new Date(),
            pageCount: "2024",
            caption: all,
            jpegThumbnail: await conn.resize((await conn.getFile(docUrl)).data, 180, 72),
            contextInfo: {
              externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: sgc,
                thumbnailUrl: thumbnail,
                title: `${date}`,
                body: '',
              },
            },
          }, {quoted: m});
          } else if (_menu.button) {
          conn.sendListImageButton(m.chat, `EMK BOT\n${all}`, datas, 'instagram.com/sunoovvv', thumbnail)
          }
  } else {
  await conn.reply(m.chat, `"'${cmd}' could not be found. Use commands '${command} list' atau '${command} all' to see the available menu.`,m);
  }
}

handler.help = ['menu']
handler.command = ['menu']
handler.register = false
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
