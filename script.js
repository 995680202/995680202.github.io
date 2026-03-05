const player = document.getElementById('main-player');
const bgMusic = document.getElementById('bg-music');
const nowPlaying = document.getElementById('now-playing');
const progressBar = document.getElementById('progress');
const playBtn = document.getElementById('playBtn');
const musicCategory = document.getElementById('music-category');
const folderSelect = document.getElementById('folder-select');

const ADMIN_PASSWORD = 'qingnanliu';
const PRIVATE_PASSWORD = 'qingnanliu';

// 音乐列表
const musicList = [
  { name: "民谣歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "folk" },
  { name: "民谣歌曲02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", category: "folk" },
  { name: "华语歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "古典音乐01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "流行歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "pop" },
];

// 直播
const liveList = [
  { name: "B站直播大厅", url: "https://live.bilibili.com/" },
  { name: "在线音乐电台", url: "https://music.163.com/" },
];

// ========================= 本地存储 =========================
function getStorage(key) {
  const d = localStorage.getItem(key);
  return d ? JSON.parse(d) : [];
}
function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

let workFiles = getStorage('workFiles');
let privateFiles = getStorage('privateFiles');

// ========================= 双击打开后台 =========================
document.getElementById('admin-btn').ondblclick = () => {
  document.getElementById('admin-panel').style.display = 'block';
};

function closeAdmin() {
  document.getElementById('admin-panel').style.display = 'none';
}

function adminLogin() {
  const pwd = document.getElementById('admin-pwd').value;
  if (pwd === ADMIN_PASSWORD) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-menu').style.display = 'block';
    renderAdminList();
  } else {
    alert('密码错误');
  }
}

// ========================= 上传 & 删除 =========================
function uploadWork() {
  const files = document.getElementById('work-upload').files;
  for (let f of files) {
    workFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  }
  setStorage('workFiles', workFiles);
  renderAdminList();
  alert('上传成功');
}

function uploadPrivate() {
  const files = document.getElementById('private-upload').files;
  for (let f of files) {
    privateFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  }
  setStorage('privateFiles', privateFiles);
  renderAdminList();
  alert('上传成功');
}

function delWork(i) {
  workFiles.splice(i, 1);
  setStorage('workFiles', workFiles);
  renderAdminList();
}

function delPrivate(i) {
  privateFiles.splice(i, 1);
  setStorage('privateFiles', privateFiles);
  renderAdminList();
}

// 背景音乐
function setBgMusic() {
  const f = document.getElementById('bg-music-upload').files[0];
  if (!f) return;
  localStorage.setItem('bgMusicUrl', URL.createObjectURL(f));
  alert('设置成功，刷新生效');
}

function delBgMusic() {
  localStorage.removeItem('bgMusicUrl');
  bgMusic.pause();
  alert('已删除背景音乐');
}

// 后台列表
function renderAdminList() {
  const wl = document.getElementById('work-list');
  const pl = document.getElementById('private-list');
  wl.innerHTML = workFiles.map((o,i)=>`<div>${o.name} <button onclick="delWork(${i})">删</button></div>`).join('');
  pl.innerHTML = privateFiles.map((o,i)=>`<div>${o.name} <button onclick="delPrivate(${i})">删</button></div>`).join('');
}

// ========================= 播放 =========================
function pauseAll() {
  player.pause();
}

function playSong(song) {
  pauseAll();
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
  playBtn.textContent = "⏸ 暂停";
}

// ========================= 音乐分类 =========================
function renderMusic() {
  const cat = musicCategory.value;
  const el = document.getElementById('music-list');
  el.innerHTML = '';
  const list = cat === 'all' ? musicList : musicList.filter(m=>m.category===cat);
  list.forEach(s => {
    const d = document.createElement('div');
    d.className = 'item music-item';
    d.innerText = s.name;
    d.onclick = () => playSong(s);
    el.appendChild(d);
  });
}

// ========================= 文件夹 =========================
folderSelect.onchange = () => {
  const val = folderSelect.value;
  const el = document.getElementById('file-list');
  el.innerHTML = '';
  if(val === 'work') {
    workFiles.forEach(f=>{
      const d=document.createElement('div');
      d.className='item file-item';
      d.innerText=f.name;
      d.onclick=()=>window.open(f.url,'_blank');
      el.appendChild(d);
    });
  } else if(val === 'private') {
    if(prompt('密码：')!==PRIVATE_PASSWORD) {
      folderSelect.value='';return;
    }
    privateFiles.forEach(f=>{
      const d=document.createElement('div');
      d.className='item file-item';
      d.innerText=f.name;
      d.onclick=()=>window.open(f.url,'_blank');
      el.appendChild(d);
    });
  }
};

// ========================= 直播 =========================
function renderLive() {
  const el = document.getElementById('live-list');
  liveList.forEach(i=>{
    const d=document.createElement('div');
    d.className='item live-item';
    d.innerText=i.name;
    d.onclick=()=>window.open(i.url,'_blank');
    el.appendChild(d);
  });
}

// ========================= 启动 =========================
window.onload = () => {
  renderMusic();
  renderLive();
  folderSelect.onchange();

  // 自动背景音乐
  const bgUrl = localStorage.getItem('bgMusicUrl');
  if (bgUrl) {
    bgMusic.src = bgUrl;
    bgMusic.volume = 0.4;
    bgMusic.play().catch(()=>{});
  }
};

