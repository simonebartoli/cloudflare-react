export default class Data{
    static async getPosts(){
        try {
            const response = await fetch("https://cloudflare-backend.bartolisimone.workers.dev/posts");
            return await response.json();
        }catch (e){
            return {status: e.status, error: e.error}
        }
    }

    static async sendPost(newPost){
        try {
            const response = await fetch('https://cloudflare-backend.bartolisimone.workers.dev/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });
            return await response.json();
        }catch (e){
            return {status: e.status, error: e.error}
        }
    }
}




/*

export const data = [
    {
        id: 1,
        title: "this is the first title",
        username: "Lollo1999",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        datetime: 1637095255071
    },
    {
        id: 2,
        title: "this is the second title",
        username: "calo1990",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        datetime: 1637095269433
    },
    {
        id: 3,
        title: "this is the third title",
        username: "bellofigu",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        datetime: 1637095847801
    }
]*/
