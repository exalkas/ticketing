import axios from 'axios'

export default function Home() {
    console.log('this is home page, from SSR')
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-3xl font-bold underline">Home</h1>
        </div>
    );
}

Home.getInitialProps = async () => {

    if (typeof window === 'undefined') { // method will be executed in server side

        const response = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/users/auth')
        // .catch(err => {
        //     console.log('Home.getInitialProps: Error:', err);
        // });
        console.log('SSR in index.js: response:', response.data );
    } else {

    }
    

    return {color: 'red'}
}