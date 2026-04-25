const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState(".yud/session")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  // simpan session otomatis
  sock.ev.on("creds.update", saveCreds)

  // status koneksi
  sock.ev.on("connection.update", (update) => {
    const { connection } = update
    console.log("STATUS:", connection)

    if (connection === "open") {
      console.log("✅ SESSION BERHASIL DIBUAT")
    }

    if (connection === "close") {
      console.log("❌ KONEKSI PUTUS")
    }
  })
}

start()
