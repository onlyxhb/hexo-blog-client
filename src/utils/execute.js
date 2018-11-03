import uuidV4 from 'uuid/v4'
const { ipcRenderer } = window.electron

export default payload => {
  console.log(payload)
  let channel = `$${ payload.$type }`
  /* eslint-disable-next-line */
  !payload.$type && (channel = `$${ payload }`)
  const uuid = uuidV4()

  let deferred = {}

  deferred.promise = new Promise((resolve, reject) => {
  deferred.resolve = resolve
  deferred.reject  = reject
  })

  ipcRenderer.send(channel, payload, uuid)

  ipcRenderer.once(`${channel}-${uuid}`, (event, result) => {
  return deferred.resolve(result)
  })

  return deferred.promise
}