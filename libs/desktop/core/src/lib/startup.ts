import App from "./app";

export default class StartUp {
  static main() {
    const _app = App.application;
    const allPaths = `home | appData | userData | sessionData | temp | exe | module | logs | crashDumps`
    console.log('Startup...', allPaths.split('|').length)
    allPaths.split('|').forEach(path => {
      path = path.trim();
      console.log(`App path ${path}`, _app.getPath(path as any))
    })
    
  }
}
//