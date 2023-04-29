data = [
    {
        "name": "Beat Test",
        "bpm": 125,
        "songStr": ".. . ...",
        "difficulty": "test"
    },
    {
        "name": "Epic",
        "bpm": 165,
        "songStr": "..  ..  .  . . . . ... . . ..",
        "difficulty": "medium"
    }
]

window.onload = () => {
    
    if (document.cookie.beats != null) {
        data = JSON.parse(document.cookie.beats);
    } else {
        document.cookie = "beats="+JSON.stringify(data);
    }
}

