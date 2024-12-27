import GalleryItem from "../models/galleryItem.js"


export function createGalleryItem(req,res){
  
  const user = req.user

  if(user == null){

    res.status(403).json({
      message : "Please login to create a gallery item"
    })
    return
  }

  if(user.type != "admin"){
    res.status(403).json({
      message : "You are not authorized to create a gallery item"
    })
    return
  }
  

  const galleryItem = req.body
  const newGalleryItem = new GalleryItem(galleryItem)
  newGalleryItem.save().then(
    ()=>{
      res.json({
        message : "Gallery Item created successfully"
      })
    }
  ).catch(
    ()=>{
      res.status(500).json({
        message : "Gallery Item creation failed"
      })
    }
  )
}
export function getGalleryItems(req,res){

  GalleryItem.find().then(
    (list)=>{
      res.json({
        list : list
      })
    }
  )
}

export function deleteGalleryItem(req,res){
  const id = req.params.id
  const user = req.user

  if(user == null){

    res.status(403).json({
      message : "Please login to create a gallery item"
    })
    return
  }

  if(user.type != "admin"){
    res.status(403).json({
      message : "You are not authorized to create a gallery item"
    })
    return
  }

  GalleryItem.findByIdAndDelete(id).then(
    ()=>{
      res.json({
        message : "Gallery Item deleted successfully"
      })
    }
  ).catch(
    ()=>{
      res.status(500).json({
        message : "Gallery Item deletion failed"
      })  
    }
  )

}

export function updateGalleryItem(req,res){
  const id = req.params.id
  const user = req.user

  if(user == null){

    res.status(403).json({
      message : "Please login to create a gallery item"
    })
    return
  }

  if(user.type != "admin"){
    res.status(403).json({
      message : "You are not authorized to create a gallery item"
    })
    return
  }

  const galleryItem = req.body

  GalleryItem.findByIdAndUpdate(id,galleryItem).then(
    ()=>{
      res.json({
        message : "Gallery Item updated successfully"
      })
    }
  ).catch(
    ()=>{
      res.status(500).json({
        message : "Gallery Item update failed"
      })
    }
  )
}

