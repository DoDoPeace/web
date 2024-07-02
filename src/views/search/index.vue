<template>
  <div class="app-container">
    <div class="time" :style="{ opacity: timeDisable ? '1' : '0' }">
      {{ `${hour}:${minute}` }}
    </div>
    <img :class="['bgbox', isFocus ? 'bgboxFilter' : '']" :src="bgUrl" alt="" />
    <div ref="cover" class="cover"></div>
    <a-popover v-model:open="successBroard" trigger="primary" placement="bottom" style="
        color: rgb(255, 255, 255);
        background: rgba(190, 182, 182, 0.8);
        backdrop-filter: blur(10px);
      ">
      <template #content>
        <div style="color: #ddd; width: 470px">
          <div v-for="(item, key) in successList" :key="key" :class="[key === currentIndex ? 'successList' : '']"
            style="padding: 5px 16px" @mouseenter="mouseenterSuccess(key)" @mouseleave="mouseLeave"
            @click="jumpPageLink(item)">
            {{ item }}
          </div>
        </div>
      </template>
      <div class="searchBar" @click="searchBlur">
        <a-popover offset="20" v-model:open="visible" trigger="click" placement="left" style="
            color: rgb(255, 255, 255);
            background: rgba(190, 182, 182, 0.1);
            backdrop-filter: blur(10px);
          ">
          <template #content>
            <div style="color: #fff">
              <div class="icon" v-for="(item, key) in iconList" :key="key"
                :class="[key === currentIndex ? 'iconList' : '']" style="display: flex; padding: 5px 10px"
                @mouseenter="mouseenterIcon(key)" @mouseleave="mouseLeave" @click="chooseIcon(key)">
                <icon :style="{ color: '#aaa', 'margin-right': '20px' }">
                  <template #component>
                    <svg height="1.2em" fill="currentColor" viewBox="0 0 1024 1024">
                      <path :d="item.d" p-id="item.p_id"></path>
                    </svg>
                  </template>
                </icon>
                <div style="font-size: 12px">{{ item.name }}</div>
              </div>
            </div>
          </template>
          <div class="icon">
            <icon :style="{ color: '#ccc' }">
              <template #component>
                <svg width="1.4em" height="1.4em" fill="currentColor" viewBox="0 0 1024 1024">
                  <path :d="currentIcon" p-id="4812"></path>
                </svg>
              </template>
            </icon>
          </div>
        </a-popover>
        <!-- <input type="text" v-model.trim="searchWord" class="searchWord" :placeholder="place" @keyup.enter="linkSearch" @focus="focusEvent" @blur="unfocus"> -->
        <input type="text" v-model.trim="searchWord" class="searchWord" :placeholder="'请输入'" @keyup.enter="linkSearch"
          @input="changeVal" />
      </div>
      <!-- <div class="card">
      
    </div> -->
    </a-popover>

    <div class="gohome" :style="{ opacity: timeDisable ? '1' : '0' }">
      {{ goHomeTime }}
    </div>
    <div class="textContent" :style="{ opacity: timeDisable ? '1' : '0' }">
      <p>{{ textContent }}</p>
      <div>
        <div style="
            display: flex;
            margin-top: 0px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.67);
          ">
          <div>——&nbsp{{ textAuth || "" }}</div>
          <div>《{{ textTitle }}》</div>
        </div>
      </div>
    </div>
    <!-- 风车 -->
    <div>
      <img class="wind_car" src="https://infinityicon.infinitynewtab.com/assets/windmill.svg" alt="" @click="getBgcImg"
        :style="{ transform: 'rotate(' + rotateNum + 'deg)' }" />
      <div style="
          position: absolute;
          z-index: 99;
          height: 40px;
          width: 6px;
          background-color: #fff;
          left: 48px;
          bottom: 0;
        "></div>
    </div>
    <!-- 注册 -->
    <div style="display: flex; justify-content: end; padding: 30px 40px">
      <wechat-outlined :rotate="1"  style="color: rgba(240, 248, 255, 0.639);font-size: 18px;margin-right:20px " @click="showChat" :class="[isPoint ? 'point' : '']"/>
      <home-outlined :rotate="1" style="color: rgba(240, 248, 255, 0.639); font-size: 18px" @click="showDrawer" />
    </div>
    <a-drawer v-model:open="open" class="custom-class" root-class-name="root-class-name" :root-style="{ color: 'blue' }"
      style="
        color: rgb(255, 255, 255);
        background: rgba(190, 182, 182, 0.1);
        backdrop-filter: blur(10px);
      " title="Basic Drawer" placement="right" width="500px" :closable="false" :headerStyle="{ display: 'none' }"
      :maskStyle="{ opacity: 0 }" @after-open-change="afterOpenChange">
      <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{ color: '#fff' }">
        <a-tab-pane key="1" tab="微博排行榜">
          <div class="hotClass">
            <div v-for="(item, index) in hotSearch" :key="index">
              <div style="display: flex" @click="linkUrl(item.url)" v-if="item.hot !== 'NaN万'">
                <div class="sort">{{ index + 1 + " ." }}</div>
                <div class="hot_item">{{ item.title }}</div>
                <div v-if="item.hot.slice(0, -1) > 250" style="color: red; margin-top: -2px; margin-left: 6px">
                  爆
                </div>
                <div v-if="item.hot.slice(0, -1) > 200 && item.hot.slice(0, -1) < 250
      " style="color: orange; margin-top: -2px; margin-left: 6px">
                  沸
                </div>
                <div v-if="item.hot.slice(0, -1) > 150 && item.hot.slice(0, -1) < 200
      " style="color: #fde78d; margin-top: -2px; margin-left: 6px">
                  热
                </div>
                <div class="hot_num">{{ item.hot }}</div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="百度排行榜">
          <div class="hotClass">
            <div v-for="(item, index) in hotSearch_baidu" :key="index">
              <div style="display: flex" @click="linkUrl(item.url)">
                <div class="sort">{{ index + 1 + " ." }}</div>
                <div class="hot_item">{{ item.title }}</div>
                <div class="hot_num">{{ item.hot }}</div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="抖音排行榜">
          <div class="hotClass">
            <div v-for="(item, index) in hotSearch_douyin" :key="index">
              <div style="display: flex" @click="linkUrl(item.url)">
                <div class="sort">{{ index + 1 + " ." }}</div>
                <div class="hot_item">{{ item.title }}</div>
                <div class="hot_num">{{ item.hot }}</div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="IT之家最新资讯">
          <div class="hotClass">
            <div style="overflow-y: scroll; height: 88vh; padding-right: 20px">
              <div v-for="(item, index) in hotSearch_it" :key="index">
                <div style="display: flex" @click="linkUrl(item.url)">
                  <div class="sort" style="min-width: 30px">
                    {{ index + 1 + " ." }}
                  </div>
                  <div class="hot_item">{{ item.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" tab="设置">
          <div style="color: rgb(255, 255, 255)">
            <div>遮罩百分比</div>
            <a-slider v-model:value="maskNum" :min="0" :max="10" :tooltipOpen="false" />
          </div>
          <div class="content" style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              color: rgb(64, 66, 67);
              margin-top: 20px;
            ">
            <div style="color: #fff">更改背景图片</div>
            <div style="
                border: 1px solid #535151;
                padding: 8px;
                color: #ffffff;
                border-radius: 10px;
                cursor: pointer;
              " @click="uploadImg">
              点击上传
            </div>
            <input style="display: none" type="file" ref="file" accept=".jpeg,.jpg" @change="upload" />
          </div>
          <div>
            <div style="color: #fff">留言板</div>
            <a-form style="margin-top: 20px" :model="formState" name="basic" :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }" autocomplete="off" labelAlign="left">
              <a-form-item label="联系方式" name="concact" :rules="[{ required: true, message: '请输入联系方式' }]">
                <a-input v-model:value="formState.concact" />
              </a-form-item>
              <a-form-item label="内容" name="content" :rules="[{ required: true, message: '请输入内容' }]">
                <a-textarea v-model:value="formState.content" />
              </a-form-item>
            </a-form>
            <div style="color: #fff; text-align: right">
              <span @click="submit" style="
                  border: 1px solid #535151;
                  padding: 8px 10px;
                  cursor: pointer;
                  border-radius: 10px;
                ">
                提交
              </span>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="6" tab="同城交友">
          <div style="
              width: 100%;
              height: 70vh;
              border: 1px solid #bbb;
              padding: 14px 14px 50px;
              overflow-y: auto;
            " ref="chatContainer">
            <div class="chat" v-for="(item, index) in chatData" :key="index" >
              <div style="font-size: 15px;">
                {{ item.message }}
              </div>
            </div>
          </div>
          <EmojiPicker v-if="isShowEmoji" :native="true" @select="onSelectEmoji" theme="dark" style="width: 100%;position: absolute;left: 0;top: 250px;" hide-search/>
          <a-input v-model:value="chatContent" @keyup.enter.native="sendMessage"
            style="background-color: transparent; color: #fff; margin-top: 10px" @focus.prevent.stop="isShowEmoji = false">
            <template #prefix >
              <smile-outlined @click.prevent.stop="isShowEmoji = true" style="margin-right: 10px;font-size: 18px;"/>
            </template>
            <template #suffix>
              <!-- <a-tooltip title="发送 🚀🚀🚀"> -->
                <send-outlined style="color: #fff;transform: rotate(-45deg);font-size: 18px;margin-bottom: 4px;" @click="sendMessage"/>
              <!-- </a-tooltip> -->
            </template>
          </a-input>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <!-- // 下雪效果 -->
    <!-- <div v-for="item of 300" :key="item" class="snowflake"></div> -->
    
  </div>
</template>
<script setup lang="ts">
// import EmojiPicker from 'vue-emoji-picker';
import { onMounted, ref, watch, reactive } from "vue";
import dayjs from 'dayjs'
// import  { userQuery }  from '@/api/user.ts'
import { message } from 'ant-design-vue';
import Icon, {
  HomeOutlined,WechatOutlined,SmileOutlined,SendOutlined
} from '@ant-design/icons-vue';
import axios from "axios";
import bgpng from '@/assets/bg.webp';
const hour = ref<number | null | string>(null);
const minute = ref<number | null | string>(null);
const searchWord = ref<string>('');
const place = ref<string>('');
const timeDisable = ref<boolean>(false);
const isFocus = ref<boolean>(false);
const textContent = ref<string>('');
const textAuth = ref<string>('');
const textTitle = ref<string>('');
const countdown = ref<number | null>(null);
const maskNum = ref<number | null>(10);
const open = ref<boolean>(false);
const activeKey = ref<string>('1');
const cover = ref<any>(null);
const currentIndex = ref<number | null>(null);
const currentUrl = ref<string>('https://www.baidu.com/s?ie=utf-8&word=');
const goHomeTime = ref<string>('');
const visible = ref<boolean>(false);
const isSend = ref<boolean>(false);
const isShowTime = ref<boolean>(false);
const isShowEmoji = ref<boolean>(false);
const successBroard = ref<boolean>(false);
const bgUrl = ref<string | null | Promise<any>>('');
const hotSearch = ref<any>([])
const hotSearch_baidu = ref<any>([])
const hotSearch_douyin = ref<any>([])
const hotSearch_it = ref<any>([])
  const chatContainer = ref<any>(null);
const formState = reactive<any>({
  concact: '',
  content: ''
});
const chatData = ref<any>([])
  const chatContent = ref<any>('')
const currentIcon = ref<string>('M391.29239703 46.93423408c16.77236148-3.2646637 34.23649185 0.81313185 49.1762726 8.65317925 22.23369482 13.01010963 39.07887408 33.81172148 49.7952237 57.0284563 22.84050963 49.23695408 23.10750815 107.90381037 2.88843852 158.05098667-9.50272 21.90601482-23.26528 42.75617185-43.01103407 56.6765037-17.19713185 12.67029333-39.62500741 18.82339555-60.77857186 14.73346369-17.84035555-3.44670815-34.0908563-13.04651852-46.60337777-26.10517334-19.91566222-19.73361778-32.08836741-45.93588148-39.09101037-72.78136887-9.4905837-39.0060563-7.36673185-80.87627852 6.79632592-118.48666074 9.19931259-24.33327408 24.24832-47.05242075 45.34120297-62.6232889 10.53430518-7.53664 22.5977837-13.21642667 35.48653036-15.14609777zM670.42721185 68.77956741c17.10004148-3.93216 34.50349037 2.40298667 49.11559112 11.03189332 15.17037037 9.42990222 28.38679703 22.01524148 38.61769481 36.65161482 16.10486518 21.83319703 26.32362667 48.12041482 28.56884147 75.18435556 1.45635555 24.41822815-5.36424297 48.4845037-14.41792 70.92451555-10.43721482 24.47890963-25.00077037 47.80487111-45.40188443 65.20832-13.59265185 12.12416-30.41355852 20.70452148-48.43595852 23.67791408-18.50785185 2.9369837-37.71960889 0-55.11092148-6.65069038-19.6486637-7.70654815-36.0448-22.97400889-45.52324741-41.78526815-12.09988741-23.75073185-15.44950518-50.97244445-15.02473482-77.33247999 0.46117925-14.66064592 1.21362963-29.53974518 5.54628741-43.65425778 6.60214518-22.44001185 18.54426075-42.95035259 32.54954667-61.54315852 11.73579852-15.27959703 25.66826667-28.95720297 41.61536-39.81918814 8.5318163-5.49774222 17.94958222-9.72117333 27.90134518-11.89357037zM167.99668148 267.83909924c17.22140445-3.48311703 35.32875852-0.46117925 51.40935111 6.2380563 33.44763259 15.55873185 58.82462815 45.43829333 72.66000593 79.26215112 5.69192297 13.70187852 7.14827852 28.61738667 7.88859259 43.29016889 1.49276445 26.68771555-0.61895111 53.81233778-8.55608889 79.41992296-6.85700741 21.6147437-19.22389333 41.99158518-37.47688297 55.82696297-18.27726222 13.62906075-40.81436445 21.05647408-63.49710222 22.2458311-24.85513482 1.45635555-50.40203852-7.28177778-68.40016592-24.63668147-17.48840297-15.91068445-29.27274667-37.19774815-36.74870519-59.41930667-7.51236741-22.31864889-11.16539259-46.32424297-7.74295703-69.77156741 3.77438815-28.24116148 11.55375408-56.23959703 25.35272296-81.28891259 6.96623408-12.33047703 15.69223111-23.75073185 26.48139852-32.98645333 11.10471111-9.11435852 24.50318222-15.48591408 38.62983111-18.18017187zM828.86656 338.69079702c20.57102222-1.50490075 41.80954075 1.45635555 60.40234667 10.66780446 19.44234667 9.46631111 35.09816889 25.51049482 46.34851555 43.77562074 12.39115852 21.26279111 20.49820445 45.5353837 20.44965926 70.31770074 0.61895111 26.36003555 0.14563555 53.12056889-6.61428148 78.77669926-5.32783408 19.26030222-14.21160297 38.16865185-28.8479763 52.13752889-17.07576889 16.01991111-40.6444563 23.77500445-63.80050962 24.2240474-23.28955259 0.69176889-47.47719111-1.08013037-68.8128-11.25034666-20.82588445-8.89590518-37.0157037-26.89403259-45.28052149-47.80487112-9.52699259-23.87209482-11.4566637-49.92872297-11.34743704-75.39067259-0.0121363-29.53974518 3.2768-59.73485037 15.13396148-87.06578963 7.41527703-16.97867852 18.88407703-32.58595555 34.55203556-42.78044443 13.95674075-9.8425363 31.00823703-14.17519408 47.81700741-15.60727706zM496.92672 436.53361778c23.43518815-2.74280297 47.46505482 1.20149333 69.01911703 10.72848591 33.38695111 14.7456 59.68630518 41.83381333 79.9660563 71.62842074 26.16585482 39.3216 57.75663408 74.66249482 90.69454222 108.37712593 28.37466075 28.30184297 57.67168 55.74200889 88.4978726 81.37386667 6.96623408 6.01960297 14.49073778 11.40811852 20.9351111 18.0224 21.89387852 22.34292148 36.10548148 51.80984889 41.15418075 82.5874963 6.44437333 38.10797037-1.43208297 77.3203437-16.17768297 112.61269332-10.1459437 25.8745837-29.10283852 48.25391408-53.21765925 62.14997335-25.64399408 15.0854163-55.48714667 21.08074667-84.86912 22.99828148-41.42117925 2.34230518-82.87876741-4.07779555-122.72222815-15.0854163-50.76612741-15.99563852-105.40373333-19.61225482-157.80826074-10.32798816-26.00808297 5.44919703-52.1132563 10.75275852-78.60679111 13.16788149-32.30682075 3.42243555-64.90491259 3.76225185-97.3330963 1.96608-23.13178075-0.44904297-46.29997037-6.95409778-65.79086223-19.53943704-21.50551703-12.68242963-38.19292445-32.23400297-50.23213036-53.88515555-10.03671703-18.53212445-16.73595259-38.75119408-21.04433778-59.3343526-6.20164741-30.01306075-4.29624889-61.82229333 6.78418964-90.48822517 15.43736889-40.86290963 45.79024592-74.24986075 79.66264888-100.98612149 8.41045333-7.01477925 17.64617482-12.97370075 25.97167407-20.09770666 17.17285925-16.85731555 36.09334518-31.7970963 53.20552297-48.71509334 26.65130667-25.92312889 51.50644148-54.0793363 70.73033481-86.03420444 25.2192237-43.54503111 70.90024297-75.34212741 121.18091852-81.11900444z');
const iconList = ref<any>([{
  d: 'M391.29239703 46.93423408c16.77236148-3.2646637 34.23649185 0.81313185 49.1762726 8.65317925 22.23369482 13.01010963 39.07887408 33.81172148 49.7952237 57.0284563 22.84050963 49.23695408 23.10750815 107.90381037 2.88843852 158.05098667-9.50272 21.90601482-23.26528 42.75617185-43.01103407 56.6765037-17.19713185 12.67029333-39.62500741 18.82339555-60.77857186 14.73346369-17.84035555-3.44670815-34.0908563-13.04651852-46.60337777-26.10517334-19.91566222-19.73361778-32.08836741-45.93588148-39.09101037-72.78136887-9.4905837-39.0060563-7.36673185-80.87627852 6.79632592-118.48666074 9.19931259-24.33327408 24.24832-47.05242075 45.34120297-62.6232889 10.53430518-7.53664 22.5977837-13.21642667 35.48653036-15.14609777zM670.42721185 68.77956741c17.10004148-3.93216 34.50349037 2.40298667 49.11559112 11.03189332 15.17037037 9.42990222 28.38679703 22.01524148 38.61769481 36.65161482 16.10486518 21.83319703 26.32362667 48.12041482 28.56884147 75.18435556 1.45635555 24.41822815-5.36424297 48.4845037-14.41792 70.92451555-10.43721482 24.47890963-25.00077037 47.80487111-45.40188443 65.20832-13.59265185 12.12416-30.41355852 20.70452148-48.43595852 23.67791408-18.50785185 2.9369837-37.71960889 0-55.11092148-6.65069038-19.6486637-7.70654815-36.0448-22.97400889-45.52324741-41.78526815-12.09988741-23.75073185-15.44950518-50.97244445-15.02473482-77.33247999 0.46117925-14.66064592 1.21362963-29.53974518 5.54628741-43.65425778 6.60214518-22.44001185 18.54426075-42.95035259 32.54954667-61.54315852 11.73579852-15.27959703 25.66826667-28.95720297 41.61536-39.81918814 8.5318163-5.49774222 17.94958222-9.72117333 27.90134518-11.89357037zM167.99668148 267.83909924c17.22140445-3.48311703 35.32875852-0.46117925 51.40935111 6.2380563 33.44763259 15.55873185 58.82462815 45.43829333 72.66000593 79.26215112 5.69192297 13.70187852 7.14827852 28.61738667 7.88859259 43.29016889 1.49276445 26.68771555-0.61895111 53.81233778-8.55608889 79.41992296-6.85700741 21.6147437-19.22389333 41.99158518-37.47688297 55.82696297-18.27726222 13.62906075-40.81436445 21.05647408-63.49710222 22.2458311-24.85513482 1.45635555-50.40203852-7.28177778-68.40016592-24.63668147-17.48840297-15.91068445-29.27274667-37.19774815-36.74870519-59.41930667-7.51236741-22.31864889-11.16539259-46.32424297-7.74295703-69.77156741 3.77438815-28.24116148 11.55375408-56.23959703 25.35272296-81.28891259 6.96623408-12.33047703 15.69223111-23.75073185 26.48139852-32.98645333 11.10471111-9.11435852 24.50318222-15.48591408 38.62983111-18.18017187zM828.86656 338.69079702c20.57102222-1.50490075 41.80954075 1.45635555 60.40234667 10.66780446 19.44234667 9.46631111 35.09816889 25.51049482 46.34851555 43.77562074 12.39115852 21.26279111 20.49820445 45.5353837 20.44965926 70.31770074 0.61895111 26.36003555 0.14563555 53.12056889-6.61428148 78.77669926-5.32783408 19.26030222-14.21160297 38.16865185-28.8479763 52.13752889-17.07576889 16.01991111-40.6444563 23.77500445-63.80050962 24.2240474-23.28955259 0.69176889-47.47719111-1.08013037-68.8128-11.25034666-20.82588445-8.89590518-37.0157037-26.89403259-45.28052149-47.80487112-9.52699259-23.87209482-11.4566637-49.92872297-11.34743704-75.39067259-0.0121363-29.53974518 3.2768-59.73485037 15.13396148-87.06578963 7.41527703-16.97867852 18.88407703-32.58595555 34.55203556-42.78044443 13.95674075-9.8425363 31.00823703-14.17519408 47.81700741-15.60727706zM496.92672 436.53361778c23.43518815-2.74280297 47.46505482 1.20149333 69.01911703 10.72848591 33.38695111 14.7456 59.68630518 41.83381333 79.9660563 71.62842074 26.16585482 39.3216 57.75663408 74.66249482 90.69454222 108.37712593 28.37466075 28.30184297 57.67168 55.74200889 88.4978726 81.37386667 6.96623408 6.01960297 14.49073778 11.40811852 20.9351111 18.0224 21.89387852 22.34292148 36.10548148 51.80984889 41.15418075 82.5874963 6.44437333 38.10797037-1.43208297 77.3203437-16.17768297 112.61269332-10.1459437 25.8745837-29.10283852 48.25391408-53.21765925 62.14997335-25.64399408 15.0854163-55.48714667 21.08074667-84.86912 22.99828148-41.42117925 2.34230518-82.87876741-4.07779555-122.72222815-15.0854163-50.76612741-15.99563852-105.40373333-19.61225482-157.80826074-10.32798816-26.00808297 5.44919703-52.1132563 10.75275852-78.60679111 13.16788149-32.30682075 3.42243555-64.90491259 3.76225185-97.3330963 1.96608-23.13178075-0.44904297-46.29997037-6.95409778-65.79086223-19.53943704-21.50551703-12.68242963-38.19292445-32.23400297-50.23213036-53.88515555-10.03671703-18.53212445-16.73595259-38.75119408-21.04433778-59.3343526-6.20164741-30.01306075-4.29624889-61.82229333 6.78418964-90.48822517 15.43736889-40.86290963 45.79024592-74.24986075 79.66264888-100.98612149 8.41045333-7.01477925 17.64617482-12.97370075 25.97167407-20.09770666 17.17285925-16.85731555 36.09334518-31.7970963 53.20552297-48.71509334 26.65130667-25.92312889 51.50644148-54.0793363 70.73033481-86.03420444 25.2192237-43.54503111 70.90024297-75.34212741 121.18091852-81.11900444z',
  p_id: '4812',
  name: '百度',
  url: 'https://www.baidu.com/s?ie=utf-8&word='
},
{
  d: 'M99.555556 0 99.555556 863.317333 332.145778 1021.340444 924.444444 668.046222 924.444444 418.816 407.936 260.792889 519.04 488.177778 666.439111 557.553778 120.917333 850.474667 338.275556 643.626667 330.680889 61.667556Z',
  p_id: '2422',
  name: '必应',
  url: 'https://www.bing.com/search?q='
},
{
  d: 'M451 1024V691.8L229 96h111.6l163.6 459.4L692.4 0h102.6L553.6 695.6V1024h-102.6z',
  p_id: '2822',
  name: 'Yandex',
  url: 'https://yandex.com/search/?text='
},
{
  d: 'M510.705989 0C794.46148 0 1023.998922 228.998496 1023.998922 511.999461a508.011255 508.011255 0 0 1-116.089141 324.176501 497.124529 497.124529 0 0 1-201.188841 149.234369 499.226422 499.226422 0 0 1-193.481901 38.588591C229.591337 1023.998922 0 795.000426 0 511.999461S229.591337 0 510.705989 0z m2.586944 46.349425C255.352994 46.349425 46.349425 254.652364 46.349425 511.999461c0 257.293203 208.949675 465.650036 466.889614 465.650036 59.284148 0 113.502196-12.826934 170.253294-30.827757a459.398253 459.398253 0 0 0 185.667173-133.820491A465.488352 465.488352 0 0 0 980.128652 511.999461c0-257.293203-208.89578-465.650036-466.835719-465.650036z m-275.401815 256.269204c155.593941-181.14002 555.600257-23.282502 555.600257-23.282502v116.412509s-91.405377-46.565004-266.670877-62.086671c-148.21037-12.934723-96.309793 49.151948-96.309793 49.151948 93.776743 56.912782 177.79855 77.608339 177.798549 77.608339 212.34504 59.553622 199.949263 144.976689 199.949264 144.97669-4.904416 357.052256-592.572008 134.521122-592.572008 134.521121l7.383571-131.988071c90.327484 87.524961 246.675951 92.860534 272.814871 93.183902h3.772627c232.070493-20.695557 46.888372-111.292514 46.888372-108.70557-143.198165-38.80417-251.84984-103.477786-306.121783-155.216679-54.379732-51.738893-2.53305-134.575016-2.53305-134.575016z" fill="#000000" fill-opacity=".4" p-id="4535"></path></svg><svg t="1705478410802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4534" width="200" height="200"><path d="M510.705989 0C794.46148 0 1023.998922 228.998496 1023.998922 511.999461a508.011255 508.011255 0 0 1-116.089141 324.176501 497.124529 497.124529 0 0 1-201.188841 149.234369 499.226422 499.226422 0 0 1-193.481901 38.588591C229.591337 1023.998922 0 795.000426 0 511.999461S229.591337 0 510.705989 0z m2.586944 46.349425C255.352994 46.349425 46.349425 254.652364 46.349425 511.999461c0 257.293203 208.949675 465.650036 466.889614 465.650036 59.284148 0 113.502196-12.826934 170.253294-30.827757a459.398253 459.398253 0 0 0 185.667173-133.820491A465.488352 465.488352 0 0 0 980.128652 511.999461c0-257.293203-208.89578-465.650036-466.835719-465.650036z m-275.401815 256.269204c155.593941-181.14002 555.600257-23.282502 555.600257-23.282502v116.412509s-91.405377-46.565004-266.670877-62.086671c-148.21037-12.934723-96.309793 49.151948-96.309793 49.151948 93.776743 56.912782 177.79855 77.608339 177.798549 77.608339 212.34504 59.553622 199.949263 144.976689 199.949264 144.97669-4.904416 357.052256-592.572008 134.521122-592.572008 134.521121l7.383571-131.988071c90.327484 87.524961 246.675951 92.860534 272.814871 93.183902h3.772627c232.070493-20.695557 46.888372-111.292514 46.888372-108.70557-143.198165-38.80417-251.84984-103.477786-306.121783-155.216679-54.379732-51.738893-2.53305-134.575016-2.53305-134.575016z',
  p_id: '4535',
  name: '搜狗',
  url: 'https://www.sogou.com/web?query=',
}
]);
const afterOpenChange = (bool: boolean) => {
  console.log('open', bool);
};

const showDrawer = () => {
  activeKey.value = '1'
  open.value = true;
};

function timeChange() {
  let now = dayjs();
  hour.value = now.hour().toString().length === 1 ? `0${now.hour()}` : now.hour();
  minute.value = now.minute().toString().length === 1 ? `0${now.minute()}` : now.minute();
}
timeChange();
setInterval(timeChange, 1000); // 每隔1000毫秒（1秒）更新一次时间
setTimeout(() => {
  timeDisable.value = true;  // 进入页面1秒后，渲染页面时间
}, 800)

// 默认读取背景图片
const getBgUrl = () => {
  bgUrl.value = localStorage.getItem('bgUrl') ? localStorage.getItem('bgUrl') : bgpng
}
getBgUrl()

// 请求第三方接口
function getText() {
  axios.get('https://api.vvhan.com/api/ian/shici?type=json')
    .then(response => {

      textContent.value = response.data.data.content;
      textTitle.value = response.data.data.form;
    })
}
getText();

const linkUrl = (url: string) => {
  window.open(url);
}
// 微博实时热搜
axios.get('https://api.vvhan.com/api/hotlist/wbHot')
  .then(response => {
    console.log('weibo', response);
    hotSearch.value = response.data.data.splice(0, 20);
  })
// 百度实时热搜
axios.get('https://api.vvhan.com/api/hotlist/baiduRD')
  .then(response => {

    hotSearch_baidu.value = response.data.data.splice(0, 20);
  })
// douyin实时热搜
axios.get('https://api.vvhan.com/api/hotlist/douyinHot')
  .then(response => {

    hotSearch_douyin.value = response.data.data.splice(0, 20);
  })
// it实时热搜
axios.get('https://api.vvhan.com/api/hotlist/itNews')
  .then(response => {

    hotSearch_it.value = response.data.data;
  })

function linkSearch() {
  window.open(currentUrl.value + searchWord.value);
}
if (localStorage.getItem('sister') !== '1') {
  searchWord.value = '妹妹说紫色很有韵味！꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱ ';
  localStorage.setItem('sister', '1')
}
function searchBlur() {
  if (searchWord.value === '妹妹说紫色很有韵味！꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱ ') {
    searchWord.value = '';
  }
}
const file = ref<any>(null);
function uploadImg() {
  file.value.click();
}

// emoji
const onSelectEmoji = (emoji:any) => {
  console.log('emoji',emoji);
  chatContent.value += emoji.i
  
}

const fileToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    // 创建一个新的 FileReader 对象
    const reader = new FileReader();
    // 读取 File 对象
    reader.readAsDataURL(file);
    // 加载完成后
    reader.onload = function () {
      // 将读取的数据转换为 base64 编码的字符

      if (reader.result) {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        }
      } else {
        // 处理reader.result为null的情况
        console.error("reader.result is null");
      }
    };
    // 加载失败时
    reader.onerror = function () {
      reject(new Error("Failed to load file"));
    };
  });
}
async function upload(event: any) {
  let file = event.target.files[0];
  const base64 = await fileToBase64(file)
  bgUrl.value = 'data:image/png;base64,' + base64;
  localStorage.setItem('bgUrl', bgUrl.value)
  message.success('壁纸更换成功~ (*^▽^*)')
}
// 倒计时
const createCountdown = () => {
  const targetDate: any = new Date('2024-02-10T00:00:00+08:00');
  const currentDate: any = new Date();
  const diffTime = targetDate - currentDate;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  countdown.value = days;
  place.value = '距离除夕还剩 ' + countdown.value + ' 天'
};
createCountdown();

