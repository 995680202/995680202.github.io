const player = document.getElementById('main-player');
const bgMusic = document.getElementById('bg-music');
const nowPlaying = document.getElementById('now-playing');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const musicCategory = document.getElementById('music-category');
const searchInput = document.getElementById('search-input');
const folderSelect = document.getElementById('folder-select');

const ADMIN_PASSWORD = "qingnanliu";
const PRIVATE_PASSWORD = "qingnanliu";

// 音乐库
const musicList = [
  { name: "民谣歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "folk" },
  { name: "民谣歌曲02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", category: "folk" },
  { name: "华语歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "华语歌曲02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "chinese" },
  { name: "古典音乐01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "流行歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "pop" },
];

// 直播
const liveList = [
  { name: "B站直播大厅", url: "https://live.bilibili.com/" },
  { name: "在线音乐电台", url: "https://music.163.com/" },
];

// 本地存储
function get(key) { return JSON.parse(localStorage.getItem(key) || "[]"); }
function set(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

let workFiles = get("workFiles");
let privateFiles = get("privateFiles");

let currentSongIndex = 0;
let currentList = [...musicList];

// 时间格式化
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// 播放
function pauseAll() { player.pause(); }

function playSong(song) {
  pauseAll();
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
  playBtn.textContent = "⏸ 暂停";
}

function playByIndex(i) {
  currentSongIndex = i;
  playSong(currentList[i]);
}

// 时间同步
player.ontimeupdate = () => {
  if (!player.duration) return;
  progressBar.value = (player.currentTime / player.duration) * 100;
  currentTimeEl.textContent = formatTime(player.currentTime);
  durationTimeEl.textContent = formatTime(player.duration);
};

progressBar.oninput = () => {
  if (!player.duration) return;
  player.currentTime = (progressBar.value / 100) * player.duration;
};

// 播放控制
playBtn.onclick = () => {
  if (player.paused) { player.play(); playBtn.textContent = "⏸ 暂停"; }
  else { player.pause(); playBtn.textContent = "▶ 播放"; }
};

prevBtn.onclick = () => {
  let i = currentSongIndex - 1;
  if (i < 0) i = currentList.length - 1;
  playByIndex(i);
};

nextBtn.onclick = () => {
  let i = currentSongIndex + 1;
  if (i >= currentList.length) i = 0;
  playByIndex(i);
};

player.onended = () => nextBtn.onclick();

// 音乐分类 + 搜索
function renderMusic() {
  const cat = musicCategory.value;
  const keyword = searchInput.value.toLowerCase();
  const listEl = document.getElementById("music-list");
  listEl.innerHTML = "";

  let filtered = musicList.filter(s => s.name.toLowerCase().includes(keyword));
  if (cat !== "all") filtered = filtered.filter(s => s.category === cat);
  currentList = filtered;

  currentList.forEach((song, i) => {
    const d = document.createElement("div");
    d.className = "item music-item";
    d.innerText = song.name;
    d.onclick = () => playByIndex(i);
    listEl.appendChild(d);
  });
}

musicCategory.onchange = renderMusic;
searchInput.oninput = renderMusic;

// 直播
function renderLive() {
  const el = document.getElementById("live-list");
  liveList.forEach(item => {
    const d = document.createElement("div");
    d.className = "item live-item";
    d.innerText = item.name;
    d.onclick = () => { pauseAll(); window.open(item.url, "_blank"); };
    el.appendChild(d);
  });
}

// 文件夹
folderSelect.onchange = () => {
  const val = folderSelect.value;
  const el = document.getElementById("file-list");
  el.innerHTML = "";
  if (val === "work") {
    workFiles.forEach(f => {
      const d = document.createElement("div");
      d.className = "item file-item";
      d.innerText = f.name;
      d.onclick = () => window.open(f.url, "_blank");
      el.appendChild(d);
    });
  } else if (val === "private") {
    if (prompt("私人文件夹密码：") !== PRIVATE_PASSWORD) {
      folderSelect.value = ""; return;
    }
    privateFiles.forEach(f => {
      const d = document.createElement("div");
      d.className = "item file-item";
      d.innerText = f.name;
      d.onclick = () => window.open(f.url, "_blank");
      el.appendChild(d);
    });
  }
};

// ===================== 后台入口（单击打开） =====================
document.getElementById("admin-open-btn").onclick = () => {
  document.getElementById("admin-panel").style.display = "block";
};

function closeAdmin() {
  document.getElementById("admin-panel").style.display = "none";
}

function adminLogin() {
  if (document.getElementById("admin-pwd").value === ADMIN_PASSWORD) {
    document.getElementById("login-area").style.display = "none";
    document.getElementById("admin-area").style.display = "block";
    renderAdminFileList();
  } else {
    alert("密码错误");
  }
}

// 上传删除
function uploadWorkFiles() {
  const files = document.getElementById("work-files").files;
  for (let f of files) workFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  set("workFiles", workFiles); renderAdminFileList(); alert("上传成功");
}
function uploadPrivateFiles() {
  const files = document.getElementById("private-files").files;
  for (let f of files) privateFiles.push({ name: f.name, url: URL.createObjectURL(f) });
  set("privateFiles", privateFiles); renderAdminFileList(); alert("上传成功");
}
function delWork(i) { workFiles.splice(i,1); set("workFiles",workFiles); renderAdminFileList(); }
function delPrivate(i) { privateFiles.splice(i,1); set("privateFiles",privateFiles); renderAdminFileList(); }

// 背景音乐
function setBgMusic() {
  const f = document.getElementById("bg-audio").files[0];
  if (!f) return;
  localStorage.setItem("bgMusic", URL.createObjectURL(f));
  alert("设置成功，刷新自动播放");
}
function delBgMusic() {
  localStorage.removeItem("bgMusic"); bgMusic.pause();
  alert("已删除");
}

function renderAdminFileList() {
  document.getElementById("work-admin-list").innerHTML = workFiles.map((f,i)=>`<div>${f.name} <button onclick="delWork(${i})">删</button></div>`).join("");
  document.getElementById("private-admin-list").innerHTML = privateFiles.map((f,i)=>`<div>${f.name} <button onclick="delPrivate(${i})">删</button></div>`).join("");
}

// 启动
window.onload = () => {
  renderMusic();
  renderLive();
  folderSelect.onchange();
  const bgUrl = localStorage.getItem("bgMusic");
  if (bgUrl) { bgMusic.src = bgUrl; bgMusic.volume = 0.4; bgMusic.play().catch(()=>{}); }
};

