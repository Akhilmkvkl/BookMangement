const data= require('../app.js')

const userCtrl={

    getbooks:async (req,res)=>{
        try {
            console.log("this is the first data ");
            console.log(data)
            const books=data

            res.send({msg:"success",books})
        } catch (error) {
             console.log(error)
        }
    } 


}

module.exports=userCtrl