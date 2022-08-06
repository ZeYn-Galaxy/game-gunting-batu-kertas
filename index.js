let pilihan = ['✂️', '👊', '🤚'];

let gunting = document.getElementById("gunting");
let batu = document.getElementById("batu");
let kertas = document.getElementById("kertas");
let reset = document.getElementById("reset");
let resultGame = document.getElementById('result');
let computerChoosen = document.getElementById('computer-input');
let userChoosen = document.getElementById('user-input');

class gamePlay {
    constructor(gameName, plrList) {
        this.games = gameName;
        this.plrList = plrList;
    }

    getPlayers(name) {
        if (this.plrList[name]) {
            return true;
        } else {
            return false;
        }
    }

    addPlayers(name) {
        if (this.plrList[name]) {
            return;
        }

        this.plrList[name] = true;
    }
}

class bot {
    generateOption() {
        return pilihan[Math.floor(Math.random() * pilihan.length)];
    }
}

class player extends gamePlay {
    constructor(player) {
        super('Game Gunting Batu Kertas', {})
        this.addPlayers(player);
        this.Player = player;
        this.Opsi;
        this.botOpsi;
        this.winner;
        this.Play = false;
    }

    isPlay() {
        return this.Play;
    }

    play(opsi) {
        // make sure Opsi have values.
        if (this.Play) {
            console.log("player already running.");
            return;
        }

        if (!opsi || opsi == "") {
            console.log('player do not choose the option.')
            return;
        }
        // is safe.
        let computer = new bot();
        this.Play = true;
        this.Opsi = opsi;
        this.botOpsi = computer.generateOption();
        // switch
        switch (opsi) {
            case '✂️':
                if (this.botOpsi === this.Opsi) {
                    this.winner = "seri";
                    break;
                }

                if (this.botOpsi === '🤚') {
                    this.winner = this.Player;
                } else {
                    this.winner = this.winner = "Computer";
                }
                break;
            case '👊':
                if (this.botOpsi === this.Opsi) {
                    this.winner = "seri";
                    break;
                }

                if (this.botOpsi === '✂️') {
                    this.winner = this.Player;
                } else {
                    this.winner = this.winner = "Computer";
                }
                break;
            case '🤚':
                if (this.botOpsi === this.Opsi) {
                    this.winner = "seri";
                    break;
                }
                
                if (this.botOpsi === '👊') {
                    this.winner = this.Player;
                } else {
                    this.winner = this.winner = "Computer";
                }
                break;
        }

        if (this.winner === this.Player) {
            console.log("Kamu menang");
            resultGame.innerText = "Yay! Kamu Menang!"
            computerChoosen.innerText = "Komputer Memilih: " + this.botOpsi;
            userChoosen.innerText = "Anda Memilih: " + this.Opsi;
        } else if (this.winner === "seri") {
            console.log("Hasilnya seri");
            resultGame.innerText = "Hasilnya Seri"
            computerChoosen.innerText = "Komputer Memilih: " + this.botOpsi;
            userChoosen.innerText = "Anda Memilih: " + this.Opsi;
        } else {
            console.log("Kamu kalah.");
            resultGame.innerText = "Yahh.. Kamu kalah."
            computerChoosen.innerText = "Komputer Memilih: " + this.botOpsi;
            userChoosen.innerText = "Anda Memilih: " + this.Opsi;
        }
    }

    reset() {
        if (this.Play) {
            this.Play = false;
        }
    }

    isPlayer() {
        return this.getPlayers(this.Player);
    }
}

let plr = new player('user');
function run(opsi) {

    if (plr.isPlayer() == true) {

        // Reset
        if (opsi === "reset") {
            plr.reset();
            return;
        }

        // Start the game
        if (plr.isPlay()) {
            console.log('player Already run.');
            return;
        }

        // Running
        plr.play(opsi);

    } else {
        console.log(`player ${user} not Ingame`);
    }
}

gunting.addEventListener('click', (e) => {
    run('✂️');
})

batu.addEventListener('click', (e) => {
    run('👊');
})

kertas.addEventListener('click', (e) => {
    run('🤚');
})

reset.addEventListener('click', (e) => {
    run('reset');
})