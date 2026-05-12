import { WAMessageStubType } from "@adiwajshing/baileys";

export async function before(m) {
  let chat = db.data.chats[m.chat];

  if (chat.detect) {

    if (!m.messageStubType || !m.isGroup) return;

    let edtr = `@${m.sender.split`@`[0]}`;

    if (m.messageStubType == 21) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} changed the group subject to:\n*${m.messageStubParameters[0]}*`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 22) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} changed the group icon.`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (
      m.messageStubType == 1 ||
      m.messageStubType == 23 ||
      m.messageStubType == 132
    ) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} reset the group link.`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 24) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} changed the group description.\n\n${m.messageStubParameters[0]}`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 25) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} changed group info settings to *${m.messageStubParameters[0] == "on" ? "admin only" : "all participants"}*.`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 26) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} *${m.messageStubParameters[0] == "on" ? "closed" : "opened"}* the group.\nNow ${m.messageStubParameters[0] == "on" ? "only admins" : "all participants"} can send messages.`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 29) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} promoted @${m.messageStubParameters[0].split`@`[0]} to admin.`,
          mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 30) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} demoted @${m.messageStubParameters[0].split`@`[0]} from admin.`,
          mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 72) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} changed disappearing messages duration to *${m.messageStubParameters[0]}*`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else if (m.messageStubType == 123) {

      await this.sendMessage(
        m.chat,
        {
          text: `${edtr} disabled disappearing messages.`,
          mentions: [m.sender],
        },
        {
          quoted: fkon,
        },
      );

    } else {

      console.log({
        messageStubType: m.messageStubType,
        messageStubParameters: m.messageStubParameters,
        type: WAMessageStubType[m.messageStubType],
      });

    }
  }
}

export const disabled = false;
