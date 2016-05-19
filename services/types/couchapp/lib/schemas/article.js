exports.v1 = {
    "id": "article",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "version": "1.0",
    "type": "object",
    "properties": {
        "fields": {
            "type": "object",
            "properties":{
                "^[a-z_]*$":{
                    "type": "object",
                    "patternProperties": {
                        "^([a-z]{2}|und)$": {
                            "type": "array"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "required": [
                "title",
                "abstract"
            ]
        }
    }
};