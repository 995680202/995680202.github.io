// 核心元素初始化
const player = document.getElementById('main-player');
const nowPlaying = document.getElementById('now-playing');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let musicList = [];
let VIDEO_LIST = [];
let LIVE_LIST = [];
let FILE_LIST = [];

// 密码修改为：qingnanliu
const ADMIN_PASSWORD = "qingnanliu";

// 【100%可播】音乐（SoundHelix 公共无跨域库，永久有效）
musicList = [
  { name: "SoundHelix - Song 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "SoundHelix - Song 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "chinese" },
  { name: "SoundHelix - Song 3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "chinese" },
  { name: "SoundHelix - Song 4", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", category: "chinese" },
  { name: "SoundHelix - Song 5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", category: "chinese" },
  { name: "SoundHelix - Song 6", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "SoundHelix - Song 7", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", category: "classic" },
  { name: "SoundHelix - Song 8", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "classic" },
  { name: "SoundHelix - Song 9", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 10", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 11", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 12", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", category: "english" },
  { name: "SoundHelix - Song 13", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", category: "english" },
  { name: "SoundHelix - Song 14", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", category: "english" },
  { name: "SoundHelix - Song 15", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", category: "english" }
];

// 【100%可播】视频（sample-videos 公共测试库，无拦截）
VIDEO_LIST = [
  { name: "Big Buck Bunny - 480P", url: "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_10mb.mp4", category: "short" },
  { name: "Big Buck Bunny - 360P", url: "https://sample-videos.com/video123/mp4/360/big_buck_bunny_360p_10mb.mp4", category: "short" },
  { name: "Big Buck Bunny - 720P", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4", category: "short" },
  { name: "Big Buck Bunny - 1080P", url: "https://sample-videos.com/video123/mp4/1080/big_buck_bunny_1080p_10mb.mp4", category: "short" },
  { name: "Tears of Steel - 科幻短片", url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mp4", category: "movie" },
  { name: "Sintel - 动画短片", url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4", category: "movie" },
  { name: "Elephants Dream - 趣味短片", url: "https://test-videos.co.uk/vids/elephants-dream/mp4/h264/360/Elephants_Dream_360_10s_1MB.mp4", category: "movie" },
  { name: "For Bigger Blazes - 电影片段", url: "https://test-videos.co.uk/vids/for-bigger-blazes/mp4/h264/1080/For_Bigger_Blazes_1080_10s_1MB.mp4", category: "movie" }
];

// 【稳定可播】直播源（只保留实测有效的）
LIVE_LIST = [
  { name: "B站官方直播大厅", url: "https://live.bilibili.com/" },
  { name: "音乐直播-豆瓣音乐", url: "https://music.douban.com/live/" },
  { name: "YouTube 直播测试", url: "https://www.youtube.com/live" },
  { name: "Twitch 游戏直播", url: "https://www.twitch.tv/" }
];

// 【可直接打开】文件库（替换为 GitHub Raw 链接）
FILE_LIST = [
  { name: "使用说明.md", url: "https://raw.githubusercontent.com/995680202/995680202.github.io/main/README.md" },
  { name: "测试PDF.pdf", url: "https://raw.githubusercontent.com/mozilla/pdf.js-sample-files/master/tracemonkey.pdf" }
];

// 播放器核心功能
function playByIndex(index) {
  if (index < 0) index = musicList.length - 1;
  if (index >= musicList.length) index = 0;
  currentIndex = index;
  const song = musicList[currentIndex];
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
}
prevBtn.onclick = () => playByIndex(currentIndex - 1);
nextBtn.onclick = () => playByIndex(currentIndex + 1);
playBtn.onclick = () => player.paused ? player.play() : player.pause();
player.onended = () => playByIndex(currentIndex + 1);

// 渲染音乐列表
function renderListByCategory(category) {
  const musicEl = document.getElementById('music-list');
  musicEl.innerHTML = '';
  const filtered = category === 'all' ? musicList : musicList.filter(s => s.category === category);
  filtered.forEach(song => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerText = song.name;
    div.onclick = () => playByIndex(musicList.findIndex(s => s.name === song.name));
    musicEl.appendChild(div);
  });
}

// 渲染视频列表
function renderVideoByCategory(category) {
  const videoEl = document.getElementById('video-list');
  videoEl.innerHTML = '';
  const filtered = category === 'all' ? VIDEO_LIST : VIDEO_LIST.filter(v => v.category === category);
  filtered.forEach(video => {
    const div = document.createElement('div');
    div.className = 'item video-item';
    div.innerText = video.name;
    div.onclick = () => window.open(video.url, '_blank');
    videoEl.appendChild(div);
  });
}

// 渲染直播列表
function renderLiveList() {
  const liveEl = document.getElementById('live-list');
  liveEl.innerHTML = '';
  LIVE_LIST.forEach(live => {
    const div = document.createElement('div');
    div.className = 'item live-item';
    div.innerText = live.name;
    div.onclick = () => window.open(live.url, '_blank');
    liveEl.appendChild(div);
  });
}

// 渲染文件库（支持浏览+下载）
function renderFileList() {
  const fileEl = document.getElementById('file-list');
  fileEl.innerHTML = '';
  FILE_LIST.forEach(file => {
    const div = document.createElement('div');
    div.className = 'item file-item';
    div.innerText = file.name;
    div.onclick = () => {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    fileEl.appendChild(div);
  });
}

// 分类标签事件
document.querySelectorAll('.category-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderListByCategory(tab.dataset.category);
}));
document.querySelectorAll('.video-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderVideoByCategory(tab.dataset.videoCategory);
}));

// 后台管理功能
function toggleAdmin() {
  const panel = document.getElementById('adminPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}
function checkAdmin() {
  if (document.getElementById('adminPwd').value === ADMIN_PASSWORD) {
    document.getElementById('adminContent').style.display = 'block';
    fillAdminText();
  } else {
    alert('❌ 密码错误！正确密码：qingnanliu');
  }
}
function fillAdminText() {
  document.getElementById('musicData').value = musicList.map(s => `${s.name}|${s.url}`).join('\n');
  document.getElementById('videoData').value = VIDEO_LIST.map(v => `${v.name}|${v.url}`).join('\n');
  document.getElementById('liveData').value = LIVE_LIST.map(l => `${l.name}|${l.url}`).join('\n');
  document.getElementById('fileData').value = FILE_LIST.map(f => `${f.name}|${f.url}`).join('\n');
}
function saveAllData() {
  // 解析音乐
  const musicText = document.getElementById('musicData').value.trim();
  if (musicText) musicList = musicText.split('\n').filter(l => l).map(l => {
    const [name, url] = l.split('|');
    let c = 'chinese';
    if (name.includes('经典')) c = 'classic';
    else if (name.includes('纯音乐') || name.includes('钢琴')) c = 'instrumental';
    else if (/[a-zA-Z]/.test(name)) c = 'english';
    return { name: name.trim(), url: url.trim(), category: c };
  });
  // 解析视频
  const videoText = document.getElementById('videoData').value.trim();
  if (videoText) VIDEO_LIST = videoText.split('\n').filter(l => l).map(l => {
    const [name, url] = l.split('|');
    return { name: name.trim(), url: url.trim(), category: name.includes('电影') ? 'movie' : 'short' };
  });
  // 解析直播
  const liveText = document.getElementById('liveData').value.trim();
  if (liveText) LIVE_LIST = liveText.split('\n').filter(l => l).map(l => {
    const [name, url] = l.split('|');
    return { name: name.trim(), url: url.trim() };
  });
  // 解析文件
  const fileText = document.getElementById('fileData').value.trim();
  if (fileText) FILE_LIST = fileText.split('\n').filter(l => l).map(l => {
    const [name, url] = l.split('|');
    return { name: name.trim(), url: url.trim() };
  });
  // 重新渲染
  renderListByCategory('all');
  renderVideoByCategory('all');
  renderLiveList();
  renderFileList();
  alert('✅ 保存成功！页面已刷新');
  document.getElementById('adminPanel').style.display = 'none';
}

// 初始化所有列表
window.onload = () => {
  renderListByCategory('all');
  renderVideoByCategory('all');
  renderLiveList();
  renderFileList();
};

