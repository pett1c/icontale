// connect to socket.io server
const socket = io();

// get dom elements
const usernameInput = document.getElementById('username');
const roomCodeInput = document.getElementById('room-code-input');
const lobbyDiv = document.getElementById('lobby');
const loginForm = document.getElementById('login-form');
const roomCodeSpan = document.getElementById('room-code');
const playersList = document.getElementById('players-list');
const startGameBtn = document.getElementById('start-game');
const errorMessage = document.getElementById('error-message');
const storySection = document.getElementById('story-section');
const emojisSpan = document.getElementById('emojis');
const timerSpan = document.getElementById('timer');
const storyTextarea = document.getElementById('story');
const wordCountSpan = document.getElementById('word-count');
const submitStoryBtn = document.getElementById('submit-story');
const guessSection = document.getElementById('guess-section');
const guessStoryDiv = document.getElementById('guess-story');
const emojiOptionsDiv = document.getElementById('emoji-options');
const playerOptionsDiv = document.getElementById('player-options');
const submitGuessBtn = document.getElementById('submit-guess');
const resultsSection = document.getElementById('results-section');
const chatResultsDiv = document.getElementById('chat-results');

// main menu
const userEmojiSpan = document.getElementById('user-emoji');
const changeEmojiBtn = document.getElementById('change-emoji');
const tabCreate = document.getElementById('tab-create');
const tabJoin = document.getElementById('tab-join');
const menuFields = document.querySelector('.menu-fields');
const menuActionBtn = document.getElementById('menu-action-btn');

const EMOJIS = [
    '😀','😂','😍','😎','🤔','😱','🥳','😡','😭','😴','👻','🤖','🐶','🐱','🦄','🐉','🍕','🍔','🍟','🍎','🍌','🍉','⚽','🏀','🏈','🚗','✈️','🚀','🌈','🔥','⭐','🎲','🎸','🎮','🎤','🎧','📚','🧩','🖌️','🎨','🏆','🥇','🥈','🥉','🎯','🎳','🎮','🕹️','🧸','🎁','🎂','🍰','🍩','🍪','🍫','🍿','🍦','🍭','🍺','🍻','🥤','☕','🍵','🧃','🧊','🥪','🥗','🍲','🍜','🍣','🍙','🥠','🦐','🦞','🦀','🐟','🐬','🐋','🦈','🐊','🐢','🐍','🦎','🦖','🐅','🐆','🦓','🦍','🐘','🦛','🦏','🐪','🦒','🦘','🦥','🦦','🦨','🦡','🐁','🐀','🐇','🐿️','🦔'
];

let currentRoomCode = null;
let isHost = false;
let storyTimer = null;
let storyTimeLeft = 180;
let storySubmitted = false;
let selectedEmojiCombo = null;
let selectedPlayerId = null;

// text writing phase
const textWritingSection = document.getElementById('text-writing-section');
const writingTimerTime = document.getElementById('writing-timer-time');
const writingTimerBar = document.getElementById('writing-timer-bar');
const writingEmojisDiv = document.getElementById('writing-emojis');
const writingStory = document.getElementById('writing-story');
const writingFinishBtn = document.getElementById('writing-finish-btn');

let writingTimer = null;
let writingTimeLeft = 180;
let writingFinished = false;
let writingEmojis = [];

