class CenaJogo extends Phaser.Scene {
    constructor() {
        super({ key: "CenaJogo" });
    }

    preload() {
        // Carrega o spritesheet do personagem
        this.load.spritesheet("player", "assets/Unarmed_Walk/playerAnim.png", {
            frameWidth: 64,  // Largura de cada frame
            frameHeight: 64  // Altura de cada frame
        });

        this.load.image('gamebg', 'assets/schoolBg.webp');
    }

    create() {
        this.add.image(400, 300, 'gamebg');
        
        // Adiciona o jogador ao jogo
        this.player = this.physics.add.sprite(400, 300, "player").setScale(1.5);

        // Criando animações de caminhada
        this.anims.create({
            key: "andar-baixo",
            frames: this.anims.generateFrameNumbers("player", { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andar-esquerda",
            frames: this.anims.generateFrameNumbers("player", { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andar-direita",
            frames: this.anims.generateFrameNumbers("player", { start: 13, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andar-cima",
            frames: this.anims.generateFrameNumbers("player", { start: 19, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        // Adicionando controles (Setas + WASD)
        this.cursor = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        // Resetando a velocidade
        this.player.setVelocity(0);

        // Verifica teclas pressionadas e ajusta velocidade e animação
        if (this.cursor.left.isDown || this.keys.A.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("andar-esquerda", true);
        } else if (this.cursor.right.isDown || this.keys.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("andar-direita", true);
        } else if (this.cursor.up.isDown || this.keys.W.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play("andar-cima", true);
        } else if (this.cursor.down.isDown || this.keys.S.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play("andar-baixo", true);
        } else {
            this.player.anims.stop(); // Para a animação se não estiver se movendo
        }
    }
}
