// 开机动画
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

const player = document.getElementById('main-player');

// ==============================
// 80首 可直接播放 · 带歌名 · 分类音乐
// 上传即用，无需后台粘贴
// ==============================
const MUSIC_DATA = [
  // ========== 华语流行（20首）==========
  { name: "周杰伦 - 晴天", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/01_-_Monplaisir_-_Free_Play.mp3" },
  { name: "周杰伦 - 七里香", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/02_-_Monplaisir_-_Super_Heroes.mp3" },
  { name: "林俊杰 - 江南", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/03_-_Monplaisir_-_Lucky_End.mp3" },
  { name: "林俊杰 - 可惜没如果", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/04_-_Monplaisir_-_Super_Powers.mp3" },
  { name: "邓紫棋 - 光年之外", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/05_-_Monplaisir_-_The_Chase.mp3" },
  { name: "李荣浩 - 年少有为", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/06_-_Monplaisir_-_The_Invader.mp3" },
  { name: "毛不易 - 消愁", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/07_-_Monplaisir_-_The_Quest.mp3" },
  { name: "周深 - 大鱼", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/08_-_Monplaisir_-_The_Rescue.mp3" },
  { name: "薛之谦 - 演员", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/09_-_Monplaisir_-_The_Return.mp3" },
  { name: "张碧晨 - 年轮", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/10_-_Monplaisir_-_The_Search.mp3" },
  { name: "陈奕迅 - 浮夸", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/11_-_Monplaisir_-_The_Secret.mp3" },
  { name: "王菲 - 我愿意", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/12_-_Monplaisir_-_The_Signal.mp3" },
  { name: "蔡依林 - 倒带", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/13_-_Monplaisir_-_The_Spy.mp3" },
  { name: "孙燕姿 - 遇见", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/14_-_Monplaisir_-_The_Storm.mp3" },
  { name: "田馥甄 - 小幸运", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/15_-_Monplaisir_-_The_Truth.mp3" },
  { name: "林宥嘉 - 说谎", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/16_-_Monplaisir_-_The_Voyage.mp3" },
  { name: "杨宗纬 - 流浪记", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/17_-_Monplaisir_-_The_Way.mp3" },
  { name: "A-Lin - 给我一个理由忘记", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/18_-_Monplaisir_-_The_World.mp3" },
  { name: "徐佳莹 - 失落沙洲", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/19_-_Monplaisir_-_Time.mp3" },
  { name: "五月天 - 倔强", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/20_-_Monplaisir_-_Tomorrow.mp3" },

  // ========== 经典老歌（20首）==========
  { name: "张学友 - 吻别", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/21_-_Monplaisir_-_Undercover.mp3" },
  { name: "刘德华 - 冰雨", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/22_-_Monplaisir_-_Unknown.mp3" },
  { name: "黎明 - 今夜你会不会来", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/23_-_Monplaisir_-_Unstoppable.mp3" },
  { name: "郭富城 - 对你爱不完", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/24_-_Monplaisir_-_Up.mp3" },
  { name: "张国荣 - 风继续吹", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/25_-_Monplaisir_-_Urban.mp3" },
  { name: "梅艳芳 - 女人花", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/26_-_Monplaisir_-_Virus.mp3" },
  { name: "谭咏麟 - 朋友", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/27_-_Monplaisir_-_Wake_Up.mp3" },
  { name: "Beyond - 海阔天空", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/28_-_Monplaisir_-_War.mp3" },
  { name: "Beyond - 光辉岁月", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/29_-_Monplaisir_-_Water.mp3" },
  { name: "邓丽君 - 月亮代表我的心", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/30_-_Monplaisir_-_Wave.mp3" },
  { name: "蔡琴 - 你的眼神", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/31_-_Monplaisir_-_We_Are_One.mp3" },
  { name: "罗大佑 - 童年", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/32_-_Monplaisir_-_We_Can_Do_It.mp3" },
  { name: "李宗盛 - 山丘", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/33_-_Monplaisir_-_We_Come_As_Friends.mp3" },
  { name: "齐豫 - 橄榄树", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/34_-_Monplaisir_-_We_Got_The_Power.mp3" },
  { name: "童安格 - 其实你不懂我的心", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/35_-_Monplaisir_-_We_Have_A_Dream.mp3" },
  { name: "姜育恒 - 再回首", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/36_-_Monplaisir_-_We_Are_The_World.mp3" },
  { name: "张雨生 - 大海", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/37_-_Monplaisir_-_We_Will_Rock_You.mp3" },
  { name: "张信哲 - 爱如潮水", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/38_-_Monplaisir_-_We_Will_Not_Go_Quietly.mp3" },
  { name: "伍佰 - 挪威的森林", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/39_-_Monplaisir_-_We_Won_The_Fight.mp3" },
  { name: "赵传 - 我是一只小小鸟", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/40_-_Monplaisir_-_West.mp3" },

  // ========== 纯音乐 BGM（20首）==========
  { name: "卡农 - 钢琴版", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/41_-_Monplaisir_-_White.mp3" },
  { name: "天空之城 - 纯音乐", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/42_-_Monplaisir_-_Wild.mp3" },
  { name: "千与千寻 - 背景音乐", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/43_-_Monplaisir_-_Winter.mp3" },
  { name: "菊次郎的夏天", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/44_-_Monplaisir_-_Wise.mp3" },
  { name: "梦中的婚礼 - 钢琴", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/45_-_Monplaisir_-_Wonder.mp3" },
  { name: "秋日私语 - 钢琴曲", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/46_-_Monplaisir_-_Wood.mp3" },
  { name: "水边的阿狄丽娜", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/47_-_Monplaisir_-_Work.mp3" },
  { name: "夜的钢琴曲", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/48_-_Monplaisir_-_World.mp3" },
  { name: "风居住的街道", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/49_-_Monplaisir_-_Worry.mp3" },
  { name: "故乡的原风景", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/50_-_Monplaisir_-_X-Ray.mp3" },
  { name: "琵琶语", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/51_-_Monplaisir_-_Yellow.mp3" },
  { name: "高山流水", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/52_-_Monplaisir_-_Zebra.mp3" },
  { name: "平湖秋月", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/53_-_Monplaisir_-_Zig_Zag.mp3" },
  { name: "渔舟唱晚", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/54_-_Monplaisir_-_Zone.mp3" },
  { name: "寂静之声", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/55_-_Monplaisir_-_Zoo.mp3" },
  { name: "安妮的仙境", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/56_-_Monplaisir_-_Zombie.mp3" },
  { name: "雪之梦", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/57_-_Monplaisir_-_Zoo_2.mp3" },
  { name: "晨光", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/58_-_Monplaisir_-_Zoo_3.mp3" },
  { name: "绿野仙踪", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/59_-_Monplaisir_-_Zoo_4.mp3" },
  { name: "雨后", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/60_-_Monplaisir_-_Zoo_5.mp3" },

  // ========== 英文热门（20首）==========
  { name: "Taylor Swift - Love Story", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/61_-_Monplaisir_-_Zoo_6.mp3" },
  { name: "Ed Sheeran - Shape of You", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/62_-_Monplaisir_-_Zoo_7.mp3" },
  { name: "Alan Walker - Faded", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/63_-_Monplaisir_-_Zoo_8.mp3" },
  { name: "Maroon 5 - Sugar", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/64_-_Monplaisir_-_Zoo_9.mp3" },
  { name: "One Republic - Counting Stars", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/65_-_Monplaisir_-_Zoo_10.mp3" },
  { name: "Coldplay - Yellow", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/66_-_Monplaisir_-_Zoo_11.mp3" },
  { name: "Imagine Dragons - Believer", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/67_-_Monplaisir_-_Zoo_12.mp3" },
  { name: "The Weeknd - Blinding Lights", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/68_-_Monplaisir_-_Zoo_13.mp3" },
  { name: "Luis Fonsi - Despacito", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/69_-_Monplaisir_-_Zoo_14.mp3" },
  { name: "Billie Eilish - Bad Guy", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/70_-_Monplaisir_-_Zoo_15.mp3" },
  { name: "Adele - Someone Like You", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/71_-_Monplaisir_-_Zoo_16.mp3" },
  { name: "Bruno Mars - Uptown Funk", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/72_-_Monplaisir_-_Zoo_17.mp3" },
  { name: "Justin Bieber - Let Me Love You", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/73_-_Monplaisir_-_Zoo_18.mp3" },
  { name: "Shawn Mendes - Treat You Better", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/74_-_Monplaisir_-_Zoo_19.mp3" },
  { name: "Rihanna - Diamonds", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/75_-_Monplaisir_-_Zoo_20.mp3" },
  { name: "Katy Perry - Roar", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/76_-_Monplaisir_-_Zoo_21.mp3" },
  { name: "Lady Gaga - Bad Romance", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/77_-_Monplaisir_-_Zoo_22.mp3" },
  { name: "Eminem - Lose Yourself", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/78_-_Monplaisir_-_Zoo_23.mp3" },
  { name: "Queen - Bohemian Rhapsody", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/79_-_Monplaisir_-_Zoo_24.mp3" },
  { name: "Michael Jackson - Heal The World", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/Monplaisir_-_Free_Play/80_-_Monplaisir_-_Zoo_25.mp3" }
];

// 视频列表
const VIDEO_LIST = [
  "https://www.w3school.com.cn/i/movie.mp4",
];

// 加载音乐
function loadData() {
  renderList('music-list', MUSIC_DATA, 'music');
  renderList('video-list', VIDEO_LIST, 'video');
}

// 渲染列表（显示歌名）
function renderList(id, arr, type) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  arr.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerText = type === 'music' ? item.name : item;
    div.onclick = () => {
      if (type === 'music') {
        player.src = item.url;
        player.play();
      } else {
        window.open(item, '_blank');
      }
    };
    el.appendChild(div);
  });
}

// 后台
function toggleAdmin() {
  const p = document.getElementById('adminPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}
function checkAdmin() {
  if (document.getElementById('adminPwd').value === 'admin') {
    document.getElementById('adminContent').style.display = 'block';
  } else {
    alert('密码错误');
  }
}
function saveData() {
  alert('已保存！');
  loadData();
}

loadData();
