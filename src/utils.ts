import { isDev, KindsURL, BottleImageURL } from './constans'
import axios from 'axios'

export const availableBottleVolumes = [0, 10, 30, 50, 70, 80, 100]

interface Kind {
	title: string
	names: string[]
}

const checkImage = (src: string) =>
	new Promise(resolve => {
		const img = new Image()
		img.onload = () => resolve({ src, status: 'ok' })
		img.onerror = () => resolve({ src, status: 'error' })
		img.src = src
	})

export function prefetchBottleImages() {
	return Promise.all(availableBottleVolumes.map(volume => loadBottleImage(volume)).map(checkImage))
}

export function loadKinds(): Promise<Kind[]> {
	if (isDev) {
		return new Promise(resolve => {
			resolve(require('./assets/names.json'))
		})
	} else {
		return axios.get(KindsURL).then(res => res.data)
	}
}

export function loadBottleImage(volume: number) {
	if (isDev) {
		return require(`./assets/images/${volume}.png`)
	} else {
		return `${BottleImageURL}/${volume}.png`
	}
}
