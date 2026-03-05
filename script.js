const bgMusic = document.getElementById('bg-music');
const player = document.getElementById('main-player');
const playTitle = document.getElementById('play-title');
const progress = document.getElementById('progress');
const tCurr = document.getElementById('t-curr');
const tTotal = document.getElementById('t-total');
const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const search = document.getElementById('search');
const bgToggle = document.getElementById('bg-toggle');

const ADMIN_PWD = 'qingnanliu';
const PRIVATE_PWD = 'qingnanliu';

// 本地存储
function get(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

let workFiles = get('workFiles');
let privateFiles = get('privateFiles');

// 时间格式化
function fmt(t) {
  if (isNaN(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// 播放
function play(url, title) {
  player.src = url;
  player.play();
  playTitle.textContent = title;
}

// 进度条
player.ontimeupdate = () => {
  tCurr.textContent = fmt(player.currentTime);
  tTotal.textContent = fmt(player.duration);
  progress.value = player.duration ? (player.currentTime / player.duration) * 100 : 0;
};

progress.oninput = () => {
  player.currentTime = (progress.value / 100) * player.duration;
};

btnPlay.onclick = () => player.paused ? player.play() : player.pause();
btnPrev.onclick = () => {};
btnNext.onclick = () => {};

// ===================== 搜索全网音乐 =====================
search.onkeydown = async (e) => {
  if (e.key !== 'Enter') return;
  const kw = search.value.trim();
  if (!kw) return;
  try {
    const res = await fetch(`https://api.apiopen.top/api/songList?name=${kw}`);
    const data = await res.json();
    if (data.code === 200 && data.result.length > 0) {
      const song = data.result[0];
      play(song.url, `正在播放：${song.title} - ${song.author}`);
    } else {
      alert('未找到歌曲');
    }
  } catch (e) {
    alert('搜索失败');
  }
};

// ===================== 背景音乐 =====================
window.onload = () => {
  const url = localStorage.getItem('bgMusicUrl');
  if (url) {
    bgMusic.src = url;
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {});
  }
  renderFiles();
};

bgToggle.onclick = () => {
  if (bgMusic.paused) {
    bgMusic.play();
    bgToggle.textContent = '⏸ 暂停背景音乐';
  } else {
    bgMusic.pause();
    bgToggle.textContent = '▶ 播放背景音乐';
  }
};

// ===================== 文件夹 =====================
function renderFiles() {
  const wl = document.getElementById('work-list');
  wl.innerHTML = workFiles.map(f => `<div class="file-item">${f.name}</div>`).join('');
  wl.onclick = (e) => {
    const i = [...wl.children].indexOf(e.target);
    if (i >= 0) window.open(workFiles[i].url, '_blank');
  };

  document.getElementById('show-private').onclick = () => {
    if (prompt('输入私人文件夹密码：') === PRIVATE_PWD) {
      const pl = document.getElementById('private-list');
      pl.innerHTML = privateFiles.map(f => `<div class="file-item">${f.name}</div>`).join('');
      pl.onclick = (e) => {
        const i = [...pl.children].indexOf(e.target);
        if (i >= 0) window.open(privateFiles[i].url, '_blank');
      };
    }
  };
}

// ===================== 后台独立页面 =====================
document.getElementById('open-admin').onclick = () => {
  document.getElementById('admin-page').style.display = 'block';
};

function closeAdmin() {
  document.getElementById('admin-page').style.display = 'none';
}

function tryLogin() {
  if (document.getElementById('admin-pwd').value === ADMIN_PWD) {
    document.getElementById('admin-body').style.display = 'block';
    renderAdmin();
  } else {
    alert('密码错误');
  }
}

function renderAdmin() {
  const aw = document.getElementById('admin-work');
  const ap = document.getElementById('admin-private');
  aw.innerHTML = workFiles.map((f, i) => `<div class="file-item">${f.name} <button onclick="delWork(${i})">删除</button></div>`).join('');
  ap.innerHTML = privateFiles.map((f, i) => `<div class="file-item">${f.name} <button onclick="delPrivate(${i})">删除</button></div>`).join('');
}

// 背景音乐上传/删除
function setBgMusic() {
  const f = document.getElementById('bg-upload').files[0];
  if (!f) return;
  const url = URL.createObjectURL(f);
  localStorage.setItem('bgMusicUrl', url);
  alert('设置成功，刷新生效');
}

function delBgMusic() {
  localStorage.removeItem('bgMusicUrl');
  bgMusic.pause();
  alert('已删除背景音乐');
}

// 文件上传删除
function uploadWork() {
  const files = document.getElementById('work-upload').files;
  for (let f of files) workFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  set('workFiles', workFiles);
  renderFiles();
  renderAdmin();
}

function uploadPrivate() {
  const files = document.getElementById('private-upload').files;
  for (let f of files) privateFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  set('privateFiles', privateFiles);
  renderFiles();
  renderAdmin();
}

function delWork(i) {
  workFiles.splice(i, 1);
  set('workFiles', workFiles);
  renderFiles();
  renderAdmin();
}

function delPrivate(i) {
  privateFiles.splice(i, 1);
  set('privateFiles', privateFiles);
  renderFiles();
  renderAdmin();
}