const goHome = () => {
  // 获取当前时间
  let now: any = new Date();

  // 设置晚上7点的时间
  let sevenPM: any = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 28, 0);

  // 计算倒计时
  let diff = sevenPM - now;
  let hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
  // let minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
  // let secondsLeft = Math.floor((diff / 1000) % 60);
  isShowTime.value = hoursLeft <= 8 && hoursLeft >= 0 ? true : false
  // 输出倒计时结果
  // goHomeTime.value = "🚶🚶🚶 🚇 🏡 => " +  hoursLeft + " : " + minutesLeft + " : " + secondsLeft

}
setInterval(goHome, 1000);
const rotateNum = ref(0)
const a = ref(1)
const b = ref(1)
const getBgcImg = () => {
  if (a.value > 3) return
  const timer = setInterval(() => {
    if (a.value < 3 && b.value == 1) {
      a.value = a.value + 0.01
    } else {
      a.value = a.value - 0.01
      b.value = 2
      if (a.value < 0) {
        a.value = 1
        clearInterval(timer)
      }
    }
    rotateNum.value = rotateNum.value - a.value
    if (rotateNum.value < -360) {
      rotateNum.value = 0
    }
  }, 10)
  axios.get('https://api.vvhan.com/api/wallpaper/views?type=json').then(res => {
    console.log('res图片', res);
    bgUrl.value = res.data.url
    localStorage.setItem('bgUrl', bgUrl.value)
    b.value = 1
    a.value = 1
  })
}
const info = () => {
  message.success('欢迎回来~');
}
setTimeout(() => {
  info()
}, 1500);
// 留言提交
const submit = () => {
  if (isSend.value) {
    message.warn('发送中，请稍后~')
    return
  }
  if (!formState.content || !formState.concact) {
    message.warn('请添加内容~')
    return
  }
  console.log('formState', formState);

  isSend.value = true
  message.warn('发送中，请稍后~')
  const data = {
    content: formState.content,
    concact: formState.concact,
  }
  console.log('data', data);

  axios.post('http://106.15.65.191:888/api/message', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    console.log('res', res);
    message.success('留言成功~');
    formState.content = ''
    formState.concact = ''
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    isSend.value = false
  })
  console.log('data', data);

}
// userQueryEvent()
const mouseenterIcon = (val: any) => {
  currentIndex.value = val;
}
const mouseenterSuccess = (val: any) => {
  currentIndex.value = val;
}
const mouseLeave = () => {
  currentIndex.value = 11;
}
const chooseIcon = (val: any) => {
  currentIcon.value = iconList.value[val].d;
  currentUrl.value = iconList.value[val].url;
  visible.value = false;
}
onMounted(() => {
  console.log('cover.value', cover.value);

})
watch(maskNum, (newVal) => {
  console.log('newVal', newVal);
  let newvalue: any = newVal;
  cover.value.style.opacity = (+newvalue / 10);
})
watch(searchWord, (newVal) => {
  if (newVal.length > 0 && successList.value.length > 0) {
    successBroard.value = true;
  } else {
    successBroard.value = false;
  }
})
const successList = ref([])

