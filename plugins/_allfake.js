import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
import axios from "axios";
import speed from "performance-now";

let handler = (m) => m;

handler.all = async function (m) {
  let name = await conn.getName(m.sender);

  let pp =
    "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";

  let logo = "https://files.catbox.moe/6pxg6m.jpg";

  let sig = "https://api.whatsapp.com/send?phone=212773608927";

  let namebot = "EMK";

  try {
  } catch (e) {
    console.error(e);
  } finally {
    global.emror = logo;

    global.doc = pickRandom([
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/pdf",
    ]);

    global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000]);

    global.axios = (await import("axios")).default;
    global.fetch = (await import("node-fetch")).default;
    global.cheerio = (await import("cheerio")).default;
    global.fs = (await import("fs")).default;

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let ms = await latensi.toFixed(4);

    global.kontak2 = [
      [
        owner[0],
        await conn.getName(owner[0] + "@s.whatsapp.net"),
        "EMK AI",
        "https://whatsapp.com",
        true,
      ],
    ];

    global.fkon = {
      key: {
        fromMe: false,
        participant: m.sender,
        ...(m.chat
          ? {
              remoteJid: "status@broadcast",
            }
          : {}),
      },

      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD
VERSION:3.0
N:;${name},;;;
FN:${name}
item1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}
item1.X-ABLabel:Ponsel
END:VCARD`,
        },
      },
    };

    global.fVerif = {
      key: {
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net",
      },

      message: {
        conversation: `${namebot} verified through WhatsApp`,
      },
    };

    global.ephemeral = "86400";

    global.ucapan = ucapan();
    global.botdate = date();

    global.adReply = {
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1,

        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363318148683520@newsletter",
          serverMessageId: 103,
          newsletterName: `EMK`,
        },

        externalAdReply: {
          title: namebot,
          body: global.ucapan,
          mediaType: 1,
          previewType: "PHOTO",
          renderLargerThumbnail: false,
          showAdAttribution: false,
          sourceUrl: sig,
          thumbnail: await (await fetch(logo)).buffer(),
          jpegThumbnail: await (await fetch(logo)).buffer(),
        },
      },
    };

    global.fakeig = {
      contextInfo: {
        externalAdReply: {
          title: namebot,
          body: ucapan(),
          mediaType: 1,
          previewType: "PHOTO",
          renderLargerThumbnail: false,
          showAdAttribution: false,
          sourceUrl: sig,
          thumbnail: await (await fetch(logo)).buffer(),
          jpegThumbnail: await (await fetch(logo)).buffer(),
        },
      },
    };
  }
};

export default handler;

function date() {
  let d = new Date(new Date() + 3600000);

  let locale = "id";

  let week = d.toLocaleDateString(locale, {
    weekday: "long",
  });

  let date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${week}, ${date}`;
}

function ucapan() {
  return "OWNER - KIM SUN OO";
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
