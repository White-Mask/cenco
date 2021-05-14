import app from './app';

async function main(){
    await app.listen(4000);
    console.log('http://localhost:4000/api');
};

main();