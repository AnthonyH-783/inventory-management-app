const {Client} = require("pg");




const SQLCommand = ``;



async function main(){

    console.log(`Seeding`);
    const client = new Client();
    await client.connect();
    await client.query(SQLCommand);
    await client.end();
    console.log(`Populating db done`);
}

main();