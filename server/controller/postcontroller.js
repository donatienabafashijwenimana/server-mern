import Post  from '../model/postmodel.js'; // Adjust the path as per your project structure

export const createPost = async (req, res) => {
    try {
            const {postfile,content} = req.body
            const userid = req.user._id
            if (postfile){
                    const uploadresponse = await cloudinary.uploader.upload(postfile)
            }

            const newpost = new Post({
                content:content,
                postfile:uploadresponse.secure_url,
                author:userid
            })
            const res = await newpost.save()
            if (res)return res.status(200).json({message:'newpost created'})
    
        } catch (error) { 
            console.log(error)
            res.status(500).json({message:'internal server error'})
        }
};
