import { RequestHandler } from "express"

const authentication: RequestHandler = (req, res) => {
    const { email, password } = req.query
    console.log(req.query);
    res.end();
}

export default authentication;