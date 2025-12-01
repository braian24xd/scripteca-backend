import mongoose from 'mongoose'
import slugify from 'slugify'

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
  tags: {
    type: [String],
    default: ["General"],
    index: true
  },
  isFree: {
    type: Boolean,
    required: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  requirePrevModule: {
    type: Boolean,
    default: false
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
            question: {
              type: String,
              required: true
            },
            options: {
              type: [String],
              required: true,

            },
            correctAnswer: {
              type: String,
              required: true
            }
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

ModuleSchema.pre("save", function (next) {
  if(!this.slug){
    this.slug = slugify(this.title, {
      replacement: "-",
      lower: true
    })
  }
  next()
})

export default mongoose.model('Module', ModuleSchema)