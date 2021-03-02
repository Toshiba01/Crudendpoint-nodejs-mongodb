const express = require('express')
const { restart } = require('nodemon')
const Item = require('../models/item')
const router = express.Router()

//Getting All
router.get('/', async(req, res) => {
    try{
        const items = await Item.find()
        res.json(items)
    }catch(err){
     res.status(500).json({message: err.message})
    }

   })

//Getting One
router.get('/:id', getItem, (req, res) => {
    res.json(res.item)
})

//Creating One
router.post('/', async (req, res) => {
    const item = new Item({
        itemName: req.body.itemName,
        itemVariant: req.body.itemVariant
    })
    try{
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch(err){
      res.status(400).json({ message: err.message })
    }
})


//Updating One
router.patch('/:id', getItem, async (req, res) => {
    if(req.body.itemName != null){
        res.item.itemName = req.body.itemName
    }
    if(req.body.itemVariant != null){
        res.item.itemVariant = req.body.itemVariant
    }
    try{
      const updatedItem = await res.item.save()
      res.json(updatedItem)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
    
})

//Deleting One
router.delete('/:id', getItem, async (req, res) => {
    try{
      await res.item.remove()
      res.json({ message: 'Deleted an item' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

async function getItem(req, res, next){
    let item
  try{
    item = await Item.findById(req.params.id)
    if (item == null){
        return res.status(404).json({message: 'Cannot find item' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.item = item
  next()
}

module.exports = router