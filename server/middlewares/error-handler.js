/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ErrorHandler = function(err, req, res, next) {
    var code = 500,
        msg = { message: "Internal Server Error" };
    
    console.log("Error Handler Function get called "+err.stack+ "  "+JSON.stringify(err));
    
    console.error(err);
    
    switch(err.name) {
        
        case "UnauthorizedError":
            code = err.status;
            msg = err.message;
            break;
        case "BadRequestError":
        case "UnauthorizedAccessError":
        case "NotFoundError":
            code = err.status;
            msg = err.message;
            console.error("NotFoundError code="+code+" msg="+msg);

            break;
        default:
            break;
        
//        case 'CustomError':
//            res.status(err.extra || 400);
//            res.send({
//                success:false,
//                message:err.message || "Something Went Wrong"
//            });
//            break;
//        case 'ValidationError':
//            res.status(400);
//            res.send({
//                success:false,
//                message:"Something Went Wrong"
//            });
//            break;
        
    }
    return res.status(code).json(msg);
};

module.exports = ErrorHandler;


