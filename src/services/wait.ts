export const wait = (ms = 350) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
