import React, { useState, useEffect } from 'react'
import { isDev } from './constans'
import './Bottle.css'

const availableVolumes = [0, 10, 30, 50, 70, 80, 100]

export class Bottle {
	volume: number = 0
	text = ''
	constructor(volume: number, text: string) {
		this.volume = volume
		this.text = text
	}
}

const loadBottleImage = (volume: number) => {
	if (isDev) {
		return require(`./assets/images/${volume}.png`)
	} else {
		return ''
	}
}

const BottleComponent = (props: Bottle) => {
	const [volume, setVolume] = useState<number>(props.volume)
	const [text, setText] = useState<string>(props.text)
	function changeVolume() {
		let newVolume = volume
		if (newVolume === 100) {
			newVolume = 0
		} else {
			newVolume += 10
		}
		while (!availableVolumes.includes(newVolume)) {
			newVolume += 10
		}
		setVolume(newVolume)
	}
	function changeText() {
		const newText: string | null = prompt('请输入新的文字: ')
		if (!newText) return
		setText(newText)
	}
	return (
		<div className='bottle'>
			<div className='bottle-img'>
				<img src={loadBottleImage(volume)} onClick={changeVolume} alt='Bottle' />
			</div>
			<div className='bottle-text' onClick={changeText}>
				{text}
			</div>
		</div>
	)
}

export default BottleComponent
