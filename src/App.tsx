import React, { useState, useRef } from 'react'
import BottleComponent, { Bottle } from './Bottle'
import { InitBottleN, defaultTitle } from './constans'
import domtoimage from 'dom-to-image'
import './App.css'

function initBottles() {
	const bottles: Bottle[] = []
	for (let i = 0; i < InitBottleN; i++) {
		bottles.push(new Bottle(0, 'Bottle'))
	}
	return bottles
}

function App() {
	const [bottles, setBottles] = useState<Bottle[]>(initBottles())
	const [title, setTitle] = useState<string>(defaultTitle)
	const bottlesEl = useRef<HTMLDivElement | null>(null)
	const [postURL, setPostURL] = useState<string | null>(null)
	function insertBottle() {
		const newBottle = new Bottle(0, '新瓶子')
		setBottles([...bottles, newBottle])
	}
	function deleteLastBottle() {
		setBottles(bottles.slice(0, -1))
	}
	function generatePost() {
		if (!bottlesEl.current) return
		domtoimage.toPng(bottlesEl.current).then(dataUrl => {
			setPostURL(dataUrl)
		})
	}
	function changeTitle() {
		const newTitle: string | null = prompt('请输入新标题:')
		if (!newTitle) return
		setTitle(newTitle)
	}
	function readme() {
		alert('1. 点击瓶子改变水的容量; \r\n2. 点击文字可以修改')
	}
	return (
		<div className='App'>
			{postURL ? (
				<div className='post'>
					<img src={postURL} alt='' />
				</div>
			) : null}

			<div className='container' ref={bottlesEl}>
				<div className='title' onClick={changeTitle}>
					{title}
				</div>
				<div className='bottles'>
					{bottles.map((b, i) => (
						<BottleComponent key={`${i}${b.volume}${b.text}`} {...b}></BottleComponent>
					))}
				</div>
			</div>
			<div className='tools'>
				<button onClick={readme}>使用说明</button>
				<button onClick={insertBottle}>新建小瓶子</button>
				<button onClick={deleteLastBottle}>删除最后一个瓶子</button>
				<button onClick={generatePost}>保存图片</button>
			</div>
		</div>
	)
}

export default App
