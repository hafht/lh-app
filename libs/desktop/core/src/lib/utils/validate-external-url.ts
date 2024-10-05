export const isTrustedUrl = (url: string) => {
  const trustedDomain = 'https://www.creativeforce.io'
  if(url.startsWith(trustedDomain)) {
    return true
  }
  return false
}