watch(successList, (newVal) => {
  if (newVal.length === 0 || searchWord.value.length === 0) {
    successBroard.value = false;
  } else {
    successBroard.value = true;
  }
})
const getJsonp = () => {
  //组装查询地址
  let sugurl = "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
  let content = searchWord.value
  sugurl = sugurl.replace("#content#", content);
  //定义回调函数
  window.baidu = {
    sug: function (json: any) {
      console.log(json.s)
      successList.value = json.s;
    }
  }
  //动态添加JS脚本
  let script = document.createElement("script");
  script.src = sugurl;
  document.getElementsByTagName("head")[0].appendChild(script);
}
const changeVal = () => {
  getJsonp()
}
const jumpPageLink = (item: string) => {
  window.open(currentUrl.value + item);
}
// 获取时间
const getTime = () => {
  axios.get('https://api.vvhan.com/api/weather').then(res => {
    console.log('res', res);

  })
}
getTime()
// 获取天气
const getWether = () => {
  axios.get('https://api.vvhan.com/api/weather').then(res => {
    console.log('res', res);
    const { data } = res
    console.log('data', data);

    goHomeTime.value = data.city + " " + data.data.type + " " + data.data.low + " ~ " + data.data.high

  })
}
getWether()
// 获取时间

// 聊天室
const socket = new WebSocket('ws://106.15.65.191:3000');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
  
  // 设置消息接收处理函数
  socket.onmessage = (event) => {
    const message = event.data;
    console.log('Received message: ', message); // 确保接收到消息
    const jspMsg = JSON.parse(message)
    console.log('11',jspMsg[jspMsg.length - 1].message );
    console.log('localStorage.getItem()',localStorage.getItem('lastMsgId') );
    
    
    let isLastMsg = jspMsg[jspMsg.length - 1].message == localStorage.getItem('lastMsgId') ? true : false
    console.log('isLastMsg',isLastMsg);
    
    if(!isLastMsg && !open.value){
      isPoint.value = true
    }


    jspMsg.forEach((item: any) => {
      chatData.value.push(item)
    })
    
    if(chatContainer.value){
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight - 100,
        behavior: 'smooth',
      });
    }
    
  };

  socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
    chatData.value.push()
    console.log('chatData.value',chatData.value);
    
  };
};

