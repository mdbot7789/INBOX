import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {

  const cmd = args[0] || 'list'
  let type = (args[0] || '').toLowerCase()

  let _menu = global.db?.data?.settings?.[conn?.user?.jid] || {}

  let d = new Date(Date.now() + 3600000)

  let locale = 'id'

  let week = d.toLocaleDateString(locale, {
    weekday: 'long'
  })

  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const tagCount = {}
  const tagHelpMapping = {}

  Object.keys(global.plugins)
    .filter(plugin => !global.plugins[plugin].disabled)
    .forEach(plugin => {

      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : []

      if (tagsArray.length > 0) {

        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help]

        tagsArray.forEach(tag => {

          if (tag) {

            if (tagCount[tag]) {
              tagCount[tag]++
              tagHelpMapping[tag].push(...helpArray)
            } else {
              tagCount[tag] = 1
              tagHelpMapping[tag] = [...helpArray]
            }

          }

        })

      }

    })

  let isiMenu = []
let objekk = Object.keys(tagCount)

Object.entries(tagCount).map(([key, value]) =>
  isiMenu.push({
    header: `📂 ${key.toUpperCase()} MENU`,
    title: `📌 View ${key} Commands`,
    description: `Contains ${value} available features`,
    id: ".menu " + key,
  })
).join();

const datas = {
  title: "✨ CLICK HERE TO OPEN MENU",
  sections: [
    {
      title: "🤖 BOT SERVICES",
      highlight_label: "ALL FEATURES",
      rows: [
        {
          header: "📋 MAIN MENU",
          title: "Show All Bot Commands",
          description: "Display every available command",
          id: ".menu all",
        }
      ],
    },

    {
      title: "📚 COMMAND CATEGORIES",
      highlight_label: "COMMAND LIST",
      rows: [...isiMenu]
    },

    {
      title: "ℹ️ BOT INFORMATION",
      highlight_label: "INFORMATION CENTER",
      rows: [
        {
          header: "📜 SCRIPT INFO",
          title: "View Bot Script Information",
          description: "Information about the bot script",
          id: ".sc",
        },

        {
          header: "👑 OWNER INFO",
          title: "Contact Bot Owner",
          description: "Information about the bot owner",
          id: ".owner",
        },

        {
          header: "⚡ FEATURES",
          title: "Total Bot Features",
          description: "See all available bot features",
          id: ".totalfitur",
        },

        {
          header: "🚀 BOT SPEED",
          title: "Check Bot Speed",
          description: "View bot response performance",
          id: ".os",
        }
      ]
    }
  ]
}

  let headers = `_~HI 👋🏻 I'M EMK, YOUR INTELLIGENT WHATSAPP BOT~_\n\n`

  if (cmd === 'list') {

    const daftarTag = Object.keys(tagCount)
      .sort()
      .join('\n│※ ' + usedPrefix + command + '  ')

    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)

    let list =
`${headers}${readMore}
╭──「 LIST MENU 」
│※ ${usedPrefix + command} all
│※ ${daftarTag}
╰──────────•`

    if (_menu.image) {

      await conn.sendMessage(m.chat, {
        text: list,
        contextInfo: {
          externalAdReply: {
            title: global.namebot || 'BOT',
            body: 'MENU',
            thumbnailUrl: global.thumbnail || '',
            sourceUrl: global.sgc || '',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })

    } else if (_menu.gif) {

      await conn.sendMessage(m.chat, {
        video: {
          url: "https://telegra.ph/file/ca2d038b71ff86e2c70d3.mp4"
        },
        gifPlayback: true,
        caption: list
      }, { quoted: m })

    } else if (_menu.teks) {

      conn.reply(m.chat, list, m)

    } else if (_menu.doc) {

      await conn.sendMessage(m.chat, {
        document: fs.readFileSync("./package.json"),
        fileName: global.namebot || 'BOT',
        mimetype: 'application/json',
        caption: list,
      }, { quoted: m })

    } else if (_menu.button) {

      await conn.sendList(
        m.chat,
        'MENU BOT',
        headers,
        'OWNER KIM SUN OO',
        'OPEN MENU',
        datas.sections,
        m
      )

    }

  } else if (tagCount[cmd]) {

    const daftarHelp = tagHelpMapping[cmd]
      .map((helpItem, index) => {

        const premiumSign = '🅟'
        const limitSign = 'Ⓛ'

        return `.${helpItem} ${premiumSign}${limitSign}`

      }).join('\n│※ ')

    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)

    const list2 =
`${headers}${readMore}
╭──「 MENU ${cmd.toUpperCase()} 」
├──────────────
│※ ${daftarHelp}
╰──────────•`

    if (_menu.button) {

      await conn.sendList(
        m.chat,
        'MENU BOT',
        `OWNER KIM SUN OO\n\n${list2}`,
        global.wm || 'BOT',
        'OPEN MENU',
        datas.sections,
        m
      )

    } else {

      conn.reply(m.chat, list2, m)

    }

  } else if (cmd === 'all') {

    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)

    const allTagsAndHelp = Object.keys(tagCount)
      .map(tag => {

        const daftarHelp = tagHelpMapping[tag]
          .map((helpItem, index) => {

            const premiumSign = '🅟'
            const limitSign = 'Ⓛ'

            return `.${helpItem} ${premiumSign}${limitSign}`

          }).join('\n│※ ')

        return `
╭──「 MENU ${tag.toUpperCase()} 」
├──────────────
│※ ${daftarHelp}
╰──────────•`

      }).join('\n')

    let all =
`${headers}${readMore}
${allTagsAndHelp}`

    if (_menu.button) {

      await conn.sendList(
        m.chat,
        'ALL MENU',
        `OWNER KIM SUN OO\n${all}`,
        'instagram.com/sunoovvv',
        'OPEN MENU',
        datas.sections,
        m
      )

    } else {

      conn.reply(m.chat, all, m)

    }

  } else {

    await conn.reply(
      m.chat,
      `'${cmd}' could not be found.\nUse:\n${usedPrefix + command} list\nor\n${usedPrefix + command} all`,
      m
    )

  }

}

handler.help = ['menu']
handler.command = ['menu']
handler.register = false

export default handler

function clockString(ms) {

  let h = isNaN(ms)
    ? '--'
    : Math.floor(ms / 3600000)

  let m = isNaN(ms)
    ? '--'
    : Math.floor(ms / 60000) % 60

  let s = isNaN(ms)
    ? '--'
    : Math.floor(ms / 1000) % 60

  return [h, m, s]
    .map(v => v.toString().padStart(2, 0))
    .join(':')
}
