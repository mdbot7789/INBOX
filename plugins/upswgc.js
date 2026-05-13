import { prepareWAMessageMedia } from '@adiwajshing/baileys'

const handler = async (m, { conn, text, usedPrefix, command }) => {

    const targetGroup = '120363372717705714@g.us'

    if (!text && !m.quoted) {
        return m.reply(
            `Example:\n${usedPrefix + command} Hello\n\n` +
            `or reply to image / video / audio`
        )
    }

    try {

        if (text) {

            await conn.relayMessage(
                targetGroup,
                {
                    groupStatusMessageV2: {
                        message: {
                            extendedTextMessage: {
                                text: text
                            }
                        }
                    }
                },
                {}
            )

            return m.reply('Text status sent')
        }

        if (m.quoted) {

            const mime = m.quoted.mimetype || ''
            const buffer = await m.quoted.download()

            if (!buffer) {
                return m.reply('Failed to download media')
            }

            let media = {}

            if (/image/.test(mime)) {

                media = await prepareWAMessageMedia(
                    {
                        image: buffer
                    },
                    {
                        upload: conn.waUploadToServer
                    }
                )
            }

            else if (/video/.test(mime)) {

                media = await prepareWAMessageMedia(
                    {
                        video: buffer
                    },
                    {
                        upload: conn.waUploadToServer
                    }
                )
            }

            else if (/audio/.test(mime)) {

                media = await prepareWAMessageMedia(
                    {
                        audio: buffer,
                        mimetype: 'audio/mpeg',
                        ptt: false
                    },
                    {
                        upload: conn.waUploadToServer
                    }
                )
            }

            else {
                return m.reply('Unsupported media type')
            }

            await conn.relayMessage(
                targetGroup,
                {
                    groupStatusMessageV2: {
                        message: {
                            ...media
                        }
                    }
                },
                {}
            )

            return m.reply('Media status sent')
        }

    } catch (err) {

        console.error(err)

        return m.reply('Failed to send status')
    }
}

handler.command = /^upswgc$/i

handler.owner = true
handler.private = true
handler.group = false

handler.help = ['upswgc']
handler.tags = ['owner']

export default handler