socket.onerror = (error) => {
  message.error('服务中断，请稍后重试！')
  console.error('WebSocket error: ', error);
};


//   watchEffect(() => {
//     console.log('888');
//     console.log('chatContainer.value',chatContainer.value);
    
//   if (chatContainer?.value?.scrollHeight) {
//     chatContainer.value.scrollTo({
//         top: chatContainer.value.scrollHeight - 100,
//         behavior: 'smooth',
//       });
    
//   }
// });
const sendMessage = () => {
  if(!chatContent.value) {
    message.warning('请输入内容')
    return
  }
  socket.send(chatContent.value);
  isShowEmoji.value = false
  localStorage.setItem('lastMsgId', chatContent.value)
  chatContent.value = '';
}

const isPoint = ref<boolean>(false)
const showChat = () => {
isPoint.value = false
open.value = true
activeKey.value = '6'
localStorage.setItem('lastMsgId', chatData.value[chatData.value.length - 1].message)
setTimeout( () => {
  if(chatContainer.value){
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight - 100
      });
    }
},200)  


}
</script>
<style lang="scss" scoped>
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

::selection {
  background-color: #fbbe08;
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
    font-family: -apple-system, BlinkMacSystemFont;
    font-weight: 400;
    font-size: 42px;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
    animation: delayedFadeIn 2s;
    transition: 0.5s;
    z-index: 1;
    position: fixed;
    cursor: pointer;
    animation: testEnd 0.25s forwards ease-in-out;
  }

  .time:hover {
    font-size: 56px;
    animation: testStart 0.25s forwards ease-in-out;
  }
  .point {
    position: relative;
    &::after {
      content: '';
      left: 14px;
      top: 0;
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: red;
      border-radius: 10px;
    }
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
    object-fit: cover;
    /* 设置为 cover 时，图片会自动填充其容器，并保持比例 */
    width: 100%;
    /* 设置图片的宽度为 100% */
    height: 100vh;
    /* 设置图片的高度为自动 */
    z-index: 0;
    position: fixed;
    transition: 0.3s;
  }

  .bgboxFilter {
    transform: scale(1.05);
    filter: blur(6px);
  }

  .cover {
    z-index: 0;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(0,0,0,.35);
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 0.655) 100%),
      radial-gradient(rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.3) 166%);
    transition: 0.25s;
  }

  input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #ffffffb8;
    /* placeholder字体大小 */
    font-size: 12px;
  }

  .searchBar {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    max-width: 80%;
    height: 43px;
    border-radius: 30px;
    color: #fff;
    // background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
    -webkit-backdrop-filter: blur(10px) saturate(1.5);
    backdrop-filter: blur(10px) saturate(1.5);
    overflow: hidden;
    transition: color 0.25s, background-color 0.25s, box-shadow 0.25s,
      left 0.25s, opacity 0.25s, top 0.25s, width 0.25s;
    padding: 0 12px;
    z-index: 999;
    display: flex;
    align-items: center;

    // &:hover {
    //   width: 500px;
    // }
    .icon {
      cursor: pointer;
      padding: 6px;
      transition: 0.2s;

      &:hover {
        background-color: rgba(135, 130, 130, 0.586);
        border-radius: 50%;
      }
    }

    .searchWord {
      outline: 0;
      border: none;
      width: 100%;
      height: 100%;
      font-size: 15px;
      color: #ffffff;
      // padding: 0 20px;
      // color: inherit;
      // background-color: red;ß
      // font-size: 14px;
      // text-align: center;
      // z-index:99
    }
  }

  .card {
    position: absolute;
    top: 400px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    max-width: 80%;
    height: 120px;
    border-radius: 50%;
    color: #fff;
    // background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
    -webkit-backdrop-filter: blur(10px) saturate(1.5);
    backdrop-filter: blur(10px) saturate(1.5);
    overflow: hidden;
    transition: color 0.25s, background-color 0.25s, box-shadow 0.25s,
      left 0.25s, opacity 0.25s, top 0.25s, width 0.25s;
    padding: 0 12px;
    z-index: 999;
    display: flex;
    align-items: center;
  }

  .wind_car {
    position: absolute;
    z-index: 9999;
    bottom: 20px;
    left: 30px;
  }

  .gohome {
    position: fixed;
    bottom: 40px;
    left: 93%;
    width: 200px;
    color: #ffffff77;
    font-size: 14px;
    transform: translateX(-50%);
    transition: all 0.3s linear;
  }

  .textContent {
    position: fixed;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    transition: 0.5s;
  }
}

