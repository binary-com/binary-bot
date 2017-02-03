import Observer from 'binary-common-utils/lib/observer'

export const observer = new Observer()

export const throwError = e => {
  const msg = typeof e === 'string' ? e : e.message

  observer.emit(msg)

  throw Error(e)
}
