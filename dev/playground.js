import Migi from '@popcorn.moe/migi'
import { listenCommand } from '@popcorn.moe/lelouch'

// Unicorn module
class Unicorn {
  constructor(migi) {
    this.migi = migi
    migi.listen(this, 'ready', this.onReady)
    listenCommand(this, /^say (.+)/, this.say)
  }

  onReady() {
    console.log(`Ready ${this.migi.user.tag}!`)
  }

  say(message, what) {
    console.log(`Saying ${what}`)
    return message.reply(what)
  }
}

const migi = new Migi({ root: __dirname })

migi.loadModule(Unicorn)
migi.login(process.env.DISCORD_TOKEN)
