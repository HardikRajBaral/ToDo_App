
import app from "./app.js";


const startServer =async ()=>{
    
    const port=3000;;
    app.get('/',()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
})
}
startServer();
