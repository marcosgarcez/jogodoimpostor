
import words from "./words.json";

function pickRandom(words){
    const randomPosition = Math.floor(Math.random() * words.length);
    return words[randomPosition];
}

export async function GET(request){
    const url =  new URL(request.url);
    const category = url.searchParams.get('category');

    let pool;
    if(category){
        pool = words[category];
        if(!pool){
            return new Response(JSON.stringify({error: 'Categoria não encontrada!'}), {
                status: 400,
                headers: {'Content-type': 'application/json'}
            });
        }
    } else {
        pool = Object.values(words).flat();
    }

    const selected = pickRandom(pool);
    
    return new Response(JSON.stringify(selected), {
        status: 200,
        headers: {'Content-type': 'application/json'}
    });
}