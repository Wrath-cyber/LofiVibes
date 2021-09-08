<p align="center">
  <img src="https://i.ytimg.com/vi/q22uHBl9qxw/maxresdefault.jpg" />
  <small>
    * Illustration by <a href="https://www.instagram.com/visualdon/">@Visualdon</a>
  </small>
</p>

<h1 align="center">
  Lofi Vibes
</h1>

<p align="center">
  Discord bot that plays youtube live streams
</p>

<br />
<br />

## installation guide
### Prerequirements
* `node` (v12.x~)
* `npm` or `yarn`
* `mysql` or `mariadb`
* `java` (**v13.x only** due to lavalink conflict)

### Windows Installation (Currently Deprecated)
1. run `npm i` or `yarn` to get dependancies
1. if your jdk version is not `v13`, get it from [here](https://jdk.java.net/archive/)
2. get lavalink jar file from [here](https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar)
3. place `C:\path\to\download\folder\Lavalink.jar` to `C:\path\to\this\code\folder\lavalink/lavalink.jar`
4. run `java -jar lavalink/lavalink.jar` to start lavalink server
5. open mysql shell and run `source database.sql`
6. copy default configuration from `config.inc.json` to `config.json`
7. edit your `config.json` file
8. run `npm i` or `yarn` to get dependancies
9. open another terminal and run `yarn start`

### Linux Installation
1. run `npm i` or `yarn` to get dependancies
1. if your jdk version is not `v13`, get it from [here](https://jdk.java.net/archive/)
2. run `./install.sh` to get lavalink.jar file
3. run `java -jar lavalink/lavalink.jar` to start lavalink server
4. type `sudo mysql` to open mysql shell and run `source database.sql`
5. copy`config.inc.json` to `config.json`
6. edit your `config.json` file with your bot's token
7. run `npm i` or `yarn` to get dependancies
8. open another terminal and run `yarn start`


##COMMANDS##

* Help Page `lf>help`
* Select voice channel for lofi Vibes to auto join `lf>mark`
* View built in tracks with `lf>track`
* Check bot's status with `lf>status`
* To play a custom song/live stream, use `lf>play` followed by the youtube link
