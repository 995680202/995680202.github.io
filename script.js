const player = document.getElementById('main-player');
const nowPlaying = document.getElementById('now-playing');
const progressBar = document.getElementById('progress');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const musicCategory = document.getElementById('music-category');
const folderSelect = document.getElementById('folder-select');
const fileList = document.getElementById('file-list');
const workUpload = document.getElementById('work-upload');

let currentIndex = 0;
let musicList = [];
let liveList = [];
let workFiles = [];
let privateFiles = [];

const ADMIN_PASSWORD = "qingnanliu";
const PRIVATE_PASSWORD = "qingnanliu";

// 音乐库（民谣有2首，默认播第一首）
musicList = [
  { name: "华语歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "华语歌曲02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "chinese" },
  { name: "古典音乐01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "古典音乐02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", category: "classic" },
  { name: "流行歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "pop" },
  { name: "流行歌曲02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", category: "pop" },
  { name: "民谣歌曲01", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "folk" },
  { name: "民谣歌曲02", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", category: "folk" },
];

// 直播/流媒体
liveList = [
  { name: "B站直播大厅", url: "https://live.bilibili.com/" },
  { name: "在线音乐电台", url: "https://music.163.com/" },
];

// 文件夹
workFiles = [
  { name: "工作文件1", url: "https://www.baidu.com" },
  { name: "工作文件2", url: "https://www.baidu.com" },
];

privateFiles = [
  { name: "私人文件1", url: "https://www.baidu.com" },
  { name: "私人文件2", url: "https://www.baidu.com" },
];

// 全局暂停
function pauseAllMedia() {
  player.pause();
  playBtn.textContent = "▶ 播放";
}

// 播放音乐
function playSong(song) {
  pauseAllMedia();
  player.src = song.url;
  player.play();
  nowPlaying.textContent = `正在播放：${song.name}`;
  playBtn.textContent = "⏸ 暂停";
}

// 进度条
player.ontimeupdate = () => {
  if (!player.duration) return;
  progressBar.value = (player.currentTime / player.duration)*100;
};

progressBar.oninput = () => {
  if (!player.duration) return;
  player.currentTime = (progressBar.value / 100) * player.duration;
};

// 播放/暂停
playBtn.onclick = () => {
  if (player.paused) {
    player.play();
    playBtn.textContent = "⏸ 暂停";
  } else {
    player.pause();
    playBtn.textContent = "▶ 播放";
  }
};

// 上/下一首
function playNext() {
  const currentCat = musicCategory.value;
  let filtered = currentCat === "all" ? musicList : musicList.filter(m => m.category === currentCat);
  let idx = filtered.findIndex(s => s.url === player.src);
  idx = (idx + 1) % filtered.length;
  playSong(filtered[idx]);
}

function playPrev() {
  const currentCat = musicCategory.value;
  let filtered = currentCat === "all" ? musicList : musicList.filter(m => m.category === currentCat);
  let idx = filtered.findIndex(s => s.url === player.src);
  idx = (idx - 1 + filtered.length) % filtered.length;
  playSong(filtered[idx]);
}

prevBtn.onclick = playPrev;
nextBtn.onclick = playNext;
player.onended = playNext;

// 音乐分类下拉
function renderMusic() {
  const cat = musicCategory.value;
  const listEl = document.getElementById("music-list");
  listEl.innerHTML = "";

  const filtered = cat === "all" 
    ? musicList 
    : musicList.filter(m => m.category === cat);

  filtered.forEach(song => {
    const div = document.createElement("div");
    div.className = "item music-item";
    div.innerText = song.name;
    div.onclick = () => playSong(song);
    listEl.appendChild(div);
  });

  // 页面加载默认播放民谣第一首
  if (cat === "folk" && player.src === "") {
    playSong(filtered[0]);
  }
}

musicCategory.onchange = renderMusic;

// 直播
function renderLive() {
  const listEl = document.getElementById("live-list");
  listEl.innerHTML = "";
  liveList.forEach(item => {
    const div = document.createElement("div");
    div.className = "item live-item";
    div.innerText = item.name;
    div.onclick = () => {
      pauseAllMedia();
      window.open(item.url, "_blank");
    };
    listEl.appendChild(div);
  });
}

// 文件夹（默认工作+上传入口）
folderSelect.onchange = () => {
  const val = folderSelect.value;
  fileList.innerHTML = "";
  workUpload.style.display = "none";

  if (val === "work") {
    workUpload.style.display = "block";
    workFiles.forEach(f => {
      const div = document.createElement("div");
      div.className = "item file-item";
      div.innerText = f.name;
      div.onclick = () => window.open(f.url, "_blank");
      fileList.appendChild(div);
    });
  } else if (val === "private") {
    const pwd = prompt("请输入私人文件夹密码：");
    if (pwd === PRIVATE_PASSWORD) {
      privateFiles.forEach(f => {
        const div = document.createElement("div");
        div.className = "item file-item";
        div.innerText = f.name;
        div.onclick = () => window.open(f.url, "_blank");
        fileList.appendChild(div);
      });
    } else {
      alert("密码错误！");
      folderSelect.value = "";
    }
  }
};

// 工作文件夹上传
function uploadToWork() {
  const files = document.getElementById("file-upload").files;
  if (files.length === 0) {
    alert("请选择文件");
    return;
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // 模拟上传：实际项目需后端接口
    workFiles.push({ name: file.name, url: URL.createObjectURL(file) });
  }
  alert(`成功上传${files.length}个文件`);
  folderSelect.onchange(); // 刷新列表
}

// 后台
function toggleAdmin() {
  const panel = document.getElementById("adminPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function checkAdmin() {
  if (document.getElementById("adminPwd").value === ADMIN_PASSWORD) {
    document.getElementById("adminContent").style.display = "block";
  } else {
    alert("密码错误");
  }
}

function saveAllData() {
  alert("保存成功！页面即将刷新");
  location.reload();
}

// 初始化
window.onload = () => {
  renderMusic();
  renderLive();
  folderSelect.onchange(); // 触发工作文件夹默认显示
};

