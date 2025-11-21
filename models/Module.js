import mongoose from 'mongoose'

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        default: "Sin descripcion"
    },
    duration: {
        type: Number,
        required: true
    },
    tags: [
      {
        title: [String],
        enum: ["General", "HTML", "CSS", "JavaScript", "React", "NodeJS", "ExpressJS", "SASS", "Git", "GitHub"],
        default: ["General"],
        index: true
      }
    ],
    isFree: {
        type: Boolean,
        required: true,
        index: true
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
                    required: true,
                    index: true
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
        ],
        evaluations: [
          {
            title: {
              type: String,
              required: true
            },
            instructions: {
              type: String,
              required: true
            },
            questions: [
              {
                options: [String],
                correctAnswer: String
              }
            ]
          }
        ],
        project: {
          title: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: true
          },
          deliverable: {
            type: String,
            required: true
          },
          deliverableType: {
            type: String,
            required: true,
            enum: ["Google Drive", "GitHub"]
          }
        }
    }
}, { timestamps: true })

export default mongoose.model('Module', ModuleSchema)