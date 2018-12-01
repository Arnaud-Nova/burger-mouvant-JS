var model = {
    'beginner': [
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
    ],
    'advanced': [
        'xxxxxxxxxz*xx',
        'x***z****xx-x',
        'xxxxxxxxzx**x',
        'xx**zz*xxxzz*',
        'xxxxxx*x***x*',
        '**z*zx*x*xxx*',
        'xxx*xx*x*xxxx',
        'x*o*xzz*xx*xz',
        'x*z*xxxxxx*xx',
        'xxxxxx**z**xx',
    ]
};


var game = {
    init: function(){
    game.createNav();
    //détecter les appuies sur les touches du clavier
    document.addEventListener('keydown', function(event) {
            if (event.key == 'ArrowDown') {
                game.moveDown(game.level);
            } else if (event.key == 'ArrowUp') {
                game.moveUp(game.level);
            } else if (event.key == 'ArrowLeft') {
                game.moveLeft(game.level);
            } else if (event.key == 'ArrowRight') {
                game.moveRight(game.level);
            }    
        });
    },

    createNav: function() {
        for (var layout in model) {
          var li = document.createElement('li');
          li.textContent = layout;
          li.dataset.modelName = layout;
          var ul = document.querySelector('#navigation > ul');
          ul.appendChild(li);
          li.addEventListener('click', game.playgroundChoice);
        }
    },

    playgroundChoice: function(evt) {
        game.level = evt.target.dataset.modelName;
        game.tableau.innerHTML = '';
        game.createPlayground(game.level);
      },

    // générer le terrain de jeu
    createPlayground: function(level) {
        game.tableau.innerHTML = '';
        game.heightPlayground = model[level].length;
        game.widthPlayground = model[level][0].length; 
        var width = model[level][0].length;
        var playgroundWidth = width * game.cellWidth;
        game.tableau.style.width = playgroundWidth + 'px';
        
        for (var line = 0; line < model[level].length; line++ ) {
            for (var column = 0; column < model[level][0].length; column++) {
                var cell = document.createElement('div');
                for (var type in game.types) {
                    if (type == model[level][line][column]) {
                        cell.classList = game.types[type] + ' square';
                        if (model[level][line][column] == 'o') { //on en profite pour vérifier l'emplacement du burger !
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
    
    moveUp: function(level) {
        if (model[level][game.oLine - 1][game.oColumn] == 'z') {
            window.alert('Perdu');
            document.location.reload(true);
        } else {
            if (game.oLine - 1 >= 0 && model[level][game.oLine - 1][game.oColumn] != '*') {// on vérifie si on est tout en haut du tableau et s'il y a un mur
                if (model[level][game.oLine - 1][game.oColumn] == '-') {
                    window.alert('Bravo vous avez gagné !')
                } else {
                    game.verticalMove(game.oLine - 1, game.level);
                }
            }
        }
    },

    moveDown: function(level) {
        if (model[level][game.oLine + 1][game.oColumn] == 'z') {
            window.alert('Perdu');
            document.location.reload(true);
        } else {
            if (game.oLine + 1 <= game.heightPlayground && model[level][game.oLine + 1][game.oColumn] != '*') {// on vérifie si on est tout en bas du tableau et s'il y a un mur
                if (model[level][game.oLine + 1][game.oColumn] == '-') {
                    window.alert('Bravo vous avez gagné !')
                } else {
                    game.verticalMove(game.oLine + 1, game.level);
                }
            }
        }
    },

    moveLeft: function(level) {
        if (model[level][game.oLine][game.oColumn - 1] == 'z') {
            window.alert('Perdu');
            document.location.reload(true);
        } else {
            if (game.oColumn - 1 >= 0 && model[level][game.oLine][game.oColumn - 1] != '*') {// on vérifie si on est tout à gauche du tableau et s'il y a un mur
                if (model[level][game.oLine][game.oColumn - 1] == '-') {
                    window.alert('Bravo vous avez gagné !')
                } else {
                    var debut = model[level][game.oLine].slice(0, game.oColumn - 1);
                    var fin = model[level][game.oLine].slice(game.oColumn +1, 13);
                    model[level][game.oLine] = debut + 'ox' + fin;
                    game.createPlayground(game.level); 
                }
            }  
        }
    },

    moveRight: function(level) {
        if (model[level][game.oLine][game.oColumn + 1] == 'z') {
            window.alert('Perdu');
            document.location.reload(true);
        } else {
            if (game.oColumn + 1 <= game.widthPlayground && model[level][game.oLine][game.oColumn + 1] != '*') {// on vérifie si on est tout à droite du tableau et s'il y a un mur
                if (model[level][game.oLine][game.oColumn + 1] == '-') {
                    window.alert('Bravo vous avez gagné !')
                } else {
                    var debut = model[level][game.oLine].slice(0, game.oColumn);
                    var fin = model[level][game.oLine].slice(game.oColumn + 2, 13);
                    model[level][game.oLine] = debut + 'xo' + fin;
                    game.createPlayground(game.level); 
        
                }
            }
        }
    },

    verticalMove: function(move, level) {
        // modifie la ligne d'où part le burger
        var debut = model[level][game.oLine].slice(0, game.oColumn);
        var fin = model[level][game.oLine].slice(game.oColumn + 1, 13);
        model[level][game.oLine] = debut + 'x' + fin;
        // modifie la ligne où va le burger
        var debut = model[level][move].slice(0, game.oColumn);
        var fin = model[level][move].slice(game.oColumn + 1, 13);
        model[level][move] = debut + 'o' + fin;
        game.createPlayground(game.level);
    },
   
    cellWidth: 50,
    tableau: document.querySelector('.terrain_de_jeu'),
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal',
        'z': 'fire'
    },
};


document.addEventListener('DOMContentLoaded', game.init);
