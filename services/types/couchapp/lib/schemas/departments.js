exports.v1 = {
  "id": "departments",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "version": "1.0",
  "type": "object",
  "properties": {
    "fields": {
      "type": "object",
      "patternProperties": {
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
        "description|introduction|abbreviation": {
          "type": "object",
          "patternProperties": {
            "^([a-z]{2}|und)$": {
              "type": "array"
            }
          },
          "additionalProperties": false
        },
        "department_type": {
          "type": "object",
          "patternProperties": {
            "^([a-z]{2}|und)$": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["Directorate-General", "Service department", "Executive agency", "External department"]
              }
            }
          },
          "additionalProperties": false
        },
        "directorate_type": {
          "type": "object",
          "patternProperties": {
            "^([a-z]{2}|und)$": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["n/a", "policy", "operational"]
              }
            }
          },
          "additionalProperties": false
        },
        "main_task": {
          "type": "object",
          "patternProperties": {
            "^([a-z]{2}|und)$": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["n/a", "Policy-making and implementation", "Managing programmes", "Publications", "archives", "statistics", "Support to the public", "Support to EU institutions"]
              }
            }
          },
          "additionalProperties": false
        },
      },
      "required": [
        "title",
        "department_type",
        "directorate_type",
        "main_task",
        "abbreviation"
      ]
    }
  }
};
