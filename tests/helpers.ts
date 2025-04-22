import { Page } from "@playwright/test"

export const signature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAC5CAYAAAA1fLTKAAAAAXNSR0IArs4c6QAAE0tJREFUeF7t3W2MJMddx/Ff9eyD93yOHwgER3FCbCUEZJDMBS4+39M+czZSpChEJBGyCeIFvDOIBwleIixFCAGKBEIIFCSjSI4ACyd3O7uzD747LrEvEIkoEJvAOY7ACrId53wPu7PTf1Q9M6uN2Z2Z3emq7Z75jiJF552uqv5U7W9raqq7nXghgAACCJRawJW69TQeAQQQQEAEOYMAAQQQKLkAQV7yDqT5CCCAAEHOGEAAAQRKLkCQl7wDaT4CCCBAkDMGEEAAgZILEOQl70CajwACCBDkjAEEEECg5AIEeck7kOYjgAACBDljAAEEECi5AEFe8g6k+QgggABBzhhAAAEESi5AkJe8A2k+AgggQJAzBhBAAIGSCxDkJe9Amo8AAggQ5IwBBBBAoOQCBHnJO5DmI4AAAgQ5YwABBBAouQBBXvIOpPkIIIAAQc4YQAABBEouQJCXvANpPgIIIECQMwYQQACBkgsQ5CXvQJqPAAIIEOSMAQQQQKDkAgR5yTuQ5iOAAAIEOWMAAQQQKLkAQV7yDqT5CCCAAEHOGEAAAQRKLkCQl7wDaT4CCCBAkDMGEEAAgZILEOQl70CajwACCBDkjAEEEECg5AIEeck7kOYjgAACBDljAAEEECi5AEFe8g6k+QgggABBzhhAAAEESi5AkJe8A2k+AgggQJAzBhBAAIGSCxDkJe9Amo8AAggQ5IwBBBBAoOQCBHnJO5DmI4AAAgQ5YwABBBAouQBBXvIOpPkIIIAAQc4YQAABBEouQJCXvANpPgIIIECQMwYQQACBkgsQ5CXvQJqPAAIIEOSMAQQQQKDkAgR5yTvwoJs/vWANqyhxJsvaYnJKZJbKLc85xtdBdxD1D4UAv2gD1M2TNUtdKp+ezVAN9PKF+4Hjmv/X8bU0S5h3M+LnCPQr0PUXsd8KOD6MwLEL9s2J67pXTn4u7IoYlyZZbdYlYQQoFQEE2gIEeUnGwoPn7drEug4plTkn59rT4gK3P5W0zIy8wD1E0wZFgCAvaE+eOGeN8YoSP6st6oy7G52ZrDbHjLybEz9HoF8BgrxfwTyON6tML6pufqbtZH6du/vqcx4Vhy3Df2ioMSMPi0zpCLS+swIiosCxs1YfTVQZSeRSk5IAa9ypZMH/Qlur/UlW1/+rjvXxiIOKqoZeIPjv+zAJH/2K/eTYG/qXkVRJpbVvxAda9kVkwFl2mi2+yH33Tn3pnz/oHoxlPlU1S3YZQamTLc+wrBKrL6hnuAUI8j30/2zVXk+l27ctfGQzX/Mx6j/exNE0vwTjg/L6nbr/yz/lvr6HU8jtrTNVuyqnwzsV6P+wLLM2nps1BSHQTSBO9HRrRUF/Pn2uebFL0vrCMfq6dXNnShbcm062NqXb5Ny1InBNVy31u2fe2haWVIrQO7Rh2AQI8m09/sBX7Pm7XtUHD3JvdnuXijmly7OuUrQB6a/kdIl23BtOiBett2jPsAgMfZCfXLB0LJHflr3jl3YhBoKZ5JqXsTcvwWzW/72VGXd7iPryKnN6ySzbv77Dy//nkU1dWTjj3ptXfZSDAAK9CQxdkB95xv77znHdHSy4syl1M6hbF8pn2beZyuqpGv90xo321jXFedfxc3ZtPNGhbt8BcDl+cfqMlgyXwFAE+dSipX6LXB4n62fTrVfrK85sIUabFdnGhM5fOuZODdIQml5szcI74HHhzyD1OOdSRoE8sq1w5318za6Nb+jQ1lr3flvYnF1nW/uUKq3NF2/Ner+n1u24I5ftydtf18eTDjfG8jZmSpfn3Ei38vg5AgiEEyhtkJ/5oo1fH9f1xJT469iz/RO2dSFMX+flZ5ipya3M5zKJD9d7gUr2n2CS5p+vXV/eaH1CL1w44T4QqBkUiwACPQr0FXg91pHL207VrDFi/k7XzeLyani2VOK3+JncekONi2eGe3bZ6QvNDL715QKX3ucyrCkEgVwE8srDXBqzvZCHnrbbxm7V95K0+d1hnnNjX6CfUVpFWpnm6kPvPrlqLyV13dPtHuObiW6uTruJ3DucAhFAYN8ChQnyD63ZxkRdI9mabHO/R27Z3Z51++WSmxO6eekEQbR9xJxasRsjm7ql02DwhjWe+LPvXzQORCCkwIEE+cyCvZkmurV1VUm2rTrXhrS2AHq4tCJbmdIjcu5sSMiylj1ZtXriVNltJu4pG6bN1Tk3VtZzpN0IDLpArvn5VqzpqjVvGBXglU3Z2+vbzUXz7J/1ROn5ST0o554LUO1AFenXw/1nn526KPsqwmSvvlO/89X73acH6sQ5GQQGTCBQzDaVpqqWJjndWbt9M8Fs9p4qvesNjT31MdcYsP6Idjq73Sul3YBGIuP7g2jdQUUI9CUQNMhnFv1F6H1vMPEf7d3GDb3t4ofd1b7OloN1Ys2+Nbauezp9UjKn9dqMuwUuBBAoh0DQIN/rjLz9peTWBThzw3MBTozh0m1/uF8Pv7qhC8894k7GaA91IIBAPgJBg7zTGvnWUknzi0l/f+3G2uxw7+HOp0t3LmW6dZuC3eowJ6vxIIiQXUDZCAQTCBrkvtWnV+wOSTe3n8HqpPu+fwc7Owr231NsOuefKLfLEpf/Q5pItZlQX0vTCQggEFogeJCHPgHK31ng9Kq9OFLXfR2/ozDJ301smQckM4wQKLUAQV7q7tt1GSVbuep4gY9km6nqa/NufAAJOCUEhkqAIB+g7p5eshsyjXe7zD570Kj0Ym3GvX+ATp9TQWBoBQjyAej6X6raqZedVts3gdztlLKrNKWbq7Pu0ACcNqeAAAItAYK85EPh+LP2H+M3dV/Hryr9WrikZe6VUvLepvkI7CxAkJd4ZHS7T0rr1CxJ9e3qvHt3iU+VpiOAQAcBgrykw2Nq0fyuwV1ffpklNWmFWXhJe5hmI9C7AEHeu1Uh3vnQgi3ckmi2475wJ/+0+88tzblPFKLRNAIBBIIKEORBefMtvOsl9v4h0CZbm+dhGfnKUxoCxRYgyIvdP1ut6/Y0e78j5Y26fv3yw+6PS3JKNBMBBHISIMhzggxVzNGz9sThEf12p6UUdqSE0qdcBMohQJAXuJ8mq3YtcZrg6T0F7iSahkABBAjyAnTCTk3wSyn+v+/WQf6nFdOV6rx7b0FPgWYhgEAkAYI8EnRP1Zi9fbqm/93t8WvtMlLJ3uX00N/MuEs9lcub9i0ws2gPSDq1KX11ddat7rsgDkQgoABBHhC316KPXrI/vO2afiO7/LJDj7Seo5nWeOBGr7T7et+Ry3bojtf1tL8Ls5NGthXyLXOarc24F/ZVMAchEEiAIA8E20uxx5+1b4yv630+vrt1ROsCn42VOe5W2Ivtft4zuWwfSTb1GUl379YhZvpsbc49tp/yOQaBUALd8iNUvUNd7mTN1pNUo93uUrgNyeqpFtbm3Zmhhutw8lNrNpemeni0oQeU6t2p011OGjNpVKZOF8E2S212RtffBzOdrc25h+kHBIok0HXgFqmxZW/LqaqlPr17fSC1/0LTX9qzxNN7NLtgf5JW9EmlOuycRkxKZHJdP8rkPGjM9Lu1OfcHORdLcQj0JUCQ98XX28EfWrHP37qpj/Qy42uVaNne8NkhvULTbGRqWV9wppP+/uq9LD311hP7e5dJdZkuOad/3BzRn69Oujf3VxJHIRBGgCAP47pVatdnZrbf2bzVrNmoXluZdG8P3KxCFT+zaD+RVvS3SUMfkFNFqVz3RY6wp+A/DSWJrqw7/fKz0245bG2UjkB/AgR5f367Hv3QebswflPHkm7rrq17hV+t6+zzjwzH2uv0kj2qVE9I+iFJlZ4WpwP10/cVm20L0kYqPf0D39WjT33M3YhRLXUg0K8AQd6v4A7HZxfz+PXtbg/N9HvbxnV04aR7LkAzDrzIyRX7XJLquEvlP2GMKVNREmq23dqe6c/bnMs2c26aaV1Or1uiFxLTtd1QnLSZSv9Qm3FPHjgcDUBgjwIE+R7BOr19tmrfSBO9z9nuUeU/svuEGYT7hM+es79Ox3TKpbrbGhrzc2t/7tmXtOFGlpnpupIsnF8y09fdmBaXT7incuxKikKgVALhft1KxdB/Y2eWzAdM1yfX30z15MV594v91xi+hJlz9nkb1RGX6h1OGk+bu0Rct2eD5tGybbPrRmr6n6Si36vNuM/mUTZlIDBoAgR5nz06WbVvJ07v7LQjxd9i1kzp8pzbfpVgnzX3cbjZLSeqemJ0VA8nDb3LpImtcG5v6YuR1q1T2L4kItONxphWVk/rF+TYHdJHL3PoEAkQ5H109sxiNgnvtuRr9VGtrp12U31UtadDp5fstyoNfaKe6N4k1a3m5BLn/5o0d4McdKe39sd7uoYzXbk+oV+7eNwt7ukkeTMCCGwJHPTvdCm7YrpqL8npni6z8OzcarMBV4tbescu2mOHrutPU9Nh36bwNfbWbc37N2br5f4vnv9nQ9Jry3Puh3srgXchgEAvAgR5L0rb3uNn4T0cYsmmnq+ecUd7eO+e3zK5YiuVTZ0wU+LXrLO9IDF7slVf6+OI34viHwRtqdObaUX/Va/rmQtz+n05t77nk+MABBDYs0DMX/89N65IB0wu2r8l0o92nIUH2JFy5os2vj6ul11DP5hdlO7XsCPAtJc/sr9aqcwlutFwesUSraxOul+J0ASqQACBHgViZEKPTSnu26aXzD+VvuPLnGx9VP9+4ZT78X7O5HTN/ixp6FNyGvVb+UKl9rbZdPtuURup0yv1hv7+/Lx7vJ9z4FgEEIgrQJB38D5xzl4cq+i+bmvhqe1/X/jpBfvPJNGP+D8U2TJJTq/2Xm6/Y8bf+88aqqui79TrWjz/s+5TOVVDMQggUACB3IKjAOeSWxNOLNtvjjf06W5Lz1lIml6uzbn3dKr8yGUbPfyavjZS0b2WZg8q8DP8XGfb7Rm2k25cXdfjX/459xe5gVAQAggUWoAgf0v39LKM4r9cTBNp+S23lz2+Zp8Z29Qnk1S3+1l6tiySc2BnzfV/QfxXnM318leX5obrJluF/o2icQgcgABB3kI/vWwblUb2sIeOL5+hiemqSSOp06Gt2bU/qtvB++zgrfVsf3vyVFcWeeDyPiU5DIHBFAgUPeXC6mkW3p4JR7g5dutKx+yOLYl0eXHW/Uy5RGktAgjEFBjqID+5YBdGEx07yIsds3X41lKJmRppRX+5Ou1+NeYgoC4EECi3wFAG+U9/wf7qbWN6LLtLYSSBrV0k/gpHf8m8VG9U9M2VKfdj5R5CtB4BBA5aIFKMHfRpNuufXLU/Sjb0eHbSoc68PbtuLsX4591cdamqtVn30WIo0AoEEBg0gVBxVhinyTV7xq3rEX8he3Yfkhxb5mfZ2Zef/n5Uib6TjOrRxVOummMVFIUAAgh0Fcgz17pWFvsNp1fsX0fquj+X2Xd7y1/z3iZv1GbdHbHPh/oQQACBnQQGOsh7vMHVjiOjvXPE37lPpmeX5twkQwgBBBAoogBB3lzLbv7PZY8qu7Y05w4XsbNoEwIIIDB8M/KqvSKnd+x04tn6dqLUEv38ypT7O4YHAgggUFaBgZ6R+06ZrdqVhvSebImk9TKndHmmII9dK+vIod0IIFAYgYEP8sJI0xAEEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAgR5LGnqQQABBAIJEOSBYCkWAQQQiCVAkMeSph4EEEAgkABBHgiWYhFAAIFYAv8H4NF69l2qWJoAAAAASUVORK5CYII="

export async function fieldLocator(page: Page,pointer: string) {
    return await page.locator(`[pointer="${pointer}"]`)
}

export async function childLocator(page: Page, pointer: string, selector: string) {
    return await page.locator(`[pointer="${pointer}"] ${selector}`)
}

export async function child(page: Page, pointer: string, selector: string) {
    const field = await fieldLocator(page, pointer)
    return await field.evaluateHandle((field, selector ) => {
        const input = field?.shadowRoot?.querySelector(selector) as HTMLElement
        return input
    }, selector)
} 

export async function children(page: Page, pointer: string, selector: string) {
    const field = await fieldLocator(page, pointer)
    return await field.evaluateHandle((field, selector ) => {
        const inputs = [...field?.shadowRoot?.querySelectorAll(selector) ?? []] as HTMLElement[]
        return inputs
    }, selector)
}


export function assertNotNull<T>(value: T, message = 'Value is null or undefined'): asserts value is NonNullable<T> {
    if (value == null)  throw new Error(message);
}
  

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}

export function patch(target, ...sources) {
    const copy = JSON.parse(JSON.stringify(target))
    return merge(copy,...sources)
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
