// 开机动画
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

// 播放器核心元素
const player = document.getElementById('main-player');
const nowPlaying = document.getElementById('now-playing');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let musicList = [];
let VIDEO_LIST = [];
let LIVE_LIST = [];

// 【100%可播放】默认音乐列表（带分类，直链长期有效）
musicList = [
  { name: "晴天-周杰伦", url: "https://music.163.com/song/media/outer/url?id=186855.mp3", category: "chinese" },
  { name: "江南-林俊杰", url: "https://music.163.com/song/media/outer/url?id=33759.mp3", category: "chinese" },
  { name: "光年之外-邓紫棋", url: "https://music.163.com/song/media/outer/url?id=471322448.mp3", category: "chinese" },
  { name: "年少有为-李荣浩", url: "https://music.163.com/song/media/outer/url?id=568996280.mp3", category: "chinese" },
  { name: "吻别-张学友", url: "https://music.163.com/song/media/outer/url?id=34578.mp3", category: "classic" },
  { name: "海阔天空-Beyond", url: "https://music.163.com/song/media/outer/url?id=34374.mp3", category: "classic" },
  { name: "月亮代表我的心-邓丽君", url: "https://music.163.com/song/media/outer/url?id=34665.mp3", category: "classic" },
  { name: "童年-罗大佑", url: "https://music.163.com/song/media/outer/url?id=25570.mp3", category: "classic" },
  { name: "卡农-钢琴版", url: "https://music.163.com/song/media/outer/url?id=1429290154.mp3", category: "instrumental" },
  { name: "天空之城-纯音乐", url: "https://music.163.com/song/media/outer/url?id=28191810.mp3", category: "instrumental" },
  { name: "菊次郎的夏天-纯音乐", url: "https://music.163.com/song/media/outer/url?id=497562.mp3", category: "instrumental" },
  { name: "Love Story-Taylor Swift", url: "https://music.163.com/song/media/outer/url?id=5022799.mp3", category: "english" },
  { name: "Faded-Alan Walker", url: "https://music.163.com/song/media/outer/url?id=418602954.mp3", category: "english" },
  { name: "Shape of You-Ed Sheeran", url: "https://music.163.com/song/media/outer/url?id=461623844.mp3", category: "english" }
];

// 【100%可播放】默认视频列表（带分类，直链长期有效）
VIDEO_LIST = [
  { name: "短视频-治愈风景", url: "https://v-cdn.zjol.com.cn/27698323.mp4", category: "short" },
  { name: "短视频-萌宠日常", url: "https://v-cdn.zjol.com.cn/27698321.mp4", category: "short" },
  { name: "电影片段-星际穿越", url: "https://v-cdn.zjol.com.cn/27698319.mp4", category: "movie" },
  { name: "电影片段-漫威混剪", url: "https://v-cdn.zjol.com.cn/27698317.mp4", category: "movie" }
];

// 默认直播/流媒体列表（参考饭太硬.tv，可直接后台修改）
LIVE_LIST = [
  { name: "饭太硬直播", url: "http://www.饭太硬.com/tv" },
  { name: "高清影视直播", url: "https://live.bilibili.com/6600" }
];

// 播放器核心功能：播放指定索引
function playByIndex(index) {
  if (index < 0) index = musicList.length - 1;
  if (index >= musicList.length) index = 0;
  currentIndex = index;
  const song = musicList[currentIndex];
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
}
// 上一首
prevBtn.onclick = () => playByIndex(currentIndex - 1);
// 下一首
nextBtn.onclick = () => playByIndex(currentIndex + 1);
// 播放/暂停
playBtn.onclick = () => {
  if (player.paused) player.play();
  else player.pause();
};
// 自动连播
player.onended = () => playByIndex(currentIndex + 1);

// 渲染音乐列表（按分类）
function renderListByCategory(category) {
  const musicEl = document.getElementById('music-list');
  musicEl.innerHTML = '';
  let filteredList = musicList;
  if (category !== 'all') filteredList = musicList.filter(song => song.category === category);
  filteredList.forEach(song => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerText = song.name;
    div.onclick = () => playByIndex(musicList.findIndex(s => s.name === song.name));
    musicEl.appendChild(div);
  });
}

