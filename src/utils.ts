import { isDev, KindsURL, BottleImageURL } from './constans'
import axios from 'axios'

interface Kind {
	title: string
	names: string[]
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
