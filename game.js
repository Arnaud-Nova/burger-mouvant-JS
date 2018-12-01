var model = [
    'xxxxxxxxx**xx',
    'x********xx-x',
    'xxxxxxxx*x**x',
    'xx*****xxx*x*',
    'xxxxxx*x***x*',
    '****xx*x*xxx*',
    'xxx*xx*x*xxxx',
    'x*o*xx**xx*xx',
    'x***xxxxxx*xx',
    'xxxxxx*****xx',
];


var game = {
    init: function(){
    game.createPlayground();

    
    
    
    },
    cellWidth: 50,
    tableau: document.querySelector('.terrain_de_jeu'),
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },

    // générer le terrain de jeu
    createPlayground: function() {
        var width = model[0].length;
        console.log(game.cellWidth);
        var playgroundWidth = width * game.cellWidth;
        game.tableau.style.width = playgroundWidth + 'px';
        
        for (var line = 0; line < model.length; line++ ) {
            for (var column = 0; column < model[0].length; column++) {
                var cell = document.createElement('div');
                for (var type in game.types) {
                    if (type == model[line][column]) {
                        cell.classList = game.types[type] + ' square';
                    }
                }
                cell.style.display = 'inline-block';
                game.tableau.appendChild(cell);
    
            }
        }
    },
};


document.addEventListener('DOMContentLoaded', game.init);


//détecter les appuies sur les touches du clavier

    // déplacer le burger selon les appuis sur les touches

