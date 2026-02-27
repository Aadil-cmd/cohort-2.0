/* 
server ko create krna
server ko config krna
*/

require("dotenv").config()
const express = require("express")
const noteModel = require("../model/notes.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

/**
 * POST- api/notes
 */

app.post("/api/notes",async (req,res)=>{
   const { title, description } = req.body

   const notes = await noteModel.create({
    title,description
   })

   res.status(201).json({
    message:"Note created Successfully",
    notes
   })
})

/**
 * GET- api/notes
 */

app.get("/api/notes",async (req,res)=>{

  const note = await noteModel.find()

  res.status(200).json({
    message:"Note Fetched Succssfully",
    note
  })
})

/**
 * DELETE- api/notes/:id
 */
app.delete("/api/notes/:id",async (req,res)=>{

    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted Successfully"
    })
})

/**
 * PATCH- api/notes/:id
 */

app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })
    
    res.status(200).json({
        message:"Note updated successfully"
    })
})

app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app