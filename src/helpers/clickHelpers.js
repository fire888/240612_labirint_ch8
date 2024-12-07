export const documentClickOnce = () => {
    return new Promise(res => {
        const listener = () => {
            document.body.removeEventListener('click', listener)
            res()
        }

        document.body.addEventListener('click', listener)
    })
}

export const elementClickOnce = elem => {
    return new Promise(res => {
        const listener = () => {
            elem.removeEventListener('click', listener)
            res()
        }

        elem.addEventListener('click', listener)
    })
}