// emoji name map
const EMOJI_NAMES = {
    '😀': 'smile', '😂': 'joy', '😍': 'love', '😎': 'cool', '🤔': 'thinking', '😱': 'shock', '🥳': 'party', '😡': 'angry', '😭': 'cry', '😴': 'sleep',
    '👻': 'ghost', '🤖': 'robot', '🐶': 'dog', '🐱': 'cat', '🦄': 'unicorn', '🐉': 'dragon', '🍕': 'pizza', '🍔': 'burger', '🍟': 'fries', '🍎': 'apple',
    '🍌': 'banana', '🍉': 'watermelon', '⚽': 'football', '🏀': 'basketball', '🏈': 'rugby', '🚗': 'car', '✈️': 'plane', '🚀': 'rocket', '🌈': 'rainbow',
    '🔥': 'fire', '⭐': 'star', '🎲': 'dice', '🎸': 'guitar', '🎮': 'gamepad', '🎤': 'mic', '🎧': 'headphones', '📚': 'books', '🧩': 'puzzle', '🖌️': 'brush',
    '🎨': 'palette', '🏆': 'trophy', '🥇': 'gold', '🥈': 'silver', '🥉': 'bronze', '🎯': 'target', '🎳': 'bowling', '🕹️': 'joystick', '🧸': 'teddy',
    '🎁': 'gift', '🎂': 'cake', '🍰': 'pie', '🍩': 'donut', '🍪': 'cookie', '🍫': 'choco', '🍿': 'popcorn', '🍦': 'ice cream', '🍭': 'lollipop',
    '🍺': 'beer', '🍻': 'cheers', '🥤': 'soda', '☕': 'coffee', '🍵': 'tea', '🧃': 'juice', '🧊': 'ice', '🥪': 'sandwich', '🥗': 'salad', '🍲': 'soup',
    '🍜': 'ramen', '🍣': 'sushi', '🍙': 'onigiri', '🥠': 'fortune', '🦐': 'shrimp', '🦞': 'lobster', '🦀': 'crab', '🐟': 'fish', '🐬': 'dolphin',
    '🐋': 'whale', '🦈': 'shark', '🐊': 'croc', '🐢': 'turtle', '🐍': 'snake', '🦎': 'lizard', '🦖': 'dino', '🐅': 'tiger', '🐆': 'leopard',
    '🦓': 'zebra', '🦍': 'gorilla', '🐘': 'elephant', '🦛': 'hippo', '🦏': 'rhino', '🐪': 'camel', '🦒': 'giraffe', '🦘': 'kangaroo', '🦥': 'sloth',
    '🦦': 'otter', '🦨': 'skunk', '🦡': 'badger', '🐁': 'mouse', '🐀': 'rat', '🐇': 'rabbit', '🐿️': 'chipmunk', '🦔': 'hedgehog'
};

// results phase
const resultsSidebar = document.getElementById('results-sidebar');
const resultsChat = document.getElementById('results-chat');
const resultsContinueBtn = document.getElementById('results-continue-btn');

let resultsData = null;
let resultsPlayers = [];
let currentChatIdx = 0;
let currentMsgStep = 0;
let isAdm = false;

// leaderboard phase
let leaderboardData = null;
let leaderboardDetails = null;

let leaderboardSection = document.getElementById('leaderboard-section');
if (!leaderboardSection) {
    leaderboardSection = document.createElement('div');
    leaderboardSection.id = 'leaderboard-section';
    leaderboardSection.style.display = 'none';
    leaderboardSection.innerHTML = `
        <h2 class="leaderboard-title">Leaderboard</h2>
        <table id="leaderboard-table" class="leaderboard-table"></table>
        <button id="new-game-btn" style="display:none;">New game</button>
    `;
    document.querySelector('.container').appendChild(leaderboardSection);
}
const leaderboardTable = leaderboardSection.querySelector('#leaderboard-table');
const newGameBtn = leaderboardSection.querySelector('#new-game-btn');

let guessSubmitted = false;
let lastSelectedEmojiCombo = null;
let lastSelectedPlayerId = null;

// event handlers
menuActionBtn.onclick = () => {
    const username = document.getElementById('username').value.trim();
    const isCreate = tabCreate.classList.contains('active');
    const userEmoji = localStorage.getItem('icontale_user_emoji') || '😀';
    if (!username) {
        alert('Пожалуйста, введите никнейм');
        return;
    }
    if (isCreate) {
        socket.emit('create-lobby', { username, emoji: userEmoji });
    } else {
        const roomCode = roomCodeInput.value.trim().toUpperCase();
        if (roomCode.length !== 6) {
            alert('Введите корректный код лобби (6 символов)');
            return;
        }
        socket.emit('join-lobby', { username, roomCode, emoji: userEmoji });
    }
};

