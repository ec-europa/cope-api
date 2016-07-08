exports.v1 = {
    "id": "news",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "version": "1.0",
    "type": "object",
    "properties": {
        "fields": {
            "type": "object",
            "patternProperties": {
                "featured_image|featured_media|sources": {
                    "type": "object",
                    "patternProperties": {
                        "^([a-z]{2}|und)$": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "pattern": "(http|https):\\\/\\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\\/|\\\/([\\w#!:.?+=&%@!\\-\\\/]))?"
                            }
                        }
                    }
                },
                "title": {
                    "type": "object",
                    "patternProperties": {
                        "^([a-z]{2}|und)$": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "pattern": "[0-9A-Za-z-?! ]{1,256}$"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "long_title|description|news_type|introduction|body|location|background_information": {
                    "type": "object",
                    "patternProperties": {
                        "^([a-z]{2}|und)$": {
                            "type": "array"
                        }
                    },
                    "additionalProperties": false
                },
                "publish_date|update_date": {
					          "type": "string",
                    "format":"date-time"
                },
                "department|person": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "pattern": "[0-9A-Za-z-?! ]{32}$"
                    }
                }
            },
            "required": [
                "title",
                "long_title",
                "description",
                "news_type",
                "publish_date",
                "update_date",
                "body",
                "location"
            ]
        }
    }
}
