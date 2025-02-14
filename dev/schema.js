window.schema = 
    {
        "type": "object",
        "title": "Profil",
        "properties": {
            "name": { "type": "string" },
            "hero": {
                "type": "string",
                "oneOf": [
                    { "const": null, "title": "Choose your hero" },
                    { "const": "Tony Stark", "title": "Iron Man" },
                    { "const": "Steve Rogers", "title": "Captain America" },
                    { "const": "Romanov", "title": "Black Widow" },
                    { "const": "Natacha ", "title": "Hulk" },
                    { "const": "Brie Larson", "title": "Captain Marvel" },
                    { "const": "daddy", "title": "Super Dad" },
                ]
            },
            "color": {
                "type": "string",
                "enum": [ "red","green","blue","yellow"]
            }
        },
        "required": ["name"]
    }