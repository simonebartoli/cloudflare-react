export default class Data{
    static async getPosts(){
        try {
            const response = await fetch("https://cloudflare-backend.bartolisimone.workers.dev/posts");
            return await response.json();
        }catch (e){
            return {status: e.status, error: e.error}
        }
    }
    static async setUsername(user, link){
        try {
            const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            return await response.json();
        }catch (e){
            return {status: e, error: e}
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

    static async modifyPost(post){
        try {
            const response = await fetch(`https://cloudflare-backend.bartolisimone.workers.dev/posts/${post.post.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            return await response.json();
        }catch (e){
            return {status: e.status, error: e.error}
        }
    }
}