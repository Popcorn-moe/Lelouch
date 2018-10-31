import { isModule, getMigiData } from '@popcorn.moe/migi'
import { isRegExp } from 'util'

const LELOUCH_DATA = Symbol('lelouch')

export function getLelouchData(obj) {
  return obj[LELOUCH_DATA]
}

export function listenCommand(module, regex, handler) {
  const { migi } = getMigiData(module.constructor)

  if (!isModule(module) || !migi.isModuleLoaded(module))
    throw new Error('module must be a loaded module instance')
  if (!isRegExp(regex))
    throw new Error('regex must be a RegExp')
  if (typeof listener !== 'function')
    throw new Error('listener must be a function')

  // init lelouch data
  if (!getLelouchData(module.constructor)) {
    module.constructor[LELOUCH_DATA] = {
      _commands: [],
			get commands() {
				return Object.freeze(this._commands.slice())
			},
    }
  }
  
  // init handler data
  handler[LELOUCH_DATA] = {
    get module() {
      return module
    },
    get regex() {
      return regex
    },
    get handler() {
      return handler
    }
  }

  migi.emit('commandAdd', module, regex, handler)
}
