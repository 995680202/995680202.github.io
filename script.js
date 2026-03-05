const player = document.getElementById('main-player');
const nowPlaying = document.getElementById('now-playing');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');

const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const videoTitle = document.getElementById('video-title');

let currentIndex = 0;
let musicList = [];
let VIDEO_LIST = [];
let LIVE_LIST = [];
let FILE_LIST = [];

const ADMIN_PASSWORD = "qingnanliu";

// 音乐（只保留 全部、华语、经典）
musicList = [
  { name: "SoundHelix Song 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "SoundHelix Song 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "chinese" },
  { name: "SoundHelix Song 3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "chinese" },
  { name: "SoundHelix Song 4", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", category: "chinese" },
  { name: "SoundHelix Song 5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", category: "chinese" },
  { name: "SoundHelix Song 6", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "SoundHelix Song 7", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", category: "classic" },
  { name: "SoundHelix Song 8", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "classic" },
];

// 视频
VIDEO_LIST = [
  { name: "480P 测试视频", url: "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_10mb.mp4", category: "short" },
  { name: "720P 测试视频", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4", category: "short" },
  { name: "科幻短片 Tears of Steel", url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mp4", category: "movie" },
  { name: "动画短片 Sintel", url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4", category: "movie" }
];

// 直播
LIVE_LIST = [
  { name: "B站直播大厅", url: "https://live.bilibili.com/" },
  { name: "豆瓣音乐直播", url: "https://music.douban.com/live/" }
];

// 文件
FILE_LIST = [
  { name: "使用说明.md", url: "https://raw.githubusercontent.com/995680202/995680202.github.io/main/README.md" },
  { name: "测试文档.pdf", url: "https://raw.githubusercontent.com/mozilla/pdf.js-sample-files/master/tracemonkey.pdf" }
];

// 全局控制：只允许一个声音
function pauseAllMedia() {
  // 暂停音乐
  player.pause();
  // 暂停视频
  modalVideo.pause();
}

// 音乐播放
function playByIndex(index) {
  pauseAllMedia();

  if (index < 0) index = musicList.length - 1;
  if (index >= musicList.length) index = 0;
  currentIndex = index;
  const song = musicList[currentIndex];
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
}

// 视频弹窗
function openVideo(url, title) {
  pauseAllMedia();

  videoTitle.textContent = title;
  modalVideo.src = url;
  videoModal.style.display = "block";
}
function closeVideo() {
  videoModal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
}

// 列表渲染
function renderMusic(category) {
  const el = document.getElementById('music-list');
  el.innerHTML = '';
  const list = category === 'all' ? musicList : musicList.filter(x => x.category === category);
  list.forEach((song, i) => {
    const d = document.createElement('div');
    d.className = 'item music-item';
    d.innerText = song.name;
    d.onclick = () => playByIndex(i);
    el.appendChild(d);
  });
}

function renderVideo(category) {
  const el = document.getElementById('video-list');
  el.innerHTML = '';
  const list = category === 'all' ? VIDEO_LIST : VIDEO_LIST.filter(x => x.category === category);
  list.forEach(v => {
    const d = document.createElement('div');
    d.className = 'item video-item';
    d.innerText = v.name;
    d.onclick = () => openVideo(v.url, v.name);
    el.appendChild(d);
  });
}

function renderLive() {
  const el = document.getElementById('live-list');
  el.innerHTML = '';
  LIVE_LIST.forEach(l => {
    const d = document.createElement('div');
    d.className = 'item live-item';
    d.innerText = l.name;
    d.onclick = () => {
      pauseAllMedia();
      window.open(l.url, '_blank');
    };
    el.appendChild(d);
  });
}

function renderFile() {
  const el = document.getElementById('file-list');
  el.innerHTML = '';
  FILE_LIST.forEach(f => {
    const d = document.createElement('div');
    d.className = 'item file-item';
    d.innerText = f.name;
    d.onclick = () => {
      const a = document.createElement('a');
      a.href = f.url;
      a.download = f.name;
      a.target = '_blank';
      a.click();
    };
    el.appendChild(d);
  });
}

// 分类
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMusic(tab.dataset.category);
  });
});
document.querySelectorAll('.video-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderVideo(tab.dataset.videoCategory);
  });
});

// 播放器按钮
prevBtn.onclick = () => playByIndex(currentIndex - 1);
nextBtn.onclick = () => playByIndex(currentIndex + 1);
playBtn.onclick = () => {
  pauseAllMedia();
  player.paused ? player.play() : player.pause();
};
player.onended = () => playByIndex(currentIndex + 1);

// 后台
function toggleAdmin() {
  const p = document.getElementById('adminPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}
function checkAdmin() {
  if (document.getElementById('adminPwd').value === ADMIN_PASSWORD) {
    document.getElementById('adminContent').style.display = 'block';
  } else {
    alert('密码错误');
  }
}
function saveAllData() {
  alert('保存成功！');
  toggleAdmin();
}

// 初始化
window.onload = () => {
  renderMusic('all');
  renderVideo('all');
  renderLive();
  renderFile();
};

