import mongoose from 'mongoose'

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Sin descripcion"
    },
    duration: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        default: ["General"]
    },
    isFree: {
        type: Boolean,
        required: true
    },
    moduleContent: {
        videos: [
            {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    default: "Sin descripcion"
                },
                duration: {
                    type: Number,
                    required: true
                },
                videoURL: {
                    type: String,
                    required: true
                },
                order: {
                    type: Number,
                    required: true
                },
                resources: [
                    {
                        url: {
                            type: String,
                            required: true
                        },
                        resourceType: {
                            type: String,
                            enum: ["URL", "PDF"],
                            required: true
                        }
                    }
                ]
            }
        ],
        resources: [
            {
                title: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                resourceType: {
                    type: String,
                    enum: ["URL", "PDF"],
                    required: true
                }

            }
        ]
    }
}, { timestamps: true })

export default mongoose.model('Module', ModuleSchema)

/*
    AQUI UNA POSIBLE RESPUESTA DEL MODELO COMPLETO

{
  "title": "Fundamentos de JavaScript",
  "description": "Aprende las bases del lenguaje",
  "position": 1,
  "tags": ["javascript", "basics"],
  "moduleContent": {
    "videos": [
      {
        "title": "¿Qué es JavaScript?",
        "description": "Introducción general",
        "duration": 8,
        "videoUrl": "https://...",
        "resources": [
          { "type": "pdf", "url": "..." },
          { "type": "link", "url": "..." }
        ]
      }
    ],
    "resources": [
      {
        "title": "Guía oficial MDN",
        "type": "link",
        "url": "https://developer.mozilla.org"
      }
    ],
    "quizzes": [
      {
        "question": "¿Qué es una variable?",
        "options": ["A", "B", "C", "D"],
        "answer": 1,
        "explanation": "..."
      }
    ],
    "evaluations": [
      {
        "title": "Evaluación de fundamentos",
        "instructions": "Responde las preguntas",
        "questions": [...]
      }
    ],
    "project": {
      "title": "Mini proyecto final",
      "description": "Construye un contador con JS",
      "deliverables": ["Repositorio GitHub", "Video explicativo"]
    }
  }
}


*/