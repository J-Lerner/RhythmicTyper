data = [
    {
        "name": "Epic",
        "bpm": 165,
        "songStr": "..  ..  .  . . . . ... . . ..",
        "difficulty": "medium"
    },
    {
        "name": "Too Much?",
        "bpm": 300,
        "songStr": "... .. ... . ... . . . ...",
        "difficulty": "super hard"
    },
    {
        "name": "Some Charming Guy",
        "bpm": 208,
        "songStr": "..  .  .  . .. . .",
        "difficulty": "easy"
    },
    {
        "name": "Longo",
        "bpm": 200,
        "songStr": "....  .... ....  .... ....",
        "difficulty": "hard"
    },
    {
        "name": "Unnamed",
        "bpm": 1000,
        "songStr": "... .. ... ..   . . .... . . .... .. .. . .  .  .",
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

