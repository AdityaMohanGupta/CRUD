const express=require('express');
const router=express.Router();
const Alien=require('../model/alienModel');

router.get('/',async(req,res)=>{
  try{
    const aliens=await Alien.find();
    res.json(aliens)

  }
  catch(err){
    console.log(err);
    
  }
})
router.get('/:id',async(req,res)=>{
    try{
      const alien=await Alien.findById(req.params.id);
      res.json(alien)
  
    }
    catch(err){
      console.log(err);
      
    }
  })

  router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (!alien) {
            return res.status(404).json({ message: "Alien not found" });
        }
        if (req.body.name !== undefined) alien.name = req.body.name;
        if (req.body.tech !== undefined) alien.tech = req.body.tech;
        if (req.body.sub !== undefined) alien.sub = req.body.sub;

        const updatedAlien = await alien.save();
        res.json(updatedAlien.name);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update the alien" });
    }
});
router.post('/',(req,res)=>{
    const alienData=new Alien({
        name:req.body.name,
        tech:req.body.tech,
        sub:req.body.sub,
    });
    try{
        const a1=alienData.save();
        res.json(req.body.name);
    }
    catch(err){
        console.log(err);
        
    }
})
router.delete('/:id', async (req, res) => {
    try {
      const alien = await Alien.findByIdAndDelete(req.params.id);
      if (!alien) {
        return res.status(404).json({ message: 'Alien not found' });
      }
      res.json({ message: 'Alien deleted successfully', alien });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to delete alien' });
    }
  });
  
module.exports=router;