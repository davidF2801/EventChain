import { Request } from 'express';

const getTokenFrom = (request: Request): string | null => {  
    const authorization: string | undefined = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');  
    }
    return null;
};


export default getTokenFrom;
