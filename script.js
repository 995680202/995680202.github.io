const player = document.getElementById('main-player');
const nowPlaying = document.getElementById('now-playing');
const progressBar = document.getElementById('progress');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const musicCategory = document.getElementById('music-category');
const folderSelect = document.getElementById('folder-select');

let currentIndex = 0;
let musicList = [];
let liveList = [];
let workFiles = [];
let privateFiles = [];

const ADMIN_PASSWORD = "qingnanliu";
const PRIVATE_PASSWORD = "qingnanliu";

// 音乐（5 分类：全部、华语、古典、流行、民谣）
musicList = [
  { name: "华语流行歌曲", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "华语经典老歌", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "chinese" },
  { name: "古典音乐", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "流行歌曲", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "pop" },
  { name: "民谣歌曲", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", category: "folk" },
];

// 直播/流媒体（可播放音乐）
liveList = [
  { name: "B站直播大厅", url: "https://live.bilibili.com/" },
  { name: "在线音乐电台", url: "https://music.163.com/" },
];

// 工作文件夹
workFiles = [
  { name: "工作文档1", url: "https://www.baidu.com" },
  { name: "工作文档2", url: "https://www.baidu.com" },
];

// 私人文件夹（密码保护）
privateFiles = [
  { name: "私人文件1", url: "https://www.baidu.com" },
  { name: "私人文件2", url: "https://www.baidu.com" },
];

// 全局暂停
function pauseAllMedia() {
  player.pause();
}

// 播放音乐
function playByIndex(index) {
  pauseAllMedia();
  if (index < 0) index = musicList.length - 1;
  if (index >= musicList.length) index = 0;
  currentIndex = index;
  const song = musicList[currentIndex];
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
  playBtn.textContent = "⏸ 暂停";
}

// 进度条同步
player.ontimeupdate = () => {
  if (!player.duration) return;
  progressBar.value = (player.currentTime / player.duration) * 100;
};

progressBar.oninput = () => {
  if (!player.duration) return;
  player.currentTime = (progressBar.value / 100) * player.duration;
};

// 播放/暂停切换
playBtn.onclick = () => {
  if (player.paused) {
    player.play();
    playBtn.textContent = "⏸ 暂停";
  } else {
    player.pause();
    playBtn.textContent = "▶ 播放";
  }
};

prevBtn.onclick = () => playByIndex(currentIndex - 1);
nextBtn.onclick = () => playByIndex(currentIndex + 1);
player.onended = () => playByIndex(currentIndex + 1);

// 音乐分类下拉
function renderMusicList(category) {
  const el = document.getElementById('music-list');
  el.innerHTML = '';
  const list = category === 'all' 
    ? musicList 
    : musicList.filter(m => m.category === category);
  
  list.forEach((song, i) => {
    const d = document.createElement('div');
    d.className = 'item music-item';
    d.innerText = song.name;
    d.onclick = () => playByIndex(i);
    el.appendChild(d);
  });
}

musicCategory.onchange = () => {
  renderMusicList(musicCategory.value);
};

// 文件夹下拉 + 私人密码
folderSelect.onchange = () => {
  const val = folderSelect.value;
  const el = document.getElementById('file-list');
  el.innerHTML = '';

  if (val === 'work') {
    workFiles.forEach(f => {
      const d = document.createElement('div');
      d.className = 'item file-item';
      d.innerText = f.name;
      d.onclick = () => window.open(f.url, '_blank');
      el.appendChild(d);
    });
  } else if (val === 'private') {
    const pwd = prompt("请输入私人文件夹密码：");
    if (pwd === PRIVATE_PASSWORD) {
      privateFiles.forEach(f => {
        const d = document.createElement('div');
        d.className = 'item file-item';
        d.innerText = f.name;
        d.onclick = () => window.open(f.url, '_blank');
        el.appendChild(d);
      });
    } else {
      alert("密码错误！");
      folderSelect.value = "";
    }
  }
};

// 直播
function renderLive() {
  const el = document.getElementById('live-list');
  el.innerHTML = '';
  liveList.forEach(l => {
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

// 后台
function toggleAdmin() {
  const p = document.getElementById('adminPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

function checkAdmin() {
  if (document.getElementById('adminPwd').value === ADMIN_PASSWORD) {
    document.getElementById('adminContent').style.display = 'block';
  } else {
    alert("密码错误");
  }
}

function saveAllData() {
  alert("保存成功！");
  toggleAdmin();
}

// 初始化
window.onload = () => {
  renderMusicList('all');
  renderLive();
};

