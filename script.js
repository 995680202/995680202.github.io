// 开机动画
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

const player = document.getElementById('main-player');
const nowPlaying = document.getElementById('now-playing');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let musicList = [];

// 稳定可播放音乐（20首，带分类）
musicList = [
  { name: "SoundHelix - Song 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "chinese" },
  { name: "SoundHelix - Song 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "chinese" },
  { name: "SoundHelix - Song 3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "chinese" },
  { name: "SoundHelix - Song 4", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", category: "chinese" },
  { name: "SoundHelix - Song 5", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", category: "chinese" },
  { name: "SoundHelix - Song 6", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "classic" },
  { name: "SoundHelix - Song 7", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", category: "classic" },
  { name: "SoundHelix - Song 8", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "classic" },
  { name: "SoundHelix - Song 9", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", category: "classic" },
  { name: "SoundHelix - Song 10", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", category: "classic" },
  { name: "SoundHelix - Song 11", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 12", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 13", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 14", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 15", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", category: "instrumental" },
  { name: "SoundHelix - Song 16", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", category: "english" },
  { name: "SoundHelix - Song 17", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", category: "english" },
  { name: "SoundHelix - Song 18", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3", category: "english" },
  { name: "SoundHelix - Song 19", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3", category: "english" },
  { name: "SoundHelix - Song 20", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3", category: "english" }
];

// 稳定可播放视频（5个，带分类）
const VIDEO_LIST = [
  { name: "Big Buck Bunny (720p)", url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4", category: "test" },
  { name: "Sintel (720p)", url: "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4", category: "test" },
  { name: "Elephants Dream (720p)", url: "https://test-videos.co.uk/vids/elephants-dream/mp4/h264/720/Elephants_Dream_720_10s_1MB.mp4", category: "test" },
  { name: "For Bigger Blazes (1080p)", url: "https://test-videos.co.uk/vids/for-bigger-blazes/mp4/h264/1080/For_Bigger_Blazes_1080_10s_1MB.mp4", category: "movie" },
  { name: "Tears of Steel", url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mp4", category: "movie" }
];

// 播放指定索引
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

// 播放暂停
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
  if (category !== 'all') {
    filteredList = musicList.filter(song => song.category === category);
  }
  
  filteredList.forEach((song, i) => {
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
  if (category !== 'all') {
    filteredList = VIDEO_LIST.filter(video => video.category === category);
  }
  
  filteredList.forEach(video => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerText = video.name;
    div.onclick = () => window.open(video.url, '_blank');
    videoEl.appendChild(div);
  });
}

// 绑定音乐分类标签
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderListByCategory(tab.dataset.category);
  });
});

// 绑定视频分类标签
document.querySelectorAll('.video-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderVideoByCategory(tab.dataset.videoCategory);
  });
});

// 后台
function toggleAdmin() {
  const p = document.getElementById('adminPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

// 修复密码：995680202
function checkAdmin() {
  if (document.getElementById('adminPwd').value === "995680202") {
    document.getElementById('adminContent').style.display = 'block';
  } else {
    alert('密码错误');
  }
}

function saveData() {
  alert('保存成功！');
}

// 初始化
renderListByCategory('all');
renderVideoByCategory('all');

