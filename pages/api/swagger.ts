import path from 'path';
import {Swagger} from "../../app/service/swagger/swagger";

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd());

  let swagger = await Swagger(jsonDirectory + '/swagger.yml');

  res.status(200).json(swagger);
}
