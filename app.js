let words = [];
let score = 0;
let time = 0;
let gameBoard = document.getElementById('game-board');
let generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', function() {
    let word = document.getElementById('word-input').value;
    let gridSize = document.getElementById('grid-size').value;
    generateGameBoard(word, gridSize);
});

var firebaseConfig = {
    // 파이어베이스 설정
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

function saveGameBoard(board) {
    let newBoardRef = database.ref('boards/').push();
    newBoardRef.set(board);
}


function generateGameBoard(word, gridSize) {
    // 게임 보드 생성 로직
    // 파이어베이스에 보드 데이터 저장
}


firebase.database().ref('words').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        words.push(childSnapshot.val());
    });
    
});

setInterval(function() {
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('time').innerText = 'Time: ' + time;
    time++;
}, 1000);

document.getElementById('wordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let word = document.getElementById('wordInput').value;

    // Add the word to Firebase
    firebase.database().ref('words').push(word);
});

function checkWord(word) {
    // Check if the word exists in Firebase
    firebase.database().ref('words').orderByValue().equalTo(word).once('value', function(snapshot) {
        if (snapshot.exists()) {
            // The word exists, so delete it from Firebase and update the score
            firebase.database().ref('words').child(snapshot.key).remove();
            score++;
        }
    });
}
