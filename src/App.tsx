import React, { useState, useRef, useEffect } from 'react'
import BottleComponent, { Bottle } from './Bottle'
import { InitBottleN, defaultTitle } from './constans'
import html2canvas from 'html2canvas'
import QRCodeImage from './assets/images/QR.png'
import GitHubButton from 'react-github-btn'
import './App.css'
import { loadKinds, prefetchBottleImages } from './utils'

function initBottles() {
	return loadKinds().then(kinds => {
		// Pick a Kind randomly
		const kind = kinds[Math.floor(Math.random() * kinds.length)]
		return {
			title: kind.title,
			bottles: kind.names.slice(0, InitBottleN).map(name => new Bottle(0, name)),
		}
	})
}

function App() {
	const [bottles, setBottles] = useState<Bottle[]>([])
	const [title, setTitle] = useState<string>(defaultTitle)
	const bottlesEl = useRef<HTMLDivElement | null>(null)
	const [postURL, setPostURL] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
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
		html2canvas(bottlesEl.current, { useCORS: true }).then(canvas => {
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
		alert('1. 点击瓶子改变水的高度; \r\n2. 点击文字(标题和瓶子文字)可以修改')
	}
	useEffect(() => {
		initBottles().then(res => {
			setBottles(res.bottles)
			setTitle(res.title)
			prefetchBottleImages().then(() => {
				setLoading(false)
			})
		})
	}, [])
	if (bottles.length === 0 && loading) {
		return <div>小瓶子们正在加载中...</div>
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
					<div className='star'>
						<GitHubButton
							href='https://github.com/dcalsky/boka'
							data-icon='octicon-star'
							data-size='large'
							data-show-count={true}
							aria-label='Star dcalsky/boka on GitHub'
						>
							Star
						</GitHubButton>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default App