.hotClass {
  position: absolute;
  left: 48%;
  transform: translateX(-50%);
  width: 1000px;
  max-width: 100%;
  height: 43px;
  border-radius: 30px;
  color: #ffffffc9;
  z-index: 999;
  margin-top: 10px;

  .sort {
    font-size: 16px;
    margin-right: 8px;
    width: 28px;
    text-align: right;
    font-family: fantasy;
  }

  .hot_item {
    margin-bottom: 8px;
    font-size: 16px;
    font-family: fantasy;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }

  .hot_num {
    font-family: fantasy;
    margin-left: 20px;
    width: 100px;
  }
}

.searchBar input {
  text-align: center;
  background-color: inherit;
}

::v-deep .ant-form-item-required {
  color: #fff !important;
}

::v-deep #basic_content {
  background-color: transparent;
  color: #fff;
}

::v-deep #basic_concact {
  background-color: transparent;
  color: #fff;
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
  &::before {
    content: "";
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

::v-deep(.ant-tabs-tab-btn) {
  color: rgba(255, 255, 255, 0.554) !important;
}

.iconList {
  // color: #07c3d0 !important;
  background-color: #ffffff58;
  border-radius: 20px;
  transition: 0.1s linear;
}

.successList {
  background-color: #ffffff58;
  // padding: 8px;
  border-radius: 20px;
  // transition: .4s linear;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #000000;
}

/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #ffffffc9;
}

-webkit-user-drag:none

/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(252, 66, 66, 0.3);
  background-color: #00000072;
}

.chat {
  color: rgb(255, 255, 255) !important;
  text-shadow: 0 0 2px rgb(255, 255, 255);
  margin-bottom: 8px;
}
::v-deep .ant-input {
  background-color: transparent !important;
  color: #ffffff;
  font-size: 15px !important; 
}
::v-deep .v3-footer, .v3-sticky {
  display: none !important;
}
</style>