startGameBtn.addEventListener('click', () => {
    if (currentRoomCode && isHost) {
        socket.emit('start-game', { roomCode: currentRoomCode });
    }
});

// handle server events
socket.on('lobby-created', ({ roomCode, players }) => {
    isHost = true;
    currentRoomCode = roomCode;
    showLobby(roomCode, players);
    errorMessage.textContent = '';
});

socket.on('lobby-joined', ({ roomCode, players }) => {
    isHost = false;
    currentRoomCode = roomCode;
    showLobby(roomCode, players);
    errorMessage.textContent = '';
});

socket.on('players-update', (players) => {
    updatePlayersList(players);
    if (isHost) {
        startGameBtn.disabled = players.length < 3;
    }
});

socket.on('lobby-error', ({ message }) => {
    errorMessage.textContent = message;
});

socket.on('lobby-closed', () => {
    alert('Lobby closed.');
    window.location.reload();
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('emojis-assigned', ({ emojis, writingStartTime }) => {
    lobbyDiv.style.display = 'none';
    resultsSection.style.display = 'none';
    guessSection.style.display = 'none';
    showTextWritingPhase(emojis, writingStartTime);
});

socket.on('guess-phase', ({ story, emojiOptions, players, authorId }) => {
    textWritingSection.style.display = 'none';
    showGuessSection(story, emojiOptions, players);
});

socket.on('results-progress', ({ currentChatIdx: idx, currentMsgStep: step }) => {
    currentChatIdx = idx;
    currentMsgStep = step;
    renderResultsSidebar();
    renderResultsChat();
});

socket.on('results-phase', (data) => {
    guessSection.style.display = 'none';
    resultsSection.style.display = 'block';
    resultsPlayers = data.players;
    resultsData = data.results;
    currentChatIdx = data.resultsState?.currentChatIdx || 0;
    currentMsgStep = data.resultsState?.currentMsgStep || 0;
    isAdm = isHost;
    renderResultsSidebar();
    renderResultsChat();
    resultsContinueBtn.style.display = isAdm ? 'block' : 'none';
    resultsContinueBtn.disabled = false;
});

function showLobby(roomCode, players) {
    document.getElementById('main-menu').style.display = 'none';
    lobbyDiv.style.display = 'block';
    roomCodeSpan.textContent = roomCode;
    updatePlayersList(players);
    startGameBtn.style.display = isHost ? 'inline-block' : 'none';
    startGameBtn.disabled = players.length < 3;
}

function updatePlayersList(players) {
    const grid = document.getElementById('players-grid');
    grid.innerHTML = '';
    players.slice(0, 20).forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'lobby-player';
        if (idx === 0) {
            const adm = document.createElement('div');
            adm.className = 'adm-label';
            adm.textContent = 'ADM';
            div.appendChild(adm);
        }
        const emoji = document.createElement('span');
        emoji.className = 'circle';
        emoji.textContent = p.emoji || '😀';
        div.appendChild(emoji);
        const nick = document.createElement('div');
        nick.className = 'player-nick';
        nick.textContent = p.name;
        div.appendChild(nick);
        grid.appendChild(div);
    });
}

function showStorySection(emojis) {
    storySection.style.display = 'block';
    guessSection.style.display = 'none';
    resultsSection.style.display = 'none';
    emojisSpan.textContent = emojis.join(' ');
    storyTextarea.value = '';
    wordCountSpan.textContent = '0';
    storySubmitted = false;
    storyTimeLeft = 180;
    updateTimer();
    if (storyTimer) clearInterval(storyTimer);
    storyTextarea.disabled = false;
    submitStoryBtn.disabled = false;
    storyTimer = setInterval(() => {
        storyTimeLeft--;
        updateTimer();
        if (storyTimeLeft <= 0) {
            clearInterval(storyTimer);
            if (!storySubmitted) submitStory();
        }
    }, 1000);
}

function updateTimer() {
    const min = Math.floor(storyTimeLeft / 60);
    const sec = storyTimeLeft % 60;
    timerSpan.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
}

