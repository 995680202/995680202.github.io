const player = document.getElementById('player');
const playingTitle = document.getElementById('playing-title');
const progress = document.getElementById('progress');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const searchInput = document.getElementById('search');
const songListEl = document.getElementById('song-list');
const workFilesEl = document.getElementById('work-files');
const privateFilesEl = document.getElementById('private-files');
const btnShowPrivate = document.getElementById('show-private');

const ADMIN_PWD = 'qingnanliu';
const PRIVATE_PWD = 'qingnanliu';

// 本地存储
function get(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

let workFiles = get('workFiles');
let privateFiles = get('privateFiles');

// 内置音乐库（大量可播放）
const songList = [
  { name: '民谣-风吹麦浪', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { name: '民谣-成都',     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { name: '华语-七里香',   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: '华语-晴天',     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: '流行-告白气球', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: '流行-小幸运',   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { name: '古典-月光',     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { name: '轻音乐-清晨',   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
];

let currentList = [...songList];
let currentIndex = 0;

// 时间格式化
function fmt(t) {
  if (isNaN(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// 播放歌曲
function playSong(song) {
  player.src = song.url;
  player.play();
  playingTitle.textContent = `正在播放：${song.name}`;
  btnPlay.textContent = '暂停';
}

function playIndex(i) {
  currentIndex = i;
  playSong(currentList[i]);
}

// 播放/暂停
btnPlay.onclick = () => {
  if (player.paused) { player.play(); btnPlay.textContent = '暂停'; } 
  else { player.pause(); btnPlay.textContent = '播放'; }
};

// 上/下首
btnPrev.onclick = () => {
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  playIndex(currentIndex);
};

btnNext.onclick = () => {
  currentIndex = (currentIndex + 1) % currentList.length;
  playIndex(currentIndex);
};

// 进度条
player.ontimeupdate = () => {
  timeCurrent.textContent = fmt(player.currentTime);
  timeTotal.textContent = fmt(player.duration);
  progress.value = (player.currentTime / player.duration) * 100 || 0;
};

progress.oninput = () => {
  player.currentTime = (progress.value / 100) * player.duration;
};

// ===================== 搜索在线音乐（模拟在线搜索） =====================
searchInput.onkeydown = (e) => {
  if (e.key === 'Enter') {
    const kw = searchInput.value.trim().toLowerCase();
    const found = songList.find(s => s.name.toLowerCase().includes(kw));
    if (found) {
      playSong(found);
    } else {
      alert('未找到该歌曲');
    }
  }
};

// 渲染音乐列表
function renderSongs() {
  songListEl.innerHTML = '';
  currentList.forEach((s, i) => {
    const div = document.createElement('div');
    div.style.padding = '8px 10px';
    div.style.background = '#112244';
    div.style.borderRadius = '8px';
    div.style.marginBottom = '6px';
    div.style.color = '#fff';
    div.textContent = s.name;
    div.onclick = () => playIndex(i);
    songListEl.appendChild(div);
  });
}

// ===================== 文件夹（平铺展示） =====================
function renderFiles() {
  workFilesEl.innerHTML = '';
  workFiles.forEach((f, i) => {
    const d = document.createElement('div');
    d.style.padding = '6px 10px';
    d.style.background = '#112244';
    d.style.borderRadius = '6px';
    d.style.marginBottom = '4px';
    d.style.color = '#fff';
    d.textContent = f.name;
    d.onclick = () => window.open(f.url, '_blank');
    workFilesEl.appendChild(d);
  });
}

btnShowPrivate.onclick = () => {
  if (prompt('请输入私人文件夹密码：') === PRIVATE_PWD) {
    privateFilesEl.innerHTML = '';
    privateFiles.forEach(f => {
      const d = document.createElement('div');
      d.style.padding = '6px 10px';
      d.style.background = '#112244';
      d.style.borderRadius = '6px';
      d.style.marginBottom = '4px';
      d.style.color = '#fff';
      d.textContent = f.name;
      d.onclick = () => window.open(f.url, '_blank');
      privateFilesEl.appendChild(d);
    });
  }
};

// ===================== 后台（固定显示） =====================
document.getElementById('admin-btn').onclick = () => {
  document.getElementById('admin-panel').style.display = 'block';
};

function closeAdmin() {
  document.getElementById('admin-panel').style.display = 'none';
}

function adminLogin() {
  if (document.getElementById('admin-pwd').value === ADMIN_PWD) {
    document.getElementById('admin-body').style.display = 'block';
    renderAdminList();
  } else {
    alert('密码错误');
  }
}

function uploadWork() {
  const files = document.getElementById('work-upload').files;
  for (let f of files) workFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  set('workFiles', workFiles);
  renderFiles();
  renderAdminList();
}

function uploadPrivate() {
  const files = document.getElementById('private-upload').files;
  for (let f of files) privateFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  set('privateFiles', privateFiles);
  renderAdminList();
}

function delWork(i) {
  workFiles.splice(i, 1);
  set('workFiles', workFiles);
  renderFiles();
  renderAdminList();
}

function delPrivate(i) {
  privateFiles.splice(i, 1);
  set('privateFiles', privateFiles);
  renderAdminList();
}

function renderAdminList() {
  const wl = document.getElementById('admin-work-list');
  const pl = document.getElementById('admin-private-list');
  wl.innerHTML = workFiles.map((f, i) => `<div>${f.name} <button onclick="delWork(${i})">删</button></div>`).join('');
  pl.innerHTML = privateFiles.map((f, i) => `<div>${f.name} <button onclick="delPrivate(${i})">删</button></div>`).join('');
}

// 启动
window.onload = () => {
  renderSongs();
  renderFiles();
};

