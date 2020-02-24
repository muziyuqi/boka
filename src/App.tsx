import React, { useState, useRef } from 'react'
import BottleComponent, { Bottle } from './Bottle'
import { InitBottleN, defaultTitle } from './constans'
import html2canvas from 'html2canvas'
import QRCodeImage from './assets/images/QR.png'
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
		// Capture whole DOM node
		window.scrollTo(0, 0)
		html2canvas(bottlesEl.current).then(canvas => {
			setPostURL(canvas.toDataURL())
			alert('长按保存图片，无法保存请使用其他浏览器打开。')
		})
		window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
	}
	function changeTitle() {
		const newTitle: string | null = prompt('请输入新标题:')
		if (!newTitle) return
		setTitle(newTitle)
	}
	function readme() {
		alert('1. 点击瓶子改变水的容量; \r\n2. 点击文字(标题和瓶子文字)可以修改')
	}
	return (
		<div className='App'>
			<div className={`post ${postURL ? 'post-show' : 'post-hidden'}`}>
				<img src={postURL || ''} alt='' />
				<button className='again' onClick={() => setPostURL('')}>
					再玩一次
				</button>
			</div>
			{!postURL ? (
				<div>
					<div className='tools'>
						<button className='readme' onClick={readme}>
							使用说明
						</button>
						<button className='add' onClick={insertBottle}>
							新建小瓶子
						</button>
						<button className='delete' onClick={deleteLastBottle}>
							删除最后一个瓶子
						</button>
						<button className='save' onClick={generatePost}>
							保存图片
						</button>
					</div>
					<div className='container' ref={bottlesEl}>
						<div className='title' onClick={changeTitle}>
							{title}
						</div>
						<div className='bottles'>
							{bottles.map((b, i) => (
								<BottleComponent key={`${i}${b.volume}${b.text}`} {...b}></BottleComponent>
							))}
						</div>
						<div className='QR'>
							<span className='tip'>扫码生成小瓶子→</span>
							<img src={QRCodeImage} alt='QRCODE' />
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default App
