import fs from 'fs'
import path from 'path'

const TMP_DIR     = '/tmp'
const INTERVAL_MS = 30 * 60 * 1000
const MAX_AGE_MS  = 60 * 60 * 1000
const OWNER_JID   = '212773608927@s.whatsapp.net'

function cleanTmp(notify = false) {

  try {

    const files = fs.readdirSync(TMP_DIR)

    const now = Date.now()

    let deleted = 0

    let freed = 0

    for (const file of files) {

      const filePath = path.join(TMP_DIR, file)

      let stat

      try {

        stat = fs.statSync(filePath)

      } catch {

        continue
      }

      if (stat.isDirectory()) continue

      const age = now - stat.mtimeMs

      if (age > MAX_AGE_MS) {

        try {

          freed += stat.size

          fs.unlinkSync(filePath)

          deleted++

        } catch { }
      }
    }

    if (deleted > 0) {

      const mb = (freed / 1024 / 1024).toFixed(2)

      console.log(
        `[AutoClean] Deleted ${deleted} files — Freed ${mb} MB from /tmp ✅`
      )

      if (notify) {

        try {

          const msg =
`🧹 *AutoClean — Automatic Cleanup*

✅ Deleted *${deleted}* files from */tmp*
💾 Freed space: *${mb} MB*
🕐 Time: ${new Date().toLocaleTimeString('en')}`

          global.conn?.sendMessage(
            OWNER_JID,
            {
              text: msg
            }
          )

        } catch { }
      }
    }

  } catch (e) {

    console.error(
      '[AutoClean] Error:',
      e.message
    )
  }
}

cleanTmp(false)

setInterval(
  () => cleanTmp(true),
  INTERVAL_MS
)

let handler = async () => {}

handler.help = []

handler.command = []

handler.tags = []

handler.disabled = true

export default handler
