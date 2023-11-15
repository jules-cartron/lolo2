document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 767) {
        document.body.classList.add('mobile');
    }
    let gameInterval;
    let obstacleInterval;
    let obstacles = [];
    let currentObstacleIndex = 0;
    let isJumping = false;
  


    let isGameOver = false;
    let obstacleDelay = 1000; // Temps d'attente en millisecondes
    let bestScore = 0; // Initialisez la meilleure score à zéro

    let intervallolorico =250;

    
    let score = 0; 
    let cocostarte = 2;
    let ricostarte =3;
    let zarmastarte =10
    

    // Éléments HTML
    const dino = document.getElementById('dino');
    const dino1 = document.getElementById('dino1');
    const dino2 = document.getElementById('dino2');
    const dino3 = document.getElementById('dino3');

    const rico = document.getElementById('rico');
    const rico1 = document.getElementById('rico1');
    const rico2 = document.getElementById('rico2');
    const rico3 = document.getElementById('rico3');



    

    
    const obstacle1a = document.querySelector('.obstacle.obstacle1 img:nth-child(1)');
    const obstacle1b = document.querySelector('.obstacle.obstacle1 img:nth-child(2)');



    function startAnimation() {
        const movingImage = document.getElementById('moving-image1'); // Utilisation d'un ID unique (moving-image1)
        let currentPosition = window.innerWidth; // Commence à droite de l'écran
    
        // Cacher l'image au début
        movingImage.style.display = 'none';
    
        function moveImage() {
            if (currentPosition > 0) {
                currentPosition -= 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(moveImage);
            }
        }
    
        function reverseMoveImage() {
            if (currentPosition < window.innerWidth * 0.9) {
                currentPosition += 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(reverseMoveImage);
            }
        }
    
        moveImage();
    
        // Révéler l'image lorsque l'animation commence
        movingImage.style.display = 'block';
    
        var imageSources = ['coco1.PNG', 'coco2.PNG', 'coco3.PNG', 'coco4.PNG', 'coco5.PNG', 'coco6.PNG', 'coco5.PNG', 'coco4.PNG', 'coco3.PNG', 'coco2.PNG', 'coco1.PNG'];
        var currentIndex = 0;
        
        setInterval(function() {
            movingImage.src = imageSources[currentIndex];
            currentIndex = (currentIndex + 1) % imageSources.length;
        }, 100);
        
    }
    
    function startAnimation2() {
        const movingImage = document.getElementById('moving-image2'); // Utilisation d'un ID unique (moving-image2)
        let currentPosition = -movingImage.width; // Commence à gauche de l'écran
    
        // Cacher l'image au début
        movingImage.style.display = 'none';
    
        function moveImage() {
            if (currentPosition < window.innerWidth * 0) {
                currentPosition += 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(moveImage);
            }
        }
    
        function reverseMoveImage() {
            if (currentPosition > -movingImage.width) {
                currentPosition -= 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(reverseMoveImage);
            }
        }
    
        moveImage();
        // Révéler l'image lorsque l'animation commence
        movingImage.style.display = 'block';
    

        
    }
    function startAnimation3() {
        const movingImage = document.getElementById('moving-image3'); // Utilisation d'un ID unique (moving-image1)
        let currentPosition = window.innerWidth; // Commence à droite de l'écran
    
        // Cacher l'image au début
        movingImage.style.display = 'none';
        const stopezarma = window.innerWidth <= 767 ? 150 : 300; 
        function moveImage() {
            if (currentPosition > stopezarma) {
                currentPosition -= 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(moveImage);
            }
        }
    
        function reverseMoveImage() {
            if (currentPosition < window.innerWidth * 0.9) {
                currentPosition += 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(reverseMoveImage);
            }
        }
    
        moveImage();
    
        // Révéler l'image lorsque l'animation commence
        movingImage.style.display = 'block';
    
        var imageSources = ['zarma1.PNG', 'zarma2.PNG']; // Changement des noms de fichiers
        var currentIndex = 0;
    
        setInterval(function() {
            movingImage.src = imageSources[currentIndex];
            currentIndex = (currentIndex + 1) % imageSources.length;
        }, 200);
    }
    
    
    
    const toggleObstacleImages = function() {
        setInterval(function() {
            if (!isGameOver) {
                if (obstacle1a.style.display === 'block') {
                    obstacle1a.style.display = 'none';
                    obstacle1b.style.display = 'block';
                } else {
                    obstacle1b.style.display = 'none';
                    obstacle1a.style.display = 'block';
                }
            }
        }, 200); // Changez la valeur à 200 pour un clignotement toutes les 0.2 secondes
    };
    

    const startDinoAnimation = function() {
        setInterval(function() {
            if (!isJumping) {
                if (dino1.style.display === 'block') {
                    dino1.style.display = 'none';
                    dino2.style.display = 'block';
                } else if (dino2.style.display === 'block') {
                    dino2.style.display = 'none';
                    dino3.style.display = 'block';
                } else if (dino3.style.display === 'block') {
                    dino3.style.display = 'none';
                    dino1.style.display = 'block';
                }
            }
        }, 200);
    };

    const startRicoAnimation = function() {
        setInterval(function() {
            if (!rico.isJumping) {
                if (rico1.style.display === 'block') {
                    rico1.style.display = 'none';
                    rico2.style.display = 'block';
                } else if (rico2.style.display === 'block') {
                    rico2.style.display = 'none';
                    rico3.style.display = 'block';
                } else if (rico3.style.display === 'block') {
                    rico3.style.display = 'none';
                    rico1.style.display = 'block';
                }
            }
        }, 200);
    };
    

    startDinoAnimation();
    startRicoAnimation();
    
    // ... (rest of your code)
    
    function moveImageFromLeft(element, startPosition, targetPosition, duration) {
        const startTime = performance.now();
        const distance = targetPosition - startPosition;
    
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
    
            if (progress < 1) {
                const newPosition = startPosition + distance * progress;
                element.style.left = newPosition + 'px';
                requestAnimationFrame(animate);
            } else {
                element.style.left = targetPosition + 'px';
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    // ... (rest of your code)
    
    function startrico() {
        jump(dino, dino1, dino2, dino3);
        console.log("jump dino");
    
        setTimeout(() => {
            if (score >= ricostarte) {
                // Animate Rico from the left when the score is 3
                if (score === 3) {
                    document.getElementById('rico').style.display = 'block';
                   
                    const startPosition = -20; // Adjust as needed
                    const targetPosition = 20; // Adjust as needed
                    const duration = 1000; // Adjust as needed (in milliseconds)
                    moveImageFromLeft(rico, startPosition, targetPosition, duration);
                    
                }
                jump(rico, rico1, rico2, rico3);
                console.log("jump rico");
            }
        },intervallolorico);
    }
    
    
    

    

    

        function jump(element, element1, element2, element3) {
            if (!element.isJumping) { // Vérifie si l'élément n'est pas déjà en train de sauter
                element.isJumping = true; // Marque l'élément comme étant en train de sauter
                console.log("jump");
                let position = 0;
                const jumpInterval = setInterval(function() {
                    const jumpHeight = window.innerWidth <= 767 ? 150 : 250; 
                    if (position >= jumpHeight) {
                        clearInterval(jumpInterval);
                        const fallInterval = setInterval(function() {
                            if (position >= 3) {
                                position -= 3;
                                element.style.bottom = position + 'px';
                                element1.style.display = 'none';
                                element2.style.display = 'none';
                                element3.style.display = 'block';
                            } else {
                                clearInterval(fallInterval);
                                element.isJumping = false; // Marque l'élément comme ayant fini de sauter
                                element1.style.display = 'block';
                                element2.style.display = 'none';
                                element3.style.display = 'none';
                            }
                        }, 10);
                    } else {
                        position += window.innerWidth <= 767 ? 3 : 5;
                        element.style.bottom = position + 'px';
                        element1.style.display = 'none';
                        element2.style.display = 'none';
                        element3.style.display = 'block';
                    }
                }, 10);
            }
        }
        function handleTouchOrClick() {
            if (!isGameOver) {
                startrico();
            }
        }
        
        document.addEventListener('mousedown', handleTouchOrClick, { passive: false });
        document.addEventListener('touchstart', function(event) {
            if (!isGameOver) {  // Vérifier si la partie n'est pas déjà perdue
                event.preventDefault(); // Empêcher le comportement par défaut
                startrico();
            }
        }, { passive: false });
        
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowUp') {
                startrico();
            }
        });

        
                

        
        // Spécifier que l'écouteur n'est pas passif
        
        function aleatoirobstacle(){
            console.log("obstacle")
            const nombreAleatoire = Math.floor(Math.random() * 8) + 1;
            console.log(nombreAleatoire);
            function changerImage(numero) {
                // Listes des fichiers d'image pour chaque image
                const listeFichiersImage1 = [
                    "police11.PNG",
                    "police21.PNG",
                    "police31.PNG",
                    "police41.PNG",
                    "police51.PNG",
                    "police61.PNG",   
                    "police71.PNG",
                    "police81.PNG", 
                    // Ajoutez d'autres fichiers d'image selon vos besoins
                ];
    
                const listeFichiersImage2 = [
                    "police12.PNG",
                    "police22.PNG",
                    "police32.PNG",
                    "police42.PNG",
                    "police52.PNG",
                    "police62.PNG",
                    "police72.PNG",
                    "police82.PNG",
                    // Ajoutez d'autres fichiers d'image selon vos besoins
                ];
    
                // Vérifier si le numéro est dans la plage valide
                if (numero >= 1 && numero <= listeFichiersImage1.length) {
                    // Changer la source de la première image
                    document.getElementById("image1").src = listeFichiersImage1[numero - 1];
                } else {
                    console.error("Numéro non valide pour l'image 1. Assurez-vous que le numéro est entre 1 et " + listeFichiersImage1.length);
                }
    
                // Vérifier si le numéro est dans la plage valide
                if (numero >= 1 && numero <= listeFichiersImage2.length) {
                    // Changer la source de la deuxième image
                    document.getElementById("image2").src = listeFichiersImage2[numero - 1];
                } else {
                    console.error("Numéro non valide pour l'image 2. Assurez-vous que le numéro est entre 1 et " + listeFichiersImage2.length);
                }
            }
        }
        aleatoirobstacle(3);
        function moveObstacle(obstacle) {
            console.log("obstaclemove")
            const nombreAleatoire = Math.floor(Math.random() * 9) + 1;
            console.log(nombreAleatoire);
            const obstacleWidth = obstacle.offsetWidth;
            let obstacleLeft = window.innerWidth;
        
            let obstacleInterval = setInterval(function() {
                obstacleLeft -= window.innerWidth <= 767 ? 3 : 5;
                obstacle.style.left = obstacleLeft + 'px';
        
                if (obstacleLeft < -obstacleWidth) {
                    obstacleLeft = window.innerWidth;
                    clearInterval(obstacleInterval);
        
                    setTimeout(function() {
                        obstacleInterval = moveObstacle(obstacle);
                    }, obstacleDelay);
                }
            }, 10);
        
            return obstacleInterval;
        }
    

    const obstacle1 = document.querySelector('.obstacle.obstacle1');
    obstacles.push(obstacle1);

    function checkCollision() {
        const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    
        obstacles.forEach(function(obstacle) {
            if (!obstacle) return; // Vérifie si l'obstacle est défini
    
            const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    
            if (obstacleLeft < 90 && obstacleLeft > 72 && dinoBottom <= 30) {
                clearInterval(gameInterval);
                clearInterval(obstacleInterval);
                isGameOver = true;
                displayGameOverScreen();
                sauvegarderMeilleurScore(score);
            }
        });
    }
    function sauvegarderMeilleurScore(score) {
        var meilleurScoreActuel = recupererMeilleurScore();
    
        if (meilleurScoreActuel === null || score > meilleurScoreActuel) {
            // Enregistrez le nouveau meilleur score
            var expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            document.cookie = "meilleurScore=" + score + "; expires=" + expirationDate.toUTCString();
            
            console.log("Nouveau meilleur score enregistré : " + score);
        } else {
            console.log("Le meilleur score reste : " + meilleurScoreActuel);
        }
    }
    
    
    function recupererMeilleurScore() {
        var cookieValeur = getCookie("meilleurScore");
        return cookieValeur ? parseInt(cookieValeur) : null;
    }
    
    function getCookie(nom) {
        var nomEQ = nom + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nomEQ) == 0) return c.substring(nomEQ.length,c.length);
        }
        return null;
    }
    





    
    function recupererMeilleurScore() {
        var cookieValeur = getCookie("meilleurScore");
        return cookieValeur ? parseInt(cookieValeur) : null;
    }      

    
    
    // Afficher le meilleur score dans l'écran de Game Over
    function displayGameOverScreen() {
        const gameContainer = document.getElementById('game-container');
        const meilleurScore = recupererMeilleurScore();
        gameContainer.innerHTML = `
            <div class="game-over-screen">
                <h1>Game Over</h1>
                <div id="score">Score: ${score}</div>
                <div id="best-score">Best Score: ${meilleurScore !== null ? meilleurScore : 0}</div>
                <button id="restart-button">Restart</button>
            </div>
        `;
    
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', resetGame);
    }
    
    

    function resetGame() {
        location.reload();
        clearInterval(obstacleInterval);
        obstacles = [];
        currentObstacleIndex = 0;
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = `
            <!-- ... (votre code HTML) ... -->
        `;
    
        obstacles = [document.querySelector('.obstacle.obstacle1')];
        moveNextObstacle();
    
        dino.style.bottom = '0';
    
        gameInterval = setInterval(checkCollision, 10);
    
        isJumping = false;
        isGameOver = false;
    
        const restartButton = document.getElementById('restart-button');
        restartButton.disabled = true;
    
        startDinoAnimation();
    }
    

    function moveNextObstacle() {
        if (currentObstacleIndex < obstacles.length) {
            const obstacleType = currentObstacleIndex % 2 === 0 ? 'obstacle1' : 'obstacle2';
            const obstacle = document.querySelector(`.${obstacleType}`);
            obstacleInterval = moveObstacle(obstacle);
            console.log("obstacle")
            currentObstacleIndex++;
            if (currentObstacleIndex >= obstacles.length) {
                currentObstacleIndex = 0;
            }
        }
    }

    moveNextObstacle();





    gameInterval = setInterval(function() {
        if (!isGameOver) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            if (score === cocostarte) {
                console.log("coco");
                startAnimation();
            }
            if (score === ricostarte) {
                console.log("rico");
                startAnimation2();
                
            }
            if (score === zarmastarte){
                console.log("zarma")
                startAnimation3();
            }
    
            // Mettez à jour le meilleur score si nécessaire
            if (score > bestScore) {
                bestScore = score;
            }
        }
    }, 2000);
    

    // ... (votre code existant) ...



    gameInterval = setInterval(checkCollision, 10);
    toggleObstacleImages();
    startDinoAnimation();
});