function Game(){
    this.target = document.querySelector('.target')
    this.clickDisplay = document.querySelector('.clicks');
    this.upgradeBtn1 = document.querySelector('.multUpgrade')
    this.multUpValueDisplay = document.querySelector('.multUpValue')
    this.multDisplay = document.querySelector('.multDisplay')
    this.upgradeBtn2 = document.querySelector('.autoClickUpgrade')
    this.autoClickValueDisplay = document.querySelector('.autoClickValue')
    this.autoClickMultDisplay = document.querySelector('.autoClickMultDisplay')
    this.multUpDisplay = document.querySelector('.multUpDisplay')
    this.autoUpDisplay = document.querySelector('.autoUpDisplay')
  
    // definindo o valor inicial das variáveis
    let multiplier = 1
    let clickCount = 0
    let multUpValue = 20;
    let autoClickValue = 50;
    let autoClickMultiplier = 0;

    //função que inicia o jogo
    this.Start = _ =>{
        this.click();
        this.upgradesBlock();
        this.displayData();
    };

    this.changeSize = (h,w,m) => {
        this.target.style.height = h;
        this.target.style.width = w;
        this.target.style.marginLeft = m;
    }

    // função que adiciona o click + o multiplicador
    this.clickAdd = _ => {
        clickCount += 1 * multiplier;
        this.changeSize('230px','300px','39%');
        
        setTimeout(() =>{
            this.changeSize('250px','400px','37%');
        },100)
    };

    // função que bloqueia os botões de upgrade caso o jogador não tenha pontos o suficiente
    this.upgradesBlock = _ =>{
        setInterval(() =>{
            clickCount < multUpValue ? this.upgradeBtn1.disabled = true : this.upgradeBtn1.disabled = false
            clickCount < autoClickValue ? this.upgradeBtn2.disabled = true : this.upgradeBtn2.disabled = false
        })
    }

    // função que exibe quantos upgrades o usuário comprou e a quantidade de pontos automaticamente na página
    this.displayData = _ => {
        setInterval(()=>{
            this.clickDisplay.innerHTML = 'Blobs: ' + clickCount;
            this.autoUpDisplay.innerHTML = autoClickMultiplier + ' Clicks p/s';
            this.multUpDisplay.innerHTML = multiplier + 'x Clicks';
        })
    }

    // função do upgrade do multiplicador, adicionando + 1 a ele
    this.multUpgrade = _ => {
        clickCount -= multUpValue
        multUpValue += 50
        multiplier += 1
        this.multUpValueDisplay.innerHTML = multUpValue;
    }

    // função que ativa e melhora o "auto click"
    this.autoClickUpgrade = _ => {
        clickCount -= autoClickValue;
        autoClickValue += 70
        autoClickMultiplier += 1;
        this.autoClickValueDisplay.innerHTML = autoClickValue;
    };
    setInterval(() => {   
        clickCount += autoClickMultiplier;
    },1000)

    // função que captura os cliques do usuário e então executa uma das funções com base no que ele clicou
    this.click = _ => {
        document.addEventListener('click',e =>{
            const el = e.target;
            if (el.classList.contains('target')) this.clickAdd();
            if (el.classList.contains('multUpgrade')) this.multUpgrade();
            if (el.classList.contains('autoClickUpgrade')) this.autoClickUpgrade();
            this.upgradesBlock();
        })
    };
    
    // exibe os valores inicias dos upgrades
    this.multUpValueDisplay.innerHTML = multUpValue;
    this.autoClickValueDisplay.innerHTML = autoClickValue;
};
const clickerGame = new Game
clickerGame.Start()

