module.exports = {
  name: "warnInfo",
  description: "Displays info regarding the server's warning system.",
  execute(message, args) {
    let punishment;
    let warnings;
    db.collection("guilds")
      .doc(member.guild.id)
      .get()
      .then((q) => {
        if (q.exists) {
          switch (q.data().warnPunish) {
            case "ban":
              punishment = "banned";
              break;
            case "kick":
              punishment = "kicked";
              break;
            case "mute":
              punishment = "muted";
              break;
            default:
              punishment = "Not Set";
              break;
          }
          warnings = q.data().warnAmount;
        }
      });

    if (punishment == "Not Set") {
      message.channel.send(
        "The warning system has not been set up for this server."
      );
    } else {
      message.channel.send(
        `Members will be ${punishment} after being warned ${warnings} time(s).`
      );
    }
  },
};