storyTextarea.addEventListener('input', () => {
    const words = countWords(storyTextarea.value);
    wordCountSpan.textContent = words;
});

submitStoryBtn.addEventListener('click', () => {
    submitStory();
});

function submitStory() {
    if (storySubmitted) return;
    const story = storyTextarea.value.trim();
    const words = countWords(story);
    if (words <= 500) {
        socket.emit('submit-story', { roomCode: currentRoomCode, story });
        storySubmitted = true;
        storyTextarea.disabled = true;
        timerSpan.textContent = 'Submitted!';
        if (storyTimer) clearInterval(storyTimer);
    } else {
        alert('Your story must be no more than 500 words.');
    }
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function renderResultsSidebar() {
    resultsSidebar.innerHTML = '';
    resultsPlayers.forEach((p, idx) => {
        const btn = document.createElement('button');
        btn.className = 'results-player-btn' + (idx === currentChatIdx ? ' selected' : '');
        btn.onclick = () => {
            if (!isAdm) return;
            currentChatIdx = idx;
            currentMsgStep = 0;
            renderResultsSidebar();
            renderResultsChat();
            resultsContinueBtn.disabled = false;
        };
        const emoji = document.createElement('div');
        emoji.className = 'results-player-emoji';
        emoji.textContent = p.emoji || '😀';
        btn.appendChild(emoji);
        const nick = document.createElement('div');
        nick.className = 'results-player-nick';
        nick.textContent = p.name;
        btn.appendChild(nick);
        resultsSidebar.appendChild(btn);
    });
}

function renderResultsChat() {
    resultsChat.innerHTML = '';
    const res = resultsData[currentChatIdx];
    let guessEntry = null;
    if (res.guesses && Array.isArray(res.guesses)) {
        guessEntry = res.guesses.find(g => g.guess && g.guess.playerId === res.authorId) || res.guesses[0];
    } else if (res.guesses) {
        const arr = Object.values(res.guesses);
        guessEntry = arr.find(g => g.guess && g.guess.playerId === res.authorId) || arr[0];
    }
    let guesserPlayer = null, authorPlayer = null, guessEmojis = '', guessText = '—';
    if (guessEntry && guessEntry.guess) {
        guesserPlayer = resultsPlayers.find(p => p.id === guessEntry.playerId);
        authorPlayer = resultsPlayers.find(p => p.id === guessEntry.guess.playerId);
        guessEmojis = (guessEntry.guess.emojiCombo || []).join(' ');
        if (guesserPlayer && authorPlayer) {
            guessText = `${guessEmojis} — ${authorPlayer.name} (${authorPlayer.emoji || '😀'})`;
        }
    }
    const steps = [
        { side: 'left', avatar: '🤖', text: res.emojis.join(' '), typing: true },
        { side: 'right', avatar: resultsPlayers[currentChatIdx].emoji || '😀', text: res.story, typing: true },
        { side: 'left', avatar: guesserPlayer && guesserPlayer.emoji ? guesserPlayer.emoji : '😀', text: guessText, typing: true }
    ];
    for (let i = 0; i <= currentMsgStep && i < steps.length; i++) {
        renderResultsMsg(steps[i], i === currentMsgStep);
    }
}

function renderResultsMsg(msg, isTyping) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'results-msg ' + msg.side;
    const avatar = document.createElement('div');
    avatar.className = 'results-msg-avatar';
    avatar.textContent = msg.avatar;
    msgDiv.appendChild(avatar);
    const bubble = document.createElement('div');
    bubble.className = 'results-msg-bubble';
    msgDiv.appendChild(bubble);
    resultsChat.appendChild(msgDiv);
    if (isTyping && msg.typing) {
        typeText(msg.text, bubble, 18);
    } else {
        bubble.textContent = msg.text;
    }
}

