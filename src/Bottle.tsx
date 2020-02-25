import React, { useState } from 'react'
import { loadBottleImage, availableBottleVolumes } from './utils'
import './Bottle.css'

export class Bottle {
	volume: number = 0
	text = ''
	constructor(volume: number, text: string) {
		this.volume = volume
		this.text = text
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
		while (!availableBottleVolumes.includes(newVolume)) {
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
