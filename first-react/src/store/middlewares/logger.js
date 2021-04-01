export default function logger(storeAPI){
  return function wrapDispatch(next) {
    return function handleAction(action) {
      
      console.log('dispatching..')
      next(action) // mirip dengan dispatch
      // console.log('state saat ini', storeAPI.getState())
      return null
    }
  }
}