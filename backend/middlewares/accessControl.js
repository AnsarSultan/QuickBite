import ac from "../config/role.js"

const checkPermission  = (action , resource) =>{
    return (req , res , next)=>{
        const role = req.user.role
        const permission = ac.can(role)[action](resource);
        if(!permission.granted){
            return res.json({success: false , message: "Access denied"})
        }

        req.permission = permission
        next()
    };
};

export default checkPermission;