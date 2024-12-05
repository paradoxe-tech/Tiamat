function toggleDebug() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  if(urlParams.has('debug')) window.location.replace(window.location.origin)
  else window.location.replace('https://tempname.kitsuforyou.repl.co/?debug')
}