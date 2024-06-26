<template>
  <div id="app">
    <h1 style="font-size: 20px;">陈馨 十以内加减法</h1>
    <div v-if="quizOver">
      <h2>{{ rewardMessage }}</h2>
      <button v-if="continueQuiz" @click="resumeQuiz">继续答题</button>
      <button v-else @click="restartQuiz" style="font-size: 20px;">重新开始</button>
    </div>
    <div v-else>
      <div>
        <div class="question" style="font-size: 40px;font-weight: bold;">
          <div class="flower-number">
            <span>{{ num1 }}</span>
            <span v-if="showFlowers" v-html="getFlowers(num1)">
            </span>
          </div>
          
          <span>{{ operation }}</span>
          <div class="flower-number">
            <span>{{ num2 }}</span>
            <span v-if="showFlowers" v-html="getFlowers(num2)"></span>
          </div>
        </div>
       <div style="display: flex;flex-direction: column;align-items: center;">
        <input v-model.number="userAnswer" @keyup.enter="checkAnswer" placeholder="请输入答案" style="width: 200px;height: 40px;    font-size: 20px;font-weight: bold;color: #d43853;" @focus="show = true"/>
        <van-number-keyboard
                    :show="show"
                    @input="onInput"
                    @delete="onDelete"
            >
            <template #button-row>
        <van-button @click="onEnter">回车</van-button>
      </template>
        </van-number-keyboard>

        <van-button style="margin-bottom: 10px;" type="primary" @click="checkAnswer">提交答案</van-button>
        <van-button style="margin-bottom: 10px;" type="danger"  @click="toggleFlowers">{{ showFlowers ? '隐藏小红花' : '显示小红花' }}</van-button>
        <van-button style="margin-bottom: 20px;" type="warning" @click="generateQuestion">{{ '下一题' }}</van-button>
       </div>
      </div>
      <p style="font-size: 20px;">当前连续正确回答：<span style="color: green;">{{ correctCount }}</span> 道题</p>
      <a-progress :percent="correctCount / 10 * 100" style="width: 250px;margin-bottom: 20px;" />
      <p style="font-size: 20px">当前学习时间：{{ formatTime }}</p>
    </div>
    <audio ref="audioPlayer" controls style="display: none;">
      <source :src="audioSrc" type="audio/mp3">
      Your browser does not support the audio element.
    </audio>
    <audio ref="audioPlayer_1" controls style="display: none;">
      <source :src="audioSrc_1" type="audio/mp3">
      Your browser does not support the audio element.
    </audio>
    <div>
      <span style="font-size: 20px">累计小红花：</span> 
      <span v-html="getFlowers(totalFlowers)" v-if="totalFlowers > 0"></span>
      <span v-else style="font-size: 20px;">0</span>
    </div>
    <div class="flower-rain" v-if="flowerRain">
      <div class="flower"></div>
      <div class="flower"></div>
      <div class="flower"></div>
      <!-- 添加更多花朵，根据需求 -->
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      audioSrc: "https://img.tukuppt.com/newpreview_music/08/98/87/5c88c56b0628150635.mp3",
      audioSrc_1:'https://img.tukuppt.com/newpreview_music/08/99/11/5c88e18c8ae7a79551.mp3',
      num1: 0,
      num2: 0,
      operation: '+',
      answer: 0,
      userAnswer: '',
      correctCount: 0,
      totalFlowers: 0,
      quizOver: false,
      rewardMessage: '',
      continueQuiz: false,
      showFlowers: false,
      minutes: 0,
    seconds: 0,
      flowerRain: false, // 控制花朵下雨效果的开关
      startTime: 0 ,// 记录开始学习的时间戳
      userAnsweruserAnswer: '123',
            showKeyboard: true,
            show: true

    };
  },
  created() {
    this.generateQuestion();
    this.startTime = Date.now(); // 记录开始学习时间
    this.startTimer(); // 启动计时器
  },
  methods: {
    playAudio() {
      this.$refs.audioPlayer.play();
    },
    playAudio_1() {
      this.$refs.audioPlayer_1.play();
    },
    onEnter(){

    },
    onInput(key) {
      console.log('key',key);
      
                this.userAnswer = (this.userAnswer + key).slice(0, 6);
            },
            onDelete() {
                this.userAnswer = this.userAnswer.slice(0, this.userAnswer.length - 1);
            },

    getRandomNumber(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    getRandomOperation() {
      return Math.random() > 0.5 ? '+' : '-';
    },
    generateQuestion() {
      this.num1 = this.getRandomNumber(10);
      this.num2 = this.getRandomNumber(10);
      this.operation = this.getRandomOperation();

      if (this.operation === '-') {
        if (this.num1 < this.num2) {
          [this.num1, this.num2] = [this.num2, this.num1];
        }
        this.answer = this.num1 - this.num2;
      } else {
        this.answer = this.num1 + this.num2;
      }

      this.question = `${this.num1} ${this.operation} ${this.num2}`;
      this.userAnswer = '';
    },
    getFlowers(number) {
      return '🌹'.repeat(number);
    },
    checkAnswer() {
      if (parseInt(this.userAnswer) === this.answer) {
        this.correctCount++;
        if (this.correctCount === 10) {
          this.rewardMessage = '恭喜你！你已经连续答对了十道题，奖励你一朵小红花🌸！！！';
          this.triggerFlowerRain();
          this.totalFlowers++;
          this.quizOver = true;
        } else {
          this.playAudio()
          message.success('真棒，回答正确~👍🏻👍🏻👍🏻');
          this.generateQuestion();
        }
      } else {
        this.correctCount = 0;
        message.error('太遗憾了，回答错误！😭😭😭');
        this.playAudio_1()
        this.generateQuestion();
      }
    },
    resumeQuiz() {
      this.quizOver = false;
      this.rewardMessage = '';
      this.continueQuiz = false;
      this.generateQuestion();
      this.startTime = Date.now(); // 重新开始学习，重新记录开始时间
    },
    restartQuiz() {
      this.correctCount = 0;
      this.quizOver = false;
      this.rewardMessage = '';
      this.generateQuestion();
      this.startTime = Date.now(); // 重新开始学习，重新记录开始时间
    },
    toggleFlowers() {
      this.showFlowers = !this.showFlowers;
    },
    triggerFlowerRain() {
      this.flowerRain = true;
      // 在一段时间后停止花朵下雨效果
      setTimeout(() => {
        this.flowerRain = false;
      }, 5000); // 控制下雨时间，单位为毫秒
    },
    startTimer() {
      this.timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.startTime;
        this.minutes = Math.floor(elapsedTime / (1000 * 60));
        this.seconds = Math.floor((elapsedTime / 1000) % 60);
      }, 1000);
    }
  },
  computed: {
    formatTime() {
      return `${this.minutes} 分 ${this.seconds} 秒`;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer); // 清除计时器
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
}
input {
  margin: 10px;
  padding: 5px;
}
button {
  margin: 10px;
  padding: 5px 10px;
}
.question {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px
}
.flower-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}
.flower-number span {
  font-size: 24px;
}
/* 添加花朵样式，可根据需求调整 */
.flower-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* 下雨动画效果 */
@keyframes fall {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>