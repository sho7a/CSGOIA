browser.runtime.onMessage.addListener(async (param) => {
  return (await fetch(param.url, param.options)).json();
});