<template>
  <div class="app-container">
    <div class="time" :style="{'opacity': timeDisable ? '1' : '0'}">{{ `${hour}:${minute}`}}</div>
    <img class="bgbox" src="https://cn.bing.com/th?id=OHR.FestivusPenguins_ZH-CN5191348531_UHD.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" alt="">
    <div class="cover" style="opacity: 1;"></div>
    <div class="searchBar" @click="searchBlur">
      <input type="text" v-model.trim="searchWord" class="searchWord" :placeholder="'距离元旦还剩 ' +countdown+' 天'" @keyup.enter="linkSearch" >
    </div>
    <div class="textContent" :style="{'opacity': timeDisable ? '1' : '0'}">
      <!-- <p>{{ `「 ${textContent}」` }}</p> -->
      <p>{{  textContent }}</p>
    </div>
    <!-- // 下雪效果 -->
    <div v-for="item of 300" :key="item" class="snowflake"></div>
      
</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import dayjs from 'dayjs'
const hour = ref<number | null | string>(null);
const minute = ref<number | null | string>(null);
const searchWord = ref<string>('');
const timeDisable = ref<boolean>(false);
const textContent = ref<string>('');
const textAuth = ref<string>('');
const textTitle = ref<string>('');
const countdown = ref<number | null>(null);

function timeChange() {
  let now = dayjs();
  hour.value  = now.hour().toString().length===1 ? `0${now.hour()}` : now.hour();
  minute.value = now.minute().toString().length===1 ? `0${now.minute()}` : now.minute();
}
timeChange();
setInterval(timeChange, 1000); // 每隔1000毫秒（1秒）更新一次时间
setTimeout(() => {
  timeDisable.value = true;  // 进入页面1秒后，渲染页面时间
},800)  

// 请求第三方接口
function getText(){
  fetch('https://v1.hitokoto.cn/?c=i&encode=json', {  
  method: 'GET', // or 'POST'  
  headers: {  
    'Content-Type': 'application/json',  
  },  
})  
.then(response => response.json())  
.then(data => {
  console.log(data);
  textContent.value = data.hitokoto;
  textAuth.value = data.from_who;
  textTitle.value = data.from;
})  
.catch((error) => console.error('Error:', error));
}
getText();

function linkSearch(){
  window.open('https://www.baidu.com/s?wd='+searchWord.value);
}
if(localStorage.getItem('sister') !== '1'){
  searchWord.value = '妹妹说紫色很有韵味！꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱ ';
  localStorage.setItem('sister', '1')
}
function searchBlur(){
  if(searchWord.value === '妹妹说紫色很有韵味！꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱ '){
    searchWord.value = '';
  }
}

// 倒计时
const createCountdown = () => {
  const targetDate:any = new Date('2024-01-01T00:00:00+08:00');
  const currentDate:any = new Date();
  const diffTime = targetDate - currentDate;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  countdown.value = days;
};
createCountdown();

</script>
<style lang="scss" scoped>
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
::selection {
  background-color: #fbbe08
}
.app-container {
  // background: #ce4343;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  .time {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 300px;
    color: #fff;
    font-family: -apple-system,BlinkMacSystemFont;
    font-weight: 400;
    font-size: 42px;
    text-shadow: 0 0 20px rgba(0,0,0,.35);
    animation: delayedFadeIn 2s;
    transition: .5s;
    z-index: 1;
    position: fixed;
    cursor: pointer;
    animation: testEnd .25s forwards ease-in-out;
  }
  .time:hover {
    font-size: 56px;
    animation: testStart .25s forwards ease-in-out;
  }
  /* 定义关键帧 */
@keyframes testStart {
 0% {
  font-size: 42px;
 }
 70% {
   font-size: 54px;
 }
 100% {
   font-size: 50px;
 }
}
  /* 定义关键帧 */
  @keyframes testEnd {
 0% {
  font-size: 52px;
 }
 70% {
  font-size: 38px;
}
 100% {
   font-size: 42px;
 }
}

  .bgbox {
    object-fit: cover; /* 设置为 cover 时，图片会自动填充其容器，并保持比例 */
    width: 100%; /* 设置图片的宽度为 100% */
    height: 100vh; /* 设置图片的高度为自动 */
    z-index: -3;
    position: fixed;
    
  }
  .cover {
    z-index: 0;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0, 0, 0, 0.655) 100%),radial-gradient(rgba(0,0,0,.1) 33%,rgba(0,0,0,.3) 166%);
    transition: .25s;
  }
  .searchBar {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 230px;
    max-width: 80%;
    height: 43px;
    border-radius: 30px;
    color: #fff;
    // background-color: rgb(255, 255, 255);
    box-shadow: rgba(0,0,0,.2) 0 0 10px;
    -webkit-backdrop-filter: blur(10px) saturate(1.5);
    backdrop-filter: blur(10px) saturate(1.5);
    overflow: hidden;
    transition: color .25s,background-color .25s,box-shadow .25s,left .25s,opacity .25s,top .25s,width .25s;
    padding: 0 12px;
    z-index: 999;
      .searchWord{
          outline: 0;
          border: none;
          width: 100%;
          height: 100%;
          font-size: 15px;
          color: #7a3db0;
          // padding: 0 20px;
          // color: inherit;
          // background-color: red;
          // font-size: 14px;
          // text-align: center;
          // z-index:99
        }
  }
  .textContent {
    position: fixed;
    top: 85%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    // background-color: red;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    z-index: 2;
    animation: delayedFadeIn 2s;
    transition: .5s;
  }
}

input {
  text-align: center;
  background-color: inherit;
  
}
// 下雪
.snowflake {
  --size: 5vw;
  width: var(--size);
  height: var(--size);
  // background: url("@/assets/xuehua.png") no-repeat;
  // background-size: 100% 100%;
  position: fixed;
  top: -5vh;
  // z-index: 999;
  &::before{
    content: '';
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%; 
    position: absolute;
    color: #fff;
  }
}

@keyframes snowfall {
  100% {
    transform: translate3d(var(--end), 110vh, 0);
  }
}

@for $i from 0 through 500 {
  .snowflake:nth-child(#{$i}) {
    //每个雪花的大小
    --size: #{random(5) * 0.1}vw;
    //雪花移动目标点 -70后是负数 这样雪花会向左下方飘落
    --end: #{random(20) - 70}vw;
    left: #{random(150)}vw;
    animation: snowfall #{5 + random(20)}s linear infinite;
    animation-delay: -#{random(10)}s;
  }
}
</style>