export const documentClickOnce = () => {
    return new Promise(res => {
        const listener = () => {
            document.body.removeEventListener('click', listener)
            res()
        }

        document.body.addEventListener('click', listener)
    })
}
