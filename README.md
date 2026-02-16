# 🎭・icontale

> **icontale** is an engaging multiplayer web game inspired by Gartic Phone. But now, instead of drawing, you have to write a story based on the **emojis** you receive, and then **guess** the emojis and the **author** for the story you get.

![icontale gif](https://files.catbox.moe/wpaqw4.gif)

This README is also available in [**Russian**](/README_ru.md).

## 🛠️・tech stack

* **Server**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Real-time Engine**: [Socket.io](https://socket.io/)
* **Frontend**: HTML5, CSS3, Vanilla JS

## 🚀・getting started

### Prerequisites

[Node.js](https://nodejs.org/) (version 14 or higher) installed.

### Instructions

1. **clone the repository**:

    ```bash
    git clone https://github.com/username/icontale.git
    cd icontale
    ```

2. **install dependencies**:

    ```bash
    npm install
    ```

3. **start the server**:

    ```bash
    npm start
    ```

    *or for development mode:*

    ```bash
    node server.js
    ```

4. **done!**
Open your browser and go to: `http://localhost:3000`

---

## 🕹️・how it works

1. **Creating a lobby**: The host creates a room, chooses an avatar, and shares the code with friends (minimum 3 players).
2. **Writing phase**: Each player writes a short story based on the emojis they receive.
3. **Guessing phase**: Each player receives a story and guesses the emojis and the author.
4. **Chat**: After the game, the guessing results are shown in a chat format, with the host controlling the flow.
5. **Results**: At the end of the round, players see their earned points on the leaderboard.

## ❤️・screenshots and mechanics

**1. Creating a lobby:**
In the main menu, you can create or join a lobby. You can also choose your emoji avatar.
![index](https://files.catbox.moe/l93lj5.png)

In the lobby, you can see the lobby code, the number of players, and their emoji avatars.
![lobby](https://files.catbox.moe/zsn28o.png)

**2. Writing phase:**
While writing the story, you can hover over an emoji at any time to see its name.
![writing](https://files.catbox.moe/eyn08n.png)

**3. Guessing phase:**
The player is given 6 different emoji combinations and the other players to choose from.
![guessing](https://files.catbox.moe/sskepl.png)

**4. Chat:**
First, the emojis given to the player are shown, then their story, and finally the result of another player's guess. The host controls the flow of the chat.
![chat](https://files.catbox.moe/jmzibt.png)

**5. Results:**
The leaderboard shows the game results, displaying the players and their earned points. By hovering over the points, you can see exactly what they were awarded for. We have the following scoring system:

* +2 for your emojis being guessed correctly.
* +2 for being correctly guessed as the author.
* +1 if no one chose you as the author.
* +1 if no one guessed your emojis.
* +0.5 for correctly guessing the emojis of someone else's story.
* +0.5 for correctly guessing the author of someone else's story.

This scoring system is designed to incentivize players to write stories in a way that helps others guess the author and the emojis correctly.
![leaderboard](https://files.catbox.moe/vphg4x.png)

## 👥・team

This project was developed by a group of three students for module 306.

*Made with ❤️*