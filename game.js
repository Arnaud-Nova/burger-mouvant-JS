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
    game.heightPlayground = model.length;
    game.widthPlayground = model[0].length;
    //détecter les appuies sur les touches du clavier
    document.addEventListener('keydown', function(event) {
            if (event.key == 'ArrowDown') {
                game.moveDown();
            } else if (event.key == 'ArrowUp') {
                game.moveUp();
            } else if (event.key == 'ArrowLeft') {
                game.moveLeft();
            } else if (event.key == 'ArrowRight') {
                game.moveRight();
            }    
        });
    },

    // générer le terrain de jeu
    createPlayground: function() {
        game.tableau.innerHTML = "";
        var width = model[0].length;
        var playgroundWidth = width * game.cellWidth;
        game.tableau.style.width = playgroundWidth + 'px';
        
        for (var line = 0; line < model.length; line++ ) {
            for (var column = 0; column < model[0].length; column++) {
                var cell = document.createElement('div');
                for (var type in game.types) {
                    if (type == model[line][column]) {
                        cell.classList = game.types[type] + ' square';
                        if (model[line][column] == 'o') { //on en profite pour vérifier l'emplacement du burger !
                            game.oLine = line;
                            game.oColumn = column;
                        }
                    }
                }
                cell.style.display = 'inline-block';
                game.tableau.appendChild(cell);
            }
        }
    },   
    
    moveUp: function() {
        if (game.oLine - 1 >= 0 && model[game.oLine - 1][game.oColumn] != '*') {// on vérifie si on est tout en haut du tableau et s'il y a un mur
            if (model[game.oLine - 1][game.oColumn] == '-') {
                window.alert('Bravo vous avez gagné !')
            } else {
                game.verticalMove(game.oLine - 1);
            }
        }
    },

    moveDown: function() {
        if (game.oLine + 1 <= game.heightPlayground && model[game.oLine + 1][game.oColumn] != '*') {// on vérifie si on est tout en bas du tableau et s'il y a un mur
            if (model[game.oLine + 1][game.oColumn] == '-') {
                window.alert('Bravo vous avez gagné !')
            } else {
                game.verticalMove(game.oLine + 1);
            }
        }
    },

    moveLeft: function() {
        if (game.oColumn - 1 >= 0 && model[game.oLine][game.oColumn - 1] != '*') {// on vérifie si on est tout à gauche du tableau et s'il y a un mur
            if (model[game.oLine][game.oColumn - 1] == '-') {
                window.alert('Bravo vous avez gagné !')
            } else {
                var debut = model[game.oLine].slice(0, game.oColumn - 1);
                var fin = model[game.oLine].slice(game.oColumn +1, 13);
                model[game.oLine] = debut + 'ox' + fin;
                game.createPlayground(); 
            }
        }
    },

    moveRight: function() {
        if (game.oColumn + 1 <= game.widthPlayground && model[game.oLine][game.oColumn + 1] != '*') {// on vérifie si on est tout à droite du tableau et s'il y a un mur
            if (model[game.oLine][game.oColumn + 1] == '-') {
                window.alert('Bravo vous avez gagné !')
            } else {
                var debut = model[game.oLine].slice(0, game.oColumn);
                var fin = model[game.oLine].slice(game.oColumn + 2, 13);
                model[game.oLine] = debut + 'xo' + fin;
                game.createPlayground(); 
            } 
        }
    },

    verticalMove: function(move) {
        // modifie la ligne d'où part le burger
        var debut = model[game.oLine].slice(0, game.oColumn);
        var fin = model[game.oLine].slice(game.oColumn + 1, 13);
        model[game.oLine] = debut + 'x' + fin;
        // modifie la ligne où va le burger
        var debut = model[move].slice(0, game.oColumn);
        var fin = model[move].slice(game.oColumn + 1, 13);
        model[move] = debut + 'o' + fin;
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
};


document.addEventListener('DOMContentLoaded', game.init);
