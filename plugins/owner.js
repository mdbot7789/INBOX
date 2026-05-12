import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
_BOT OWNER INFO_
https://wa.me/qr/FFA4RBEQZQG6O1
`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)$/i
handler.limit = false

export default handler
