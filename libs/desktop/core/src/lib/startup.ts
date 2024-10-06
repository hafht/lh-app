export default class StartUp {
  static isStarted = false
  static main() {
    if (StartUp.isStarted) {
      return StartUp.isStarted
    }
    console.log('Processing startup...')

    StartUp.isStarted = true
    return StartUp.isStarted
  }
}
//