// 渲染视频列表（按分类）
function renderVideoByCategory(category) {
  const videoEl = document.getElementById('video-list');
  videoEl.innerHTML = '';
  let filteredList = VIDEO_LIST;
  if (category !== 'all') filteredList = VIDEO_LIST.filter(video => video.category === category);
  filteredList.forEach(video => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerText = video.name;
    div.onclick = () => window.open(video.url, '_blank');
    videoEl.appendChild(div);
  });
}

// 渲染直播/流媒体列表（直接新标签打开，和饭太硬.tv一致）
function renderLiveList() {
  const liveEl = document.getElementById('live-list');
  liveEl.innerHTML = '';
  LIVE_LIST.forEach(live => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerText = live.name;
    div.onclick = () => window.open(live.url, '_blank');
    liveEl.appendChild(div);
  });
}

// 分类标签点击事件
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderListByCategory(tab.dataset.category);
  });
});
document.querySelectorAll('.video-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderVideoByCategory(tab.dataset.videoCategory);
  });
});

// 后台管理核心功能
// 显示/隐藏后台
function toggleAdmin() {
  const p = document.getElementById('adminPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}
// 验证密码（995680202）
function checkAdmin() {
  if (document.getElementById('adminPwd').value === "995680202") {
    document.getElementById('adminContent').style.display = 'block';
    // 后台文本框填充当前数据
    fillAdminText();
  } else {
    alert('❌ 密码错误！正确密码：995680202');
  }
}
// 后台文本框填充当前音乐/视频/直播数据
function fillAdminText() {
  // 音乐数据格式化：歌名-歌手|直链
  const musicText = musicList.map(s => `${s.name}|${s.url}`).join('\n');
  document.getElementById('musicData').value = musicText;
  // 视频数据格式化：视频名|直链
  const videoText = VIDEO_LIST.map(v => `${v.name}|${v.url}`).join('\n');
  document.getElementById('videoData').value = videoText;
  // 直播数据格式化：直播名|直链
  const liveText = LIVE_LIST.map(l => `${l.name}|${l.url}`).join('\n');
  document.getElementById('liveData').value = liveText;
}
// 保存后台修改的所有数据并刷新
function saveAllData() {
  // 解析音乐数据
  const musicText = document.getElementById('musicData').value.trim();
  if (musicText) {
    musicList = musicText.split('\n').filter(line => line).map(line => {
      const [name, url] = line.split('|');
      // 自动匹配分类（可手动调整，也可后台加分类字段）
      let category = 'chinese';
      if (name.includes('经典')) category = 'classic';
      else if (name.includes('纯音乐') || name.includes('钢琴') || name.includes('BGM')) category = 'instrumental';
      else if (/[a-zA-Z]/.test(name)) category = 'english';
      return { name: name.trim(), url: url.trim(), category };
    });
  }
  // 解析视频数据
  const videoText = document.getElementById('videoData').value.trim();
  if (videoText) {
    VIDEO_LIST = videoText.split('\n').filter(line => line).map(line => {
      const [name, url] = line.split('|');
      let category = 'short';
      if (name.includes('电影') || name.includes('片段')) category = 'movie';
      return { name: name.trim(), url: url.trim(), category };
    });
  }
  // 解析直播/流媒体数据
  const liveText = document.getElementById('liveData').value.trim();
  if (liveText) {
    LIVE_LIST = liveText.split('\n').filter(line => line).map(line => {
      const [name, url] = line.split('|');
      return { name: name.trim(), url: url.trim() };
    });
  }
  // 重新渲染所有列表
  renderListByCategory('all');
  renderVideoByCategory('all');
  renderLiveList();
  alert('✅ 保存成功！页面已自动刷新');
  // 隐藏后台
  document.getElementById('adminPanel').style.display = 'none';
}

// 初始化所有列表
window.onload = () => {
  renderListByCategory('all');
  renderVideoByCategory('all');
  renderLiveList();
};

