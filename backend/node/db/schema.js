import mongoose from "mongoose"
import { id } from "zod/v4/locales"

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  activeSessions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  upvotes: {
    type: [String],
    default: [],
  },
  downvotes: {
    type: [String],
    default: [],
  },

  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  notifications: [
    {
      type: {
        type: String,
        enum: ["answer", "upvote", "downvote"],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    },
  ],
})

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: [String],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
})

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
})

export const User = mongoose.model("User", userSchema)
export const Question = mongoose.model("Question", questionSchema)
export const Answer = mongoose.model("Answer", answerSchema)
