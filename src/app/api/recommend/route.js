export async function POST(request) {
    const body = await request.json()
    const openaiKey = process.env.OPENAI_API_KEY
    const prompt = `the user has the following ${body.hobbies}, the user interested in ${body.topic}, the user likes this ${body.films}, love listen to this ${body.music}, plays this ${body.games}, read this ${body.books} and this ${body.mangas}. Based on these preference, suggest the user any results that fit all their preferences, the more suprising the better. But it must fit, not random thing. And it must be do able, not something too crazy like hijack airplane. I want a list and the direction of the thing to do.`
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                { role: "user", content: prompt }
            ]
        })
    })
    const data = await response.json()
    console.log(data)
    return Response.json({ message: data.choices[0].message.content })
}
