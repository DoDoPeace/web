<template>
  <div class="container">
    <h1 style="margin-top: 40px;">陈馨 数字分解练习</h1>
    <p>点击数字自动填充到正确的分解区域：</p>
    <div class="number-container">
      <div
        class="number"
        v-for="(number, index) in numbers"
        :key="index"
        @click="fillDropzone(number)"
      >
        {{ number }}
      </div>
    </div>

    <div class="target-container">
      <div class="target-zone">
        <div style="font-size: 20px;color: pink;font-weight: bold;">{{ targetNumber }}</div>
      </div>
      <div class="vertical-connector"></div>
    </div>

    <div class="horizontal-connector"></div>

    <div class="dropzones">
      <div class="dropzone">
        <div v-if="dropzones[0] !== null" style="font-size: 20px;color: green;font-weight: bold;">{{ dropzones[0] }}</div>
      </div>
      <div class="dropzone">
        <div v-if="dropzones[1] !== null" style="font-size: 20px;color: purple;font-weight: bold;">{{ dropzones[1] }}</div>
      </div>
    </div>

    <p style="margin-top: 20px;" v-if="result" class="result">{{ result }}</p>
    <div style="margin-top: 20px;margin-bottom: 20px;">
      <van-button  type="primary"  @click="clearDropzones" style="margin-right: 10px;">清除</van-button>
        <van-button  type="danger"  @click="nextQuestion">下一题</van-button>
    </div>
    <van-button  type="warning"  @click="showCombinations">展示答案</van-button>

    <div v-if="combinations.length" class="combinations">
      <h3>所有分解组合：</h3>
      <ul>
        <li v-for="(combination, index) in combinations" :key="index" class="combination">
          {{ combination.join(' + ') + ' = ' + targetNumber}}
        </li>
      </ul>
    </div>

    <div class="stats">
      <h2>连续答对题目数量：{{ correctCount }}</h2>
      <a-progress :percent="correctCount / 10 * 100"/>
      <h2>小红花数量：{{ '🌹'.repeat(flowerCount) || 0 }}</h2>
    </div>
    <div style="width: 100%;">
    <img style="width: 100%;height: 100%" src="../../assets/20911717385033_.pic.jpg" alt="">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [],
      dropzones: [null, null],
      result: '',
      targetNumber: this.getRandomNumber(),
      combinations: [],
      correctCount: 0,
      flowerCount: 0
    };
  },
  methods: {
    getRandomNumber() {
      return Math.floor(Math.random() * 10) + 1;
    },
    generateNumbers(max) {
      this.numbers = Array.from({ length: max + 1 }, (_, i) => i);
    },
    fillDropzone(number) {
      if (this.dropzones[0] === null) {
        this.dropzones[0] = number;
      } else if (this.dropzones[1] === null) {
        this.dropzones[1] = number;
      }
      this.checkResult();
    },
    checkResult() {
      if (this.dropzones.every(zone => zone !== null)) {
        const sum = this.dropzones.reduce((acc, cur) => acc + cur, 0);
        if (sum === this.targetNumber) {
          this.result = `正确！ ${this.dropzones[0]} + ${this.dropzones[1]}= ${this.targetNumber} ------ ✅✅😁😁😁😁😁😁`;
          this.correctCount++;
          if (this.correctCount >= 10) {
            this.flowerCount++;
            this.correctCount = 0;
          }
        } else {
          this.result = '不正确，请重试。❌❌😭😭😭😭😭';
          this.correctCount = 0;
        }
      }
    },
    clearDropzones() {
      this.dropzones = [null, null];
      this.result = '';
    },
    nextQuestion() {
      this.targetNumber = this.getRandomNumber();
      this.clearDropzones();
      this.generateNumbers(this.targetNumber);
      this.combinations = [];
    },
    showCombinations() {
      this.combinations = [];
      for (let i = 0; i <= this.targetNumber; i++) {
        if (this.dropzones.includes(i)) continue;
        const complement = this.targetNumber - i;
        if (complement <= i) break;
        this.combinations.push([i, complement]);
      }
    }
  },
  mounted() {
    this.generateNumbers(this.targetNumber);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  text-align: center;
}

.number-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.number {
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  cursor: pointer;
}

.target-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.target-zone {
  width: 50px;
  height: 50px;
  border: 2px solid green;
  display: flex;
  font-size: 20px;
  color: rgb(101, 66, 49);
  font-weight: blod;
  justify-content: center;
  align-items: center;
  line-height: 50px;
}
.vertical-connector {
  width: 2px;
  height: 20px;
  background-color: green;
}

.horizontal-connector {
  width: 100px;
  height: 2px;
  background-color: green;
  margin: 0 0 10px 0;
}

.dropzones {
  display: flex;
  justify-content: space-between;
  width: 150px;
}

.dropzone {
  width: 50px;
  height: 50px;
  border: 2px dashed #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.dropzone::before {
  content: '';
  width: 2px;
  height: 10px;
  background-color: green;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.result {
  font-size: 18px;
  margin-bottom: 10px;
}

.button {
  font-size: 18px;
  margin-bottom: 10px;
  padding: 8px 16px;
}

.combinations {
  margin-top: 20px;
  text-align: left;
  border: 1px solid red;
  padding: 10px;
}

.combination {
  font-size: 16px;
  margin-bottom: 5px;
}

.stats {
  margin-top: 20px;
}
</style>
