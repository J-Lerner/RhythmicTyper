data = [
    {
        "name": "Epic",
        "bpm": 80,
        "songStr": "..--..--.--.-.-.-.-...-.-.-..",
        "difficulty": "medium"
    },
    {
        "name": "Too Much?",
        "bpm": 150,
        "songStr": "...-..-...-.-...-.-.-.-...",
        "difficulty": "super hard"
    },
    {
        "name": "Some Charming Guy",
        "bpm": 104,
        "songStr": "..-.-.-.-..-.-.",
        "difficulty": "easy"
    },
    {
        "name": "Longo",
        "bpm": 100,
        "songStr": "....--....-....--....-....",
        "difficulty": "hard"
    },
    {
        "name": "Unnamed",
        "bpm": 500,
        "songStr": "...-..-...-..---.-.-....-.-.-....-..-..-.-.--. -.",
        "difficulty": "not possible"
    }
]

window.onload = () => {
    
    if (document.cookie.beats != null) {
        data = JSON.parse(document.cookie.beats);
    } else {
        document.cookie = "beats="+JSON.stringify(data);
    }
}

