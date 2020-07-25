import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

let fnLists = {}
const eventHub = {
  on(eventName, fn) {
    if (!fnLists[eventName]) { fnLists[eventName] = [] }
    fnLists[eventName].push(fn)
  },
  trigger(eventName, data) {
    const fnList = fnLists[eventName]
    if (!fnList) { return }
    fnList.forEach((fn) => fn(data))
  }
}

const store = {
  restTime: 100,
  handleData(time) {
    if (this.restTime <= 0) { alert('时间用完啦'); return }
    if (time > this.restTime) { alert('时间不够用哦'); return }
    this.restTime -= time
  },
  init() {
    eventHub.on('play', (time) => {
      this.handleData(time)
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
    })
  }
}

store.init()

function App() {
  const state = { restTime: store.restTime }
  return (
    <div className='app'>
      <p className='describe'>
        有一户人家，他们有一张游乐园卡，这张卡限定总共可以玩 100 个小时，家中有四个孩子，他们可以任意使用这张卡。
        <br />
        <br />
        我们现在用 eventHub 来实现一个孩子去游玩后，每个孩子都能得到剩余的游玩时间。
        <br />
        <br />
        源码链接：<a href='https://github.com/mcx2020/eventhub-react/blob/master/src/index.js'>https://github.com/mcx2020/eventhub-react/blob/master/src/index.js</a>
      </p>
      <main>
        <Father1 data={state.restTime} />
        <Father2 data={state.restTime} />
      </main>
    </div>
  )
}

function Father1(props) {
  return (
    <div className='father1'>
      <Son1 data={props.data} />
      <Son2 data={props.data} />
    </div>
  )
}

function Father2(props) {
  return (
    <div className='father2'>
      <Son3 data={props.data} />
      <Son4 data={props.data} />
    </div>
  )
}

function Son1(props) {
  const reduceTime = (time) => {
    eventHub.trigger('play', time)
  }
  return (
    <div className='son1'>
      <div>我是Son1</div>
      <div>剩余时间：{props.data} h</div>
      <button onClick={reduceTime.bind(null, 1)}>玩了 1 个小时</button>
      <button onClick={reduceTime.bind(null, 2)}>玩了 2 个小时</button>
      <button onClick={reduceTime.bind(null, 3)}>玩了 3 个小时</button>
    </div>
  )
}

function Son2(props) {
  const reduceTime = (time) => {
    eventHub.trigger('play', time)
  }
  return (
    <div className='son2'>
      <div>我是Son2</div>
      <div>剩余时间：{props.data} h</div>
      <button onClick={reduceTime.bind(null, 1)}>玩了 1 个小时</button>
      <button onClick={reduceTime.bind(null, 2)}>玩了 2 个小时</button>
      <button onClick={reduceTime.bind(null, 3)}>玩了 3 个小时</button>
    </div>
  )
}

function Son3(props) {
  const reduceTime = (time) => {
    eventHub.trigger('play', time)
  }
  return (
    <div className='son3'>
      <div>我是Son3</div>
      <div>剩余时间：{props.data} h</div>
      <button onClick={reduceTime.bind(null, 1)}>玩了 1 个小时</button>
      <button onClick={reduceTime.bind(null, 2)}>玩了 2 个小时</button>
      <button onClick={reduceTime.bind(null, 3)}>玩了 3 个小时</button>
    </div>
  )
}

function Son4(props) {
  const reduceTime = (time) => {
    eventHub.trigger('play', time)
  }
  return (
    <div className='son4'>
      <div>我是Son4</div>
      <div>剩余时间：{props.data} h</div>
      <button onClick={reduceTime.bind(null, 1)}>玩了 1 个小时</button>
      <button onClick={reduceTime.bind(null, 2)}>玩了 2 个小时</button>
      <button onClick={reduceTime.bind(null, 3)}>玩了 3 个小时</button>
    </div>
  )
}

function myRender() {

  console.log('render执行了')
}
myRender()

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