function typeText(text, el, speed) {
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        el.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

function getGuessersText(res) {
    let s = '';
    if (res.emojiGuessers.length) {
        s += 'Emoji guessed by: ' + res.emojiGuessers.join(', ');
    } else {
        s += 'Emoji: никто не угадал';
    }
    s += '\n';
    if (res.authorGuessers.length) {
        s += 'Author guessed by: ' + res.authorGuessers.join(', ');
    } else {
        s += 'Author: никто не угадал';
    }
    return s;
}

resultsContinueBtn.onclick = () => {
    socket.emit('results-continue', { roomCode: currentRoomCode });
};

newGameBtn.onclick = () => {
    socket.emit('new-game', { roomCode: currentRoomCode });
};

socket.on('new-game-ready', ({ leaderboard }) => {
    resultsSection.style.display = 'none';
    lobbyDiv.style.display = 'block';
}); 

function getRandomEmoji() {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function setUserEmoji(emoji) {
    userEmojiSpan.textContent = emoji;
    localStorage.setItem('icontale_user_emoji', emoji);
}

function loadUserEmoji() {
    const saved = localStorage.getItem('icontale_user_emoji');
    if (saved) setUserEmoji(saved);
    else setUserEmoji(getRandomEmoji());
}

changeEmojiBtn.onclick = () => {
    let newEmoji;
    do {
        newEmoji = getRandomEmoji();
    } while (newEmoji === userEmojiSpan.textContent);
    setUserEmoji(newEmoji);
};

function setTab(tab) {
    if (tab === 'create') {
        tabCreate.classList.add('active');
        tabJoin.classList.remove('active');
        roomCodeInput.style.display = 'none';
        menuActionBtn.textContent = 'Create lobby';
    } else {
        tabCreate.classList.remove('active');
        tabJoin.classList.add('active');
        roomCodeInput.style.display = 'block';
        menuActionBtn.textContent = 'Join to lobby';
    }
}
tabCreate.onclick = () => setTab('create');
tabJoin.onclick = () => setTab('join');

window.addEventListener('DOMContentLoaded', () => {
    loadUserEmoji();
    setTab('create');
});

function showTextWritingPhase(emojis, writingStartTime) {
    textWritingSection.style.display = 'flex';
    writingEmojis = emojis;
    writingEmojisDiv.innerHTML = '';
    emojis.forEach(e => {
        const span = document.createElement('span');
        span.className = 'writing-emoji';
        span.textContent = e;
        const tip = document.createElement('span');
        tip.className = 'emoji-tooltip';
        tip.textContent = EMOJI_NAMES[e] || '';
        span.appendChild(tip);
        writingEmojisDiv.appendChild(span);
    });
    writingStory.value = '';
    writingStory.disabled = false;
    writingFinishBtn.textContent = 'Submit';
    textWritingSection.classList.remove('writing-finished');
    writingFinishBtn.disabled = false;

    let start = writingStartTime || Date.now();
    let now = Date.now();
    writingTimeLeft = Math.max(0, 180 - Math.floor((now - start) / 1000));
    updateWritingTimer();
    if (writingTimer) clearInterval(writingTimer);
    writingTimer = setInterval(() => {
        let now = Date.now();
        writingTimeLeft = Math.max(0, 180 - Math.floor((now - start) / 1000));
        updateWritingTimer();
        if (writingTimeLeft <= 0) {
            clearInterval(writingTimer);
            writingStory.disabled = true;
            textWritingSection.classList.add('writing-finished');
        }
    }, 1000);
}

function updateWritingTimer() {
    const min = Math.floor(writingTimeLeft / 60);
    const sec = writingTimeLeft % 60;
    writingTimerTime.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    const percent = Math.max(0, writingTimeLeft / 180);
    writingTimerBar.style.height = `${percent * 100}%`;
}

writingFinishBtn.onclick = () => {
    if (writingFinishBtn.textContent === 'Submit') {
        const story = writingStory.value.trim();
        if (!story) return;
        socket.emit('submit-story', { roomCode: currentRoomCode, story });
        writingStory.disabled = true;
        textWritingSection.classList.add('writing-finished');
        writingFinishBtn.textContent = 'Edit';
    } else {
        writingStory.disabled = false;
        textWritingSection.classList.remove('writing-finished');
        writingFinishBtn.textContent = 'Submit';
    }
};

function finishWriting() {
    writingFinished = true;
    textWritingSection.classList.add('writing-finished');
    writingStory.disabled = true;
    writingFinishBtn.textContent = 'Edit';
    writingFinishBtn.disabled = writingTimeLeft <= 0;
}

function showGuessSection(story, emojiOptions, players) {
    textWritingSection.style.display = 'none';
    guessSection.style.display = 'block';
    resultsSection.style.display = 'none';
    guessStoryDiv.textContent = story;
    emojiOptionsDiv.innerHTML = '';
    selectedEmojiCombo = lastSelectedEmojiCombo;
    emojiOptions.forEach((combo, idx) => {
        const btn = document.createElement('button');
        btn.textContent = combo.join(' ');
        btn.className = 'guess-emoji-btn';
        if (selectedEmojiCombo && JSON.stringify(combo) === JSON.stringify(selectedEmojiCombo)) {
            btn.classList.add('selected');
        }
        btn.onclick = () => {
            if (guessSubmitted) return;
            document.querySelectorAll('.guess-emoji-btn').forEach(b => {
                b.classList.remove('selected');
            });
            btn.classList.add('selected');
            selectedEmojiCombo = combo;
            updateGuessSubmitState();
        };
        emojiOptionsDiv.appendChild(btn);
    });

    playerOptionsDiv.innerHTML = '';
    selectedPlayerId = lastSelectedPlayerId;
    players.forEach(player => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span style="font-size:1.3em;vertical-align:middle;">${player.emoji || '😀'}</span> <span>${player.name}</span>`;
        btn.className = 'guess-player-btn';
        if (selectedPlayerId && player.id === selectedPlayerId) {
            btn.classList.add('selected');
        }
        btn.onclick = () => {
            if (guessSubmitted) return;
            document.querySelectorAll('.guess-player-btn').forEach(b => {
                b.classList.remove('selected');
            });
            btn.classList.add('selected');
            selectedPlayerId = player.id;
            updateGuessSubmitState();
        };
        playerOptionsDiv.appendChild(btn);
    });

    guessSubmitted = !!(lastSelectedEmojiCombo && lastSelectedPlayerId);
    submitGuessBtn.textContent = guessSubmitted ? 'Edit' : 'Submit';
    submitGuessBtn.disabled = !(selectedEmojiCombo && selectedPlayerId);
    setGuessInputsState(guessSubmitted);
    submitGuessBtn.onclick = () => {
        if (!guessSubmitted) {
            if (!selectedEmojiCombo || !selectedPlayerId) return;
            socket.emit('submit-guess', {
                roomCode: currentRoomCode,
                guess: {
                    emojiCombo: selectedEmojiCombo,
                    playerId: selectedPlayerId
                }
            });
            lastSelectedEmojiCombo = selectedEmojiCombo;
            lastSelectedPlayerId = selectedPlayerId;
            guessSubmitted = true;
            submitGuessBtn.textContent = 'Edit';
            setGuessInputsState(true);
        } else {
            guessSubmitted = false;
            submitGuessBtn.textContent = 'Submit';
            setGuessInputsState(false);
            updateGuessSubmitState();
        }
    };
    function updateGuessSubmitState() {
        submitGuessBtn.disabled = !(selectedEmojiCombo && selectedPlayerId);
    }
    function setGuessInputsState(disabled) {
        document.querySelectorAll('.guess-emoji-btn').forEach(b => {
            b.disabled = disabled;
            if (disabled) b.classList.add('inactive');
            else b.classList.remove('inactive');
        });
        document.querySelectorAll('.guess-player-btn').forEach(b => {
            b.disabled = disabled;
            if (disabled) b.classList.add('inactive');
            else b.classList.remove('inactive');
        });
    }
}

function showLeaderboardPhase(leaderboard, details, players) {
    document.getElementById('main-menu').style.display = 'none';
    lobbyDiv.style.display = 'none';
    storySection.style.display = 'none';
    guessSection.style.display = 'none';
    resultsSection.style.display = 'none';
    textWritingSection.style.display = 'none';
    leaderboardSection.style.display = 'block';
    leaderboardSection.style.opacity = 0;
    setTimeout(() => { leaderboardSection.style.opacity = 1; }, 50);
    leaderboardTable.innerHTML = '';

    const thead = document.createElement('thead');
    const trh = document.createElement('tr');
    const th1 = document.createElement('th'); th1.textContent = 'Emoji';
    const th2 = document.createElement('th'); th2.textContent = 'Player';
    const th3 = document.createElement('th'); th3.textContent = 'Points';
    trh.appendChild(th1); trh.appendChild(th2); trh.appendChild(th3);
    thead.appendChild(trh);
    leaderboardTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    players.forEach(p => {
        const tr = document.createElement('tr');
        const tdEmoji = document.createElement('td');
        tdEmoji.textContent = p.emoji || '😀';
        tr.appendChild(tdEmoji);
        const tdName = document.createElement('td');
        tdName.textContent = p.name;
        tr.appendChild(tdName);
        const tdPoints = document.createElement('td');
        tdPoints.textContent = leaderboard[p.id]?.toFixed(2) || '0';
        tdPoints.className = 'leaderboard-points';
        const tooltip = document.createElement('span');
        tooltip.className = 'leaderboard-tooltip';
        let tips = [];
        if (details && details[p.id]) {
            details[p.id].personal.forEach(item => tips.push(item.reason));
            details[p.id].earned.forEach(item => tips.push(item.reason));
        }
        tooltip.innerHTML = tips.length ? tips.map(t => `<div>${t}</div>`).join('') : 'No points';
        tdPoints.appendChild(tooltip);
        tdPoints.onmouseenter = () => { tooltip.style.display = 'block'; };
        tdPoints.onmouseleave = () => { tooltip.style.display = 'none'; };
        tr.appendChild(tdPoints);
        tbody.appendChild(tr);
    });
    leaderboardTable.appendChild(tbody);

    newGameBtn.style.display = 'block';
}

const style = document.createElement('style');
style.innerHTML = `
#leaderboard-section { display: none; margin-top: 2.5rem; animation: fadeIn 0.7s; }
.leaderboard-title { font-size: 2.2rem; color: #2366e8; margin-bottom: 1.5rem; }
.leaderboard-table { margin: 0 auto 2em auto; border-collapse: separate; border-spacing: 0 0.5em; font-size: 1.25rem; min-width: 340px; box-shadow: 0 2px 16px #2366e81a; background: #fff; border-radius: 16px; }
.leaderboard-table th, .leaderboard-table td { padding: 0.8em 1.5em; border: none; text-align: center; }
.leaderboard-table th { background: #2366e8; color: #fff; font-size: 1.1em; }
.leaderboard-table tr { border-radius: 12px; }
.leaderboard-table tr:nth-child(even) { background: #f0f6ff; }
.leaderboard-table tr:nth-child(odd) { background: #e3eaff; }
.leaderboard-points { position: relative; cursor: pointer; font-weight: bold; color: #2366e8; }
.leaderboard-tooltip { display: none; position: absolute; left: 50%; bottom: 120%; transform: translateX(-50%); background: #fff; color: #222; border: 1.5px solid #2366e8; border-radius: 10px; padding: 8px 16px; font-size: 1.05rem; min-width: 180px; box-shadow: 0 2px 8px #2366e81a; z-index: 1000; white-space: pre-line; pointer-events: none; }
.leaderboard-points:hover .leaderboard-tooltip { display: block; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(style);

function checkLeaderboardTransition() {
    if (isAdm && currentChatIdx === resultsPlayers.length - 1 && currentMsgStep >= 2) {
        socket.emit('leaderboard-phase', { roomCode: currentRoomCode });
    }
}

const origResultsContinue = resultsContinueBtn.onclick;
resultsContinueBtn.onclick = () => {
    origResultsContinue();
    setTimeout(checkLeaderboardTransition, 300);
};

socket.on('leaderboard-phase', ({ leaderboard, leaderboardDetails, players }) => {
    showLeaderboardPhase(leaderboard, leaderboardDetails, players);
}); 