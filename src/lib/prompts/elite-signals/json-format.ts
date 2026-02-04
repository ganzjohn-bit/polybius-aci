export const JSON_FORMAT = `
RESPOND WITH ONLY THIS JSON (follow this format exactly):
{
  "defections": {
    "articles": [
      {
        "title": "headline about defection",
        "description": "what they said/did",
        "source": {"name": "outlet name"},
        "figure": "person name",
        "figureRole": "their role (Senator, Governor, etc)",
        "severity": 50,
        "defectionType": "criticizes/breaks/opposes/warns/rebukes"
      }
    ],
    "totalFound": 0,
    "byFigure": [
      {"figure": "name", "role": "role", "count": 1, "maxSeverity": 50}
    ],
    "coordinationScore": 80
  },
  "propaganda": {
    "metrics": {
      "negativeStoriesTotal": 0,
      "negativeInOpposition": 0,
      "negativeInRegimeMedia": 0,
      "penetrationRate": 0,
      "echoEffect": 0,
      "counterNarrativeCount": 0,
      "blackoutScore": 0
    },
    "effectivenessScore": 50
  },
  "interpretation": [
    "signal 1",
    "signal 2",
    "signal 3"
  ]
}`;
