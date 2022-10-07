import { Request, Response } from "express";
import { MONGO_DB, MONGO_HOST, DEPARTMENT_API_URL } from "../config"

export async function doHealthCheck(req: Request, res: Response) {
    let appHealth = []
    /*
    componentHealth: {
        "componentName": "",
        "componentStatus": false,
        "loading": true,
        "helpNotes": ""
  }
    */

    //database check
    let data = req.store as Storage;
    let dbConnected = await data.isInitialized;
    appHealth.push(
        {
            "name": "Database",
            "status": dbConnected,
            "loading": false,
            "helpNotes": `Check that the databases is running at: ${MONGO_HOST}`
        }
     )



    // if (!dbConnected)

    //     return res.status(500).send(`Not able to connect to <strong>${MONGO_DB}</strong> database on <strong>${MONGO_HOST}</strong>.`);

    // res.send(`Connection to database <strong>${MONGO_DB}</strong> on '<strong>${MONGO_HOST}</strong>' is connected and functioning.`);

    res.json({
        appHealth
        // database: dbConnected,
        // departmentAPI: deptStatus
    })
}
