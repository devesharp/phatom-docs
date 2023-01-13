import {Swagger} from "./swagger";

it('', async () => {
    let s = await Swagger('swagger.yml');

    console.log(JSON.stringify(s, null, 2));